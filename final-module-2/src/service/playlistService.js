import apiClient from "../utils/apiClient";

export const getPlaylistsByCountry = async (country = "VN", limit = 12) => {
    try {
        const response = await apiClient.get("/playlists/by-country", {
            params: { country, limit },
        });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Lỗi tải Playlist QG:", error);
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

export const getLineDetailsApi = async (slug) => {
    try {
        const lineInfo = await apiClient.get(`/lines/${slug}`);

        const lineSongs = await apiClient.get(`/lines/${slug}/songs`, {
            params: { limit: 50 },
        });

        const data = lineInfo.data;

        return {
            ...data,
            items: lineSongs.data.items || [],
        };
    } catch (error) {
        return null;
    }
};

export const getTrackList = async (idOrSlug, type) => {
    let data = null;

    if (type === "line") {
        data = await getLineDetailsApi(idOrSlug);
    } else if (type === "album") {
        data = await getAlbumDetailsApi(idOrSlug);
    } else {
        data = await getPlaylistDetailsApi(idOrSlug);
        if (!data) data = await getAlbumDetailsApi(idOrSlug);
    }

    if (!data) return null;

    const rawSongs = data.songs || data.tracks || data.items || [];

    const songs = rawSongs.map((song) => {
        const songId = song._id || song.encodeId || song.id;
        let imageUrl = "./src/assets/images/default-song.jpg";

        if (song.thumbnails && song.thumbnails.length > 0)
            imageUrl = song.thumbnails[0];
        else if (song.thumbnail) imageUrl = song.thumbnail;
        else if (song.thumb) imageUrl = song.thumb;

        return {
            id: songId,
            title: song.title || song.name || "Không tên",
            artist: song.artists
                ? song.artists.map((a) => a.name).join(", ")
                : song.artist || "Nhiều nghệ sĩ",
            thumbnail: imageUrl,
            duration: song.duration || 0,
            audioUrl: song.audioUrl || "",
            albumName: data.title || data.name,
        };
    });

    return { ...data, songs: songs };
};

export const playlistService = {
    getPlaylistsByCountry,
    getPlaylistDetailsApi,
    getAlbumDetailsApi,
    getTrackList,
};

export default playlistService;
