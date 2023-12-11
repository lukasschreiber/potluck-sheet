import React, {createContext, PropsWithChildren, useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage.ts";
import {User} from "../api/types.ts";

interface AuthContextProps {
    user: User | null;
    login: (data: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useLocalStorage("user");
    const navigate = useNavigate();

    const login = async (data: User) => {
        setUser(data);
        navigate("/");
    };

    const logout = () => {
        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};