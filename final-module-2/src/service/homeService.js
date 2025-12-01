import apiClient from "../utils/apiClient";
import { tokenService } from "./tokenService";

export const homeService = {
    getHomeData: async () => {
        try {
            const response = await apiClient.get("/home");
            return response.data.data || response.data;
        } catch (error) {
            return null;
        }
    },

    getLineDetail: async (slug) => {
        try {
            const response = await apiClient.get(`/lines/details/${slug}`);
            return response.data.data || response.data;
        } catch (error) {
            console.warn(`API Line không tìm thấy: ${slug}`);
            return null;
        }
    },

    getAlbumsForYou: async (country = "VN", limit = 12) => {
        try {
            const response = await apiClient.get("/home/albums-for-you", {
                params: { country, limit },
            });
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.warn("Lỗi getAlbumsForYou:", error);
            return [];
        }
    },

    getTodaysHits: async (country = "VN", limit = 12) => {
        try {
            const response = await apiClient.get("/home/todays-hits", {
                params: { country, limit },
            });
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.warn("Lỗi getTodaysHits:", error);
            return [];
        }
    },

    getPersonalized: async (limit = 12) => {
        const token = tokenService.getAccessToken();
        if (!token) return [];

        try {
            const response = await apiClient.get("/home/personalized", {
                params: { limit },
            });
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            return [];
        }
    },
};

export default homeService;
