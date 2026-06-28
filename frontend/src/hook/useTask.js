import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  TaskContext } from "../context/task.context";
import { createTaskAPI, getAllTasks } from "../api/task.api";
export const useTask = () => {
    const navigate = useNavigate();

    const { loading,
        setLoading,
        AllTasks,
        setAllTasks,
    } = useContext(TaskContext)
    const createTask = async (data) => {
        setLoading(true)
        try {
            const response = await createTaskAPI(data)
            if (response) {
                setAllTasks([...AllTasks, response])
                navigate("/admin")
            }
        } catch (error) {
            console.error("Send message error:", error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
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

        return () => {
            fetchTasks()
        }
    }, [])

    return { loading, AllTasks, createTask }
}

