// File: src/service/libraryService.js
// API hiện tại chưa hỗ trợ Library cá nhân đầy đủ, tạm thời return rỗng hoặc mock.

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
