import httpsRequest from "../utils/httpsRequest";

export const getAlbumsForYou = async () => {
    try {
        const response = await httpsRequest.post("/home/albums-for-you");
        return response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        return false;
    }
};
