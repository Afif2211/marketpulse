import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            window.location.href = "/login";
        }
    }, [loading, user]);

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h3>Loading...</h3>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return children;
};

export default ProtectedRoute;