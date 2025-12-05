import { storageService } from "./storageService";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenService = {
    // Access Token
    setAccessToken(token) {
        storageService.set(ACCESS_TOKEN_KEY, token);
    },
    getAccessToken() {
        return storageService.get(ACCESS_TOKEN_KEY);
    },

    // Refresh Token
    setRefreshToken(token) {
        storageService.set(REFRESH_TOKEN_KEY, token);
    },
    getRefreshToken() {
        return storageService.get(REFRESH_TOKEN_KEY);
    },

    // Xóa tất cả token (Khi logout)
    removeTokens() {
        storageService.remove(ACCESS_TOKEN_KEY);
        storageService.remove(REFRESH_TOKEN_KEY);
    },
};
