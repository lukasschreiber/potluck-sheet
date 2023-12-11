import {useEffect, useState} from "react";
import {Table} from "../api/types.ts";

export function HomePage() {
    const [tables, setTables] = useState<Table[]>([])

    useEffect(() => {

    }, [])

    return (
        <div>
            <h1>Home</h1>
            {tables.map(table => (
                <div>
                    <h2>{table.name}</h2>
                    <p>{table.description}</p>
                </div>
            ))}
        </div>
    )
}