const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const API_URL = `${BASE_URL}/auth`;

const api = {
    register: async (userData) => {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    login: async (userData) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    googleAuth: async (credential) => {

        const response = await fetch(`${API_URL}/google`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    forgotPassword: async (email) => {

        const response = await fetch(`${API_URL}/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },

    resetPassword: async (token, newPassword) => {

        const response = await fetch(`${API_URL}/reset-password/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword }),
        });

        const data = await response.json();

        return {
            ok: response.ok,
            data,
        };
    },
};

export default api;