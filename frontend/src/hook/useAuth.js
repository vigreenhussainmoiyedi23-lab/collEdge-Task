import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { login, logout, register, getMe } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
export const useAuth = () => {
    const navigate = useNavigate();
    const { loading, setLoading, isAuthenticated, userRole, setIsAuthenticated, setUserRole, user, setUser } = useContext(AuthContext)
    const loginHandler = async ({ email, password }) => {
        setLoading(true)
        try {
            const response = await login(email, password)
            if (response) {
                setIsAuthenticated(true)
                setUserRole(response.role)
                setUser(response)
                navigate("/")
            }
        } catch (error) {
            throw error

        } finally {
            setLoading(false)
        }
    }
    const logoutHandler = async () => {
        setLoading(true)
        try {
            const response = await logout()
            if (response) {
                setIsAuthenticated(false)
                setUserRole(null)
                setUser(null)
                navigate("/login")
            }
        } catch (error) {
            console.log("Logout error:", error)
        } finally {
            setLoading(false)
        }
    }
    const registerHandler = async ({ email, name, password }) => {
        setLoading(true)
        try {
            const response = await register(email, name, password)
            if (response) {
                setIsAuthenticated(true)
                setUserRole(response.role)
                setUser(response)
                navigate("/")
            }
        } catch (error) {
            throw error.response.data.message || error.response.data.errors[0].msg
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getMe()
                if (response) {
                    setIsAuthenticated(true)
                    setUserRole(response.role)
                    setUser(response.user)

                }
            } catch (error) {
                console.log("fetching user error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()

    }, [])

    return { loading, isAuthenticated, userRole, loginHandler, logoutHandler, user, registerHandler }
}
