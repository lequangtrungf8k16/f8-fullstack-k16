import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const httpsRequest = axios.create({
    baseURL,
});

httpsRequest.interceptors.request.use((config) => {
    return config;
});
