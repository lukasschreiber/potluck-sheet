import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import React, {PropsWithChildren} from "react";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuth()!!;
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};