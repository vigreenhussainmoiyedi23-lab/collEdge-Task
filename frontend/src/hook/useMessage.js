import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../context/message.context";
import { sendMessageAPI, getAllMessages } from "../api/message.api";
export const useMessage = () => {
    const navigate = useNavigate();

    const { loading,
        setLoading,
        allMessages,
        setAllMessages, } = useContext(MessageContext)
    const sendMessage = async ({ name, email, message }) => {
        setLoading(true)
        try {
            const response = await sendMessageAPI({ name, email, message })
            if (response) {
                setAllMessages([...allMessages, response])
                navigate("/admin")
            }
        } catch (error) {
            console.error("Send message error:", error);

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await getAllMessages()
                if (response) {
                    setAllMessages(response.messages)
                }
            } catch (error) {
                console.log("fetching messages error:", error)
            } finally {
                setLoading(false)
            }
        }

        return () => {
            fetchMessages()
        }
    }, [])

    return { loading, allMessages, sendMessage }
}

