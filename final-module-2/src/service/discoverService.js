import apiClient from "../utils/apiClient";

export const discoverService = {
    getMoods: async (limit = 20) => {
        try {
            const response = await apiClient.get("/moods", {
                params: { limit, sort: "-popularity" },
            });
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            return [];
        }
    },

    getCategories: async () => {
        try {
            const response = await apiClient.get("/categories");
            return response.data.items || [];
        } catch (error) {
            return [];
        }
    },
    getCategoryDetail: async (slug) => {
        try {
            const response = await apiClient.get(`/categories/${slug}`, {
                params: { subLimit: 10, playlistLimit: 10 },
            });
            return response.data || null;
        } catch (error) {
            return null;
        }
    },
    getLines: async (limit = 50) => {
        try {
            const response = await apiClient.get("/lines", {
                params: { limit },
            });
            return response.data.items || [];
        } catch (error) {
            return [];
        }
    },
    getLineDetail: async (slug) => {
        try {
            const response = await apiClient.get(`/lines/${slug}`);
            return response.data || null;
        } catch (error) {
            return null;
        }
    },
    getLineSongs: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/songs`, {
                params: { limit, sort },
            });
            return response.data.items || [];
        } catch (error) {
            return [];
        }
    },
    getLinePlaylists: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/playlists`, {
                params: { limit, sort },
            });
            return response.data.items || [];
        } catch (error) {
            return [];
        }
    },
    getLineAlbums: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/albums`, {
                params: { limit, sort },
            });
            return response.data.items || [];
        } catch (error) {
            return [];
        }
    },
    getLineVideos: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/videos`, {
                params: { limit, sort },
            });
            return response.data.items || [];
        } catch (error) {
            return [];
        }
    },
};
