import {ConnectionStreamMessage, User} from "../api/types.ts";
import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {API_PATH, getAuthenticatedHeaders} from "../api";
import {fetchEventSource} from "@microsoft/fetch-event-source";

interface ConnectionStreamContextProps {
    users: User[],
    abort: () => void,
    reconnect: () => void
}

const ConnectionStreamContext = createContext<ConnectionStreamContextProps | undefined>(undefined);

export const ConnectionStreamProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [users, setUsers] = useState<User[]>([])
    const [abortController, setAbortController] = useState<AbortController | undefined>(undefined)
    const [reconnect,setReconnect] = useState(false)


    useEffect(() => {
        const controller = new AbortController();
        setAbortController(controller);

        (async () => await fetchEventSource(API_PATH + "/users", {
            headers: getAuthenticatedHeaders() as Record<string, string>,
            signal: controller.signal,
            onmessage(event) {
                const message: ConnectionStreamMessage = JSON.parse(event.data)
                if (message.type === "CONNECTED") {
                    setUsers(prev => {
                        const userExists = prev.some(existingUser => existingUser.uuid === message.user.uuid);
                        if (!userExists) {
                            return [...prev, message.user];
                        }
                        return prev;
                    });
                }
                if (message.type === "DISCONNECTED") setUsers(prev => {
                    return prev.filter(user => user.uuid !== message.user.uuid);
                });
            },
        }))()

        function cleanup(){controller.abort()}

        window.addEventListener("beforeunload", cleanup)

        return () => {
            cleanup()
            window.removeEventListener("beforeunload", cleanup)
        }
    }, [reconnect])

    const value = useMemo(
        () => ({
            users,
            abort: () => abortController?.abort(),
            reconnect: () => setReconnect(val => !val)
        }),
        [users]
    );

    return <ConnectionStreamContext.Provider value={value}>{children}</ConnectionStreamContext.Provider>;
};

export const useConnectionStream = () => {
    return useContext(ConnectionStreamContext);
};
