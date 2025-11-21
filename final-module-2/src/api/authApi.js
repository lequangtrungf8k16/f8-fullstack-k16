import httpsRequest from "../utils/httpsRequest";

export const registerApi = async (email, password) => {
    try {
        const response = await httpsRequest.post("/auth/register", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const loginApi = async (email, password) => {
    try {
        const response = await httpsRequest.post("/auth/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message,
        };
    }
};
