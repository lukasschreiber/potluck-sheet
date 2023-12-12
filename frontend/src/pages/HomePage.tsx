import {ChangeEvent, useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth.tsx";
import {useTableStream} from "../hooks/useTableStream.tsx";
import {updateTable} from "../api";
import {Card} from "../components/common/Card.tsx";

export function HomePage() {
    const tableStream = useTableStream()
    const auth = useAuth()
    const [tableValues, setTableValues] = useState<Map<string, string>>(new Map());

    useEffect(() => {
        if (tableStream?.tables) {
            const initialTableValues = new Map(
                tableStream.tables.map((table) => {
                    const record: [string, string] = [
                        table.uuid,
                        table.entries.find((entry) => entry.user.uuid === auth?.user?.uuid)?.value || "",
                    ];
                    return record;
                })
            );
            setTableValues(initialTableValues);
        }
    }, [tableStream, auth]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>, tableId: string) {
        const newValue = event.currentTarget.value;

        setTableValues((prevTableValues) => {
            const newTableValues = new Map(prevTableValues);
            newTableValues.set(tableId, newValue);
            return newTableValues;
        });

        updateTable(newValue, tableId)
    }

    return (
        <div className={"m-10 flex flex-col gap-10"}>
            {tableStream?.tables.sort((a, b) => a.name.localeCompare(b.name)).map(table => (
                <Card key={table.uuid}>
                    <h2 className={"text-slate-600 text-2xl"}>{table.name}</h2>
                    <p className={"text-slate-400 text-sm"}>{table.description}</p>
                    <table className={"border w-full mt-2"}>
                        <thead>
                        <tr>
                            <th className={"border py-1 px-2 text-left"}>Name</th>
                            <th className={"border py-1 px-2 text-left"}>Ich bringe mit</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={auth?.user?.uuid}>
                            <td className={"border px-2"}>{auth?.user?.name}</td>
                            <td className={"border px-2"}><input className={"w-full outline-0"} type={"text"} value={tableValues.get(table.uuid)}
                                                                 onChange={(event) => handleInputChange(event, table.uuid)}/>
                            </td>
                        </tr>
                        {table.entries.filter(entry => entry.user.uuid !== auth?.user?.uuid).sort((a, b) => a.user.name.localeCompare(b.user.name)).map(entry => (
                            <tr key={entry.uuid}>
                                <td className={"border px-2"}>{entry.user.name}</td>
                                <td className={"border px-2"}>{entry.value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Card>
            ))}
        </div>
    )
}