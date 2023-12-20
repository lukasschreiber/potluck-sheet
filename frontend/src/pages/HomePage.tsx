import {ChangeEvent, useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth.tsx";
import {useTableStream} from "../hooks/useTableStream.tsx";
import {getDietaryRestrictions, updateTable} from "../api";
import {Card} from "../components/common/Card.tsx";
import {useConnectionStream} from "../hooks/useConnectionStream.tsx";
import {Download} from "../assets";
import {downloadCSVExport} from "../utils/csvExport.ts";
import {DietaryRestriction} from "../api/types.ts";
import {Link} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";

export function HomePage() {
    const tableStream = useTableStream()
    const auth = useAuth()
    const [tableValues, setTableValues] = useState<Map<string, string>>(new Map());
    const connectedUserStream = useConnectionStream()
    const [allRestrictions, setAllRestrictions] = useState<DietaryRestriction[]>()
    const [storedRestrictions] = useLocalStorage("restrictions")

    useEffect(() => {
        getDietaryRestrictions().then(result => {
            setAllRestrictions(result.body)
        })
    }, [])


    useEffect(() => {
        if (tableStream?.tables && tableValues.size == 0) {
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
    }, [tableStream]);

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
        <div className={"sm:m-10 m-2 flex flex-col gap-10"}>
            <div className={"text-slate-600"}>Hallo👋, bitte gebe in den folgenden Tabellen unten ein was du zum
                Jahrgangstreffen des Abijahrgangs 2020 mitbringen möchtest.
                Die Idee ist, dass jeder ein wenig Essen und/oder Trinken mitbringt, das wird dann in Form eines Buffets
                geteilt. Es wird nichts zentral bereitgestellt werden.
                In beiden Tabellen gibt es eine <span className={"rounded-sm px-1 bg-teal-500/50"}>türkise Zeile</span> in
                der du eintragen kannst was du mitbringst.
                Du brauchst nichts zu speichern, das passiert alles automatisch. Zur Orientierung fragen wir auch
                anonymisiert Unverträglichkeiten/Essgewohnheiten ab, damit das
                Buffet am Ende ausgewogen ist. Diese und die absoluten Häufigkeiten findest du unter "Häufigste
                Essenseinschränkungen". Falls ihr auch Geräte, zum Beispiel Waffelteig und Waffeleisen, oder Glühwein
                und einen Glühweintopf mitbringt vermerkt das bitte in der jeweiligen Spalte.
            </div>
            <div className={"flex flex-col-reverse w-full gap-5 md:flex-row"}>
                <div className={"flex-1 flex flex-col gap-5 mb-2"}>
                    {tableStream?.tables !== undefined && tableStream.tables.sort((a, b) => a.name.localeCompare(b.name)).map(table => (
                        <Card key={table.uuid}>
                            <div className={"flex flex-row justify-between"}>
                                <h2 className={"text-slate-600 text-2xl"}>{table.name}</h2>
                                <Download
                                    className={"text-slate-600 w-7 h-7 hover:bg-slate-200 rounded-md cursor-pointer"}
                                    onClick={() => downloadCSVExport(table)}/>
                            </div>
                            <p className={"text-slate-400 text-sm"}>{table.description}</p>
                            <table className={"border w-full mt-2"}>
                                <thead>
                                <tr>
                                    <th className={"border py-1 px-2 text-left w-[180px]"}>Name</th>
                                    <th className={"border py-1 px-2 text-left"}>Ich bringe mit</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={auth?.user?.uuid} className={"bg-teal-500/50"}>
                                    <td className={"border px-2 border-x-teal-600/30"}>{auth?.user?.name}</td>
                                    <td className={"border px-2 border-x-teal-600/30"}>
                                        {tableValues.get(table.uuid) !== undefined && <input
                                            className={"w-full outline-0 bg-transparent"} type={"text"}
                                            value={tableValues.get(table.uuid)}
                                            onChange={(event) => handleInputChange(event, table.uuid)}/>}
                                    </td>
                                </tr>
                                {table.entries.filter(entry => entry.user.uuid !== auth?.user?.uuid && entry.value.trim() !== "").sort((a, b) => a.user.name.localeCompare(b.user.name)).map(entry => (
                                    <tr key={entry.uuid}>
                                        <td className={"border px-2"}>
                                            <div className={"flex flex-row items-center justify-between"}>
                                                <span>{entry.user.name}</span>
                                                {connectedUserStream?.users.find(user => user.uuid === entry.user.uuid) &&
                                                    <span className={"italic text-xs text-slate-400"}>online</span>}
                                            </div>
                                        </td>
                                        <td className={"border px-2"}>{entry.value}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Card>
                    ))}
                </div>
                <Card className={"h-fit sm:max-w-[300px]"}>
                    <h2 className={"text-slate-600 text-xl"}>Häufigste Essenseinschränkungen</h2>
                    <div className={"flex flex-col gap-1 mt-2"}>
                        {allRestrictions?.sort((a, b) => b.count - a.count || b.label.localeCompare(a.label))
                            .filter(r => r.count > 0)
                            .map(restriction =>
                                <div key={restriction.uuid} className={"px-2 py-0.5 w-fit rounded-md"}
                                     style={{backgroundColor: restriction.color}}>{restriction.label} - {restriction.count}</div>
                            )}
                    </div>
                    {storedRestrictions && <div className={"text-sm mt-2 text-slate-400"}>
                        Einschränkungen werden nicht mit einem Nutzeraccount assoziiert, allerdings hast du deine
                        Auswahl lokal im Browser gespeichert. <Link to={"/restrictions"}
                                                                    className={"underline"}>Bearbeiten</Link>
                    </div>}
                </Card>
            </div>

        </div>
    )
}