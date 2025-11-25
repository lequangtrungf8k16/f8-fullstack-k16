import apiClient from "../utils/apiClient";

export const discoverService = {
    etMoods: async (limit = 10, sort = "-popularity") => {
        try {
            const response = await apiClient.get("/moods", {
                params: { limit, sort },
            });
            return response.data.data;
        } catch (error) {
            console.error("Lỗi khi tải danh sách Moods:", error);
            return [];
        }
    },

    getCategories: async () => {
        try {
            const response = await apiClient.get("/categories");
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy danh mục:", error);
            return null;
        }
    },

    getCategoryDetail: async (slug) => {
        try {
            const response = await apiClient.get(`/categories/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy chi tiết danh mục:", error);
            return null;
        }
    },

    getLines: async (limit = 50) => {
        try {
            const response = await apiClient.get("/lines", {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy danh sách dòng nhạc:", error);
            return null;
        }
    },

    getLineDetail: async (slug) => {
        try {
            const response = await apiClient.get(`/lines/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy chi tiết dòng nhạc:", error);
            return null;
        }
    },

    getLineSongs: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/songs`, {
                params: { limit, sort },
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi lấy bài hát cho dòng nhạc ${slug}:`, error);
            return null;
        }
    },

    getLinePlaylists: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/playlists`, {
                params: { limit, sort },
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi lấy playlist cho dòng nhạc ${slug}:`, error);
            return null;
        }
    },

    getLineAlbums: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/albums`, {
                params: { limit, sort },
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi lấy album cho dòng nhạc ${slug}:`, error);
            return null;
        }
    },

    getLineVideos: async (slug, limit = 20, sort = "-popularity") => {
        try {
            const response = await apiClient.get(`/lines/${slug}/videos`, {
                params: { limit, sort },
            });
            return response.data;
        } catch (error) {
            console.error(`Lỗi lấy video cho dòng nhạc ${slug}:`, error);
            return null;
        }
    },

    getExploreAlbums: async (limit = 10) => {
        try {
            const response = await apiClient.get("/explore/albums", {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy album khám phá:", error);
            return null;
        }
    },

    getExploreVideos: async (limit = 10) => {
        try {
            const response = await apiClient.get("/explore/videos", {
                params: { limit },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy video khám phá:", error);
            return null;
        }
    },

    getExploreMeta: async () => {
        try {
            const response = await apiClient.get("/explore/meta");
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy meta khám phá:", error);
            return null;
        }
    },

    getExploreNewReleases: async (limit = 20, sort = "-releaseDate") => {
        try {
            const response = await apiClient.get("/explore/new-releases", {
                params: { limit, sort },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy bản phát hành mới:", error);
            return null;
        }
    },

    getChartsVideos: async (
        country = "GLOBAL",
        period = "latest",
        limit = 50,
        sort = "-views"
    ) => {
        try {
            const response = await apiClient.get("/charts/videos", {
                params: { country, period, limit, sort },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy bảng xếp hạng video:", error);
            return null;
        }
    },

    getChartsTopArtists: async (
        country = "GLOBAL",
        period = "latest",
        limit = 20
    ) => {
        try {
            const response = await apiClient.get("/charts/top-artists", {
                params: { country, period, limit },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy bảng xếp hạng nghệ sĩ:", error);
            return null;
        }
    },

    getChartsCountries: async () => {
        try {
            const response = await apiClient.get("/charts/countries");
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy danh sách quốc gia:", error);
            return null;
        }
    },
};
