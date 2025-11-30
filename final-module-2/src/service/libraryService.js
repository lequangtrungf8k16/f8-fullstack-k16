export const libraryService = {
    getPlaylists: async () => {
        return { data: [] };
    },
    getLikedSongs: async () => {
        return { data: [] };
    },
    createPlaylist: async (name) => {
        console.warn("API tạo playlist chưa được hỗ trợ");
        return null;
    },
};
