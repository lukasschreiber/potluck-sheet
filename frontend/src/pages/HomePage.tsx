import {ChangeEvent, useEffect, useState} from "react";
import {Table} from "../api/types.ts";
import {getTables} from "../api";
import {useAuth} from "../hooks/useAuth.tsx";

export function HomePage() {
    const [tables, setTables] = useState<Table[]>([])
    const auth = useAuth()
    useEffect(() => {
        getTables().then(tables => setTables(tables.body))
    }, [])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value)
    }

    return (
        <div>
            <h1>Home</h1>
            {tables.map(table => (
                <div key={table.uuid}>
                    <h2>{table.name}</h2>
                    <p>{table.description}</p>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ich bringe mit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {table.entries.map(entry => (
                            <tr key={entry.uuid}>
                                <td>{entry.user.name}</td>
                                <td>{entry.user.uuid == auth?.user?.uuid ? (<input type={"text"} value={entry.value}
                                                                                   onChange={handleInputChange}/>) : entry.value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}