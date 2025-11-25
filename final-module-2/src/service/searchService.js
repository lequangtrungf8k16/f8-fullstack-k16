import apiClient from "../utils/apiClient";

export const searchService = {
    getSuggestions: async (query) => {
        try {
            const response = await apiClient.get("/search/suggestions", {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            return null;
        }
    },

    search: async (query, limit = 20, page = 1) => {
        try {
            const response = await apiClient.get("/search", {
                params: {
                    q: query,
                    limit,
                    page,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error searching:", error);
            return null;
        }
    },
};
