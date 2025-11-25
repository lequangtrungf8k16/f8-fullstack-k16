import apiClient from "../utils/apiClient";

export const getPersonalized = async (limit = 12) => {
    try {
        const response = await apiClient.get("/home/personalized", {
            params: { limit },
        });
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi tải Danh sách gợi ý cá nhân hóa:", error);

        if (error.response && error.response.status === 401) {
            console.warn(
                "API Cá nhân hóa yêu cầu đăng nhập. Hiển thị nội dung trống."
            );
        }

        return [];
    }
};

export const logPlayEvent = async (songId, albumId, playlistId) => {
    if (!songId && !albumId && !playlistId) {
        console.warn("Không có ID nào được cung cấp để ghi lại lịch sử.");
        return;
    }

    try {
        const payload = {
            playedAt: new Date().toISOString(),
        };

        if (songId) payload.songId = songId;
        if (albumId) payload.albumId = albumId;
        if (playlistId) payload.playlistId = playlistId;

        await apiClient.post("/events/play", payload);

        console.log("Sự kiện nghe nhạc đã được ghi lại thành công.");
    } catch (error) {
        console.error("Lỗi khi ghi lại sự kiện nghe nhạc:", error);
    }
};
