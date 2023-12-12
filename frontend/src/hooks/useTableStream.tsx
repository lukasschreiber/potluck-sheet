import {Table, TableStreamMessage} from "../api/types.ts";
import React, {createContext, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {API_PATH, getAuthenticatedHeaders, getTables} from "../api";
import {fetchEventSource} from "@microsoft/fetch-event-source";

interface TableStreamContextProps {
    tables: Table[],
    abort: () => void
}

const TableStreamContext = createContext<TableStreamContextProps | undefined>(undefined);

export const TableStreamProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [tables, setTables] = useState<Table[]>([])
    const [abortController, setAbortController] = useState<AbortController | undefined>(undefined)

    useEffect(() => {
        let controller = new AbortController();
        setAbortController(controller);

        (async () => {
            // we first need the tables
            const tables = (await getTables()).body
            setTables(tables)

            await fetchEventSource(API_PATH + "/tables/entries", {
                headers: getAuthenticatedHeaders() as Record<string, string>,
                signal: controller.signal,
                onmessage(event) {
                    const message: TableStreamMessage = JSON.parse(event.data)
                    if (message.type === "UPDATED") {
                        setTables(tables => {
                            const targetTableIndex = tables.findIndex(table => table.uuid === message.tableEntry.tableId);
                            if (targetTableIndex !== -1) {
                                const existingEntryIndex = tables[targetTableIndex].entries.findIndex(entry => entry.uuid === message.tableEntry.uuid);
                                if (existingEntryIndex !== -1) {
                                    tables[targetTableIndex].entries[existingEntryIndex] = message.tableEntry;
                                } else {
                                    tables[targetTableIndex].entries.push(message.tableEntry);
                                }
                            }

                            return [...tables];
                        })
                    }
                },
            })
        })()

        function cleanup() {
            controller.abort()
        }

        window.addEventListener("beforeunload", cleanup)

        return () => {
            cleanup()
            window.removeEventListener("beforeunload", cleanup)
        }
    }, [])

    const value = useMemo(
        () => ({
            tables,
            abort: () => abortController?.abort()
        }),
        [tables]
    );

    return <TableStreamContext.Provider value={value}>{children}</TableStreamContext.Provider>;
};

export const useTableStream = () => {
    return useContext(TableStreamContext);
};