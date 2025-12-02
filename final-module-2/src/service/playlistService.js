import apiClient from "../utils/apiClient";

export const getPlaylistsByCountry = async (country = "VN", limit = 12) => {
    try {
        const response = await apiClient.get("/playlists/by-country", {
            params: { country, limit },
        });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Lỗi khi tải Playlist theo quốc gia:", error);
        return [];
    }
};

export const getPlaylistDetailsApi = async (slug) => {
    try {
        const response = await apiClient.get(`/playlists/details/${slug}`, {
            params: { limit: 100 },
        });
        return response.data.data || response.data;
    } catch (error) {
        return null;
    }
};

export const getAlbumDetailsApi = async (slug) => {
    try {
        const response = await apiClient.get(`/albums/details/${slug}`, {
            params: { limit: 100 },
        });
        return response.data.data || response.data;
    } catch (error) {
        return null;
    }
};

export const getTrackList = async (idOrSlug, type) => {
    if (type === "playlist" && idOrSlug.includes("album")) {
        type = "album";
    }

    let data = null;

    if (type === "album") {
        data = await getAlbumDetailsApi(idOrSlug);
    } else if (type === "playlist") {
        data = await getPlaylistDetailsApi(idOrSlug);
    }

    if (!data) {
        console.warn(`Đang thử tự động tìm loại dữ liệu cho: ${idOrSlug}`);
        if (idOrSlug.includes("album")) {
            data = await getAlbumDetailsApi(idOrSlug);
            if (!data) data = await getPlaylistDetailsApi(idOrSlug);
        } else {
            data = await getPlaylistDetailsApi(idOrSlug);
            if (!data) data = await getAlbumDetailsApi(idOrSlug);
        }
    }

    if (!data) return null;

    const rawSongs = data.songs || data.tracks || data.items || [];

    const songs = rawSongs.map((song) => {
        const songId = song._id || song.encodeId || song.id;

        let imageUrl = "./src/assets/images/default-song.jpg";

        if (song.thumbnails && song.thumbnails.length > 0) {
            imageUrl = song.thumbnails[0];
        } else if (song.thumbnail) {
            imageUrl = song.thumbnail;
        } else if (song.thumbnailM) {
            imageUrl = song.thumbnailM;
        } else if (song.thumb) {
            imageUrl = song.thumb;
        }

        return {
            id: songId,
            title: song.title || song.name || "Không tên",
            artist: song.artists
                ? song.artists.map((a) => a.name).join(", ")
                : song.artist || "Nhiều nghệ sĩ",
            thumbnail: imageUrl,
            duration: song.duration || 0,
            link: "",
            albumName: data.title || data.name,
        };
    });

    return { ...data, songs: songs };
};

export const getSongStream = async (id) => {
    try {
        const response = await apiClient.get(`/songs/details/${id}`);
        const songData = response.data.data || response.data;

        if (!songData) return "";

        if (songData.audioUrl) return songData.audioUrl;

        if (songData["128"]) return songData["128"];
        if (songData["320"]) return songData["320"];
        if (songData.source && songData.source["128"])
            return songData.source["128"];
        if (songData.source && songData.source["320"])
            return songData.source["320"];
        if (songData.link) return songData.link;
        if (songData.url) return songData.url;

        return "";
    } catch (error) {
        console.error("Lỗi lấy link nhạc:", error);
        return null;
    }
};

export const playlistService = {
    getPlaylistsByCountry,
    getPlaylistDetailsApi,
    getAlbumDetailsApi,
    getTrackList,
    getSongStream,
};

export default playlistService;
