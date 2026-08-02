import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const captureTokenFromUrl = () => {

            const params = new URLSearchParams(window.location.search);

            const tokenFromUrl = params.get("token");

            if (tokenFromUrl) {

                localStorage.setItem("token", tokenFromUrl);

                params.delete("token");

                const cleanedSearch = params.toString();

                const newUrl =
                    window.location.pathname +
                    (cleanedSearch ? `?${cleanedSearch}` : "") +
                    window.location.hash;

                window.history.replaceState({}, "", newUrl);

            }

        };

        const loadUser = async () => {

            try {

                captureTokenFromUrl();

                const result = await api.getCurrentUser();

                if (result.ok) {

                    setUser(result.data.user);

                } else {

                    setUser(null);

                }

            } catch (error) {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    const refreshUser = async () => {

        try {

            const result = await api.getCurrentUser();

            if (result.ok) {

                setUser(result.data.user);

            }

        } catch (error) {

            console.error(error);

        }

    };

    const logout = async () => {

        try {

            await api.logout();

        } catch (error) {

            console.error(error);

        }

        localStorage.removeItem("token");

        setUser(null);

        window.location.href = `${process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"}/login`;

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};

export const useAuth = () => {

    return useContext(AuthContext);

};