import axios from "axios";

import { tokenService } from "../service/tokenService";
import { storageService } from "../service/storageService";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const token = tokenService.getAccessToken();
            if (token) {
                tokenService.removeTokens();
                storageService.removeUserInfo();
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
