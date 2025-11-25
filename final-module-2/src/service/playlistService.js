import apiClient from "../utils/apiClient";

export const getPlaylistsByCountry = async (country = "VN", limit = 10) => {
    try {
        const response = await apiClient.get("/playlists/by-country", {
            params: { country, limit },
        });
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải Danh sách phát theo quốc gia:", error);
        return [];
    }
};

export const getPlaylistDetailsApi = async (slug) => {
    try {
        const response = await apiClient.get(`/playlists/details/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải chi tiết Playlist:", error);
        throw error;
    }
};
