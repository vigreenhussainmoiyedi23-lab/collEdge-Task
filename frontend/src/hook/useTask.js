import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/task.context";
import { createTaskAPI, getAllTasks, updateTask, updateTaskStatusApi, deleteTask } from "../api/task.api";
export const useTask = () => {
    const navigate = useNavigate();

    const { loading,
        setLoading,
        allTasks,
        setAllTasks,
        activeTask,
        setActiveTask
    } = useContext(TaskContext)
    const createTask = async (data) => {
        setLoading(true)
        try {
            const response = await createTaskAPI(data)
            if (response) {
                await fetchTasks()
            }
        } catch (error) {
            console.error("Send message error:", error);
        } finally {
            setLoading(false)
        }
    }

    async function fetchTasks() {
        console.trace("fetching tasks");
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
            const response = await updateTaskStatusApi(id, status)
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
    async function onDragHandler(task) {
        setActiveTask(task)
    }

    async function onDropHandler(task, newStatus, idx) {
        const oldStatus = task.status;

        // Update backend only if status changed
        if (oldStatus !== newStatus) {
            console.log("updating task status in backend from", oldStatus, "to", newStatus);
            await updateTaskStatus(task._id, newStatus);
        }

        setAllTasks((prev) => {
            // Clone every column so we don't mutate state
            const updated = {
                ...prev,
                [oldStatus]: [...prev[oldStatus]],
                [newStatus]: [...prev[newStatus]],
            };

            // Find the task in its old column
            const oldIndex = updated[oldStatus].findIndex(
                (t) => t._id === task._id
            );

            if (oldIndex === -1) return prev;

            // Remove it
            const [removedTask] = updated[oldStatus].splice(oldIndex, 1);

            // Update its status locally
            removedTask.status = newStatus;

            // If moving within the same column, adjust the index
            let insertIndex = idx;
            if (oldStatus === newStatus && oldIndex < idx) {
                insertIndex--;
            }

            // Insert into the new position
            updated[newStatus].splice(insertIndex, 0, removedTask);

            return updated;
        });

        setActiveTask(null);
    }
    return { fetchTasks, loading, allTasks, createTask, updateTaskHandler, updateTaskStatus, deleteTaskHandler, onDragHandler, onDropHandler, activeTask }
}

