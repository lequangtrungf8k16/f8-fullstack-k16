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
    let data = null;
    if (type === "album") {
        data = await getAlbumDetailsApi(idOrSlug);
    } else {
        data = await getPlaylistDetailsApi(idOrSlug);
    }
    if (!data) return null;

    const rawSongs = data.songs || data.tracks || data.items || [];
    const songs = rawSongs.map((song) => {
        const songId = song._id || song.encodeId || song.id;
        return {
            id: songId,
            title: song.title || song.name || "Không tên",
            artist: song.artists
                ? song.artists.map((a) => a.name).join(", ")
                : song.artist || "Nhiều nghệ sĩ",
            thumbnail: song.thumbnail || song.thumbnailM || song.thumb,
            duration: song.duration || 0,
            link: "",
        };
    });
    return { ...data, songs: songs };
};

export const playlistService = {
    getPlaylistDetailsApi,
    getTrackList,
};

export default playlistService;
