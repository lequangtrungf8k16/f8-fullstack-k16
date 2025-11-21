import httpsRequest from "../utils/httpsRequest";
import { storage } from "./storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenService = {
    save(token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },
    get() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },
    remove() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
};

export const refreshTokenService = {
    save(token) {
        storage.set(REFRESH_TOKEN_KEY, token);
    },
    get() {
        return storage.get(REFRESH_TOKEN_KEY);
    },
    remove() {
        storage.remove(REFRESH_TOKEN_KEY);
    },
};

export const refreshTokenApi = async () => {
    const refreshToken = refreshTokenService.get();
    if (!refreshToken) return false;

    try {
        const response = await httpsRequest.post("/auth/refresh-token", {
            refresh_token: refreshToken,
        });
        // Lưu access_token mới
        tokenService.save(response.data.access_token);
        return response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        return false;
    }
};
