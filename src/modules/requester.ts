import axios from "axios";

export const ApiRequester = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://127.20.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});
