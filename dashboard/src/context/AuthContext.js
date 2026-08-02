import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            try {

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

        setUser(null);

        window.location.href = "/login";

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