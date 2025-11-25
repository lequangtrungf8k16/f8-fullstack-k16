import apiClient from "../utils/apiClient";

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
        return await apiClient.delete("/auth/logout");
    },
};
