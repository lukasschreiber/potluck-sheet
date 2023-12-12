import {ApiConfig} from "../api/types.ts";
import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo} from "react";
import {useLocalStorage} from "./useLocalStorage.ts";
import {getConfig} from "../api";

interface ConfigContextProps {
    config: ApiConfig | null
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [config, setConfig] = useLocalStorage("config");

    useEffect(() => {
        if(config == null) {
            getConfig().then(res => setConfig(res.body))
        }
    }, [config])

    const value = useMemo(
        () => ({
            config
        }),
        [config]
    );

    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
    return useContext(ConfigContext);
};