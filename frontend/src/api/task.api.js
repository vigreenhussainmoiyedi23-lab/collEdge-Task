import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const api = axios.create({
    baseURL: BACKEND_URL + "/api/tasks",
    withCredentials: true,
})

async function createTaskAPI({ title, description, priority }) {
    try {
        const response = await api.post("/", { title, description, priorityq });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function getAllTasks() {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function updateTask(id, { title, description, priority }) {
    try {
        const response = await api.put(`/${id}`, { title, description, priority });
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function updateTaskStatus(id, status) {
    try {
        const response = await api.patch(`/${id}/${status}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
async function deleteTask(id) {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export { createTaskAPI, getAllTasks, updateTask, updateTaskStatus, deleteTask };