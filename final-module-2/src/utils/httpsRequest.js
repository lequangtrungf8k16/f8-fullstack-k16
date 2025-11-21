import axios from "axios";
import { tokenService } from "../service/token";

const httpsRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

httpsRequest.interceptors.request.use((config) => {
    const token = tokenService.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default httpsRequest;
