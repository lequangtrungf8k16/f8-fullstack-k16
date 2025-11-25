import apiClient from "../utils/apiClient";

export const libraryService = {
    getPlaylists: async () => {
        return await apiClient.get("/library/playlists");
    },
    getLikedSongs: async () => {
        return await apiClient.get("/library/liked-songs");
    },
    createPlaylist: async (name) => {
        return await apiClient.post("/library/playlists", { name });
    },
};
