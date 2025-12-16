import apiClient from "../utils/apiClient";
import { tokenService } from "./tokenService";

export const authService = {
    login: async (email, password) => {
        return await apiClient.post("/auth/login", { email, password });
    },
    register: async (name, email, password, confirmPassword) => {
        return await apiClient.post("/auth/register", {
            name,
            email,
            password,
            confirmPassword,
        });
    },
    getMe: async () => {
        return await apiClient.get("/auth/me");
    },
    updateProfile: async (data) => {
        return await apiClient.patch("/auth/me", data);
    },
    changePassword: async (data) => {
        return await apiClient.patch("/auth/change-password", data);
    },
    logout: async () => {
        try {
            await apiClient.delete("/auth/logout");
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            tokenService.removeTokens();
            window.location.href = "/login";
        }
    },

    refreshToken: async () => {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const response = await apiClient.post("/auth/refresh-token", {
            refreshToken: refreshToken,
        });

        if (response.data) {
            const { accessToken, refreshToken: newRefreshToken } =
                response.data;
            tokenService.setAccessToken(accessToken);

            if (newRefreshToken) {
                tokenService.setRefreshToken(newRefreshToken);
            }
            return accessToken;
        }
        throw new Error("Failed to refresh token");
    },
};
