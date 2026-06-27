import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const api = axios.create({
    baseURL: BACKEND_URL + "/api/messages",
    withCredentials: true,
})

async function sendMessageAPI({ name, email, message }) {
    try {
        const response = await api.post("/", { name, email, message });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function getAllMessages() {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export { sendMessageAPI, getAllMessages };