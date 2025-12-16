import apiClient from "../utils/apiClient";

export const getAlbumDetailsApi = async (slug) => {
    try {
        const response = await apiClient.get(`/albums/details/${slug}`, {
            params: { limit: 50 },
        });

        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết Album:", error);
        throw error;
    }
};

export const getPlaylistDetailsApi = async (slug) => {
    try {
        const response = await apiClient.get(`/playlists/details/${slug}`, {
            params: { limit: 200 },
        });

        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết Playlist:", error);
        throw error;
    }
};

export const getAlbumOrPlaylistDetails = async (uri, type) => {
    if (type === "album") {
        return getAlbumDetailsApi(uri);
    }
    if (type === "playlist") {
        return getPlaylistDetailsApi(uri);
    }

    try {
        const albumData = await getAlbumDetailsApi(uri);
        if (albumData && albumData.songs && albumData.songs.length > 0)
            return albumData;
    } catch (error) {
        console.error("Lỗi khi tải Album: ", error);
    }

    try {
        const playlistData = await getPlaylistDetailsApi(uri);
        if (playlistData && playlistData.songs && playlistData.songs.length > 0)
            return playlistData;
    } catch (error) {
        console.error("Lỗi khi tải Danh sách:", error);
    }

    return null;
};

export const getAlbumsForYou = async (country = "GLOBAL", limit = 10) => {
    try {
        const response = await apiClient.get("/home/albums-for-you", {
            params: { country, limit },
        });
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải Album Dành cho Bạn:", error);
        return [];
    }
};

export const getTodaysHits = async (country = "GLOBAL", limit = 10) => {
    try {
        const response = await apiClient.get("/home/todays-hits", {
            params: { country, limit },
        });
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải Tuyển tập Hit Hôm Nay:", error);
        return [];
    }
};
