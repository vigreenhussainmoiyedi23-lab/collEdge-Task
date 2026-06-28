import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/task.context";
import { createTaskAPI, getAllTasks, updateTask, updateTaskStatus, deleteTask } from "../api/task.api";
export const useTask = () => {
    const navigate = useNavigate();

    const { loading,
        setLoading,
        allTasks,
        setAllTasks,
    } = useContext(TaskContext)
    const createTask = async (data) => {
        setLoading(true)
        try {
            const response = await createTaskAPI(data)
            if (response) {
                setAllTasks([...allTasks, response])
                navigate("/admin")
            }
        } catch (error) {
            console.error("Send message error:", error);
        } finally {
            setLoading(false)
        }
    }

    async function fetchTasks() {
        try {
            const response = await getAllTasks()
            if (response) {
                setAllTasks(response.tasks)
            }
        } catch (error) {
            console.log("fetching tasks error:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTasks()
    }, [])

    async function updateTaskHandler(id, data) {
        try {
            const response = await updateTask(id, data)
            if (response) {
                await fetchTasks()
            }
        } catch (error) {
            console.error("Send message error:", error);
        }

    }

    async function updateTaskStatus(id, status) {
        try {
            const response = await updateTaskStatus(id, status)
            if (response) {
                setAllTasks(allTasks.map(task => task._id === id ? response.updatedTask : task))
            }
        } catch (error) {
            console.error("Send message error:", error);
        }
    }

    async function deleteTaskHandler(id) {
        try {
            const response = await deleteTask(id)
            await fetchTasks()
        } catch (error) {
            console.error("Send message error:", error);
        }
    }

    return { loading, allTasks, createTask, updateTaskHandler, updateTaskStatus, deleteTaskHandler }
}

