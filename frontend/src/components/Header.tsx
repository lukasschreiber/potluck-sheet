import {useAuth} from "../hooks/useAuth.tsx";
import {useConnectionStream} from "../hooks/useConnectionStream.tsx";
import {createPortal} from "react-dom";
import {Card} from "./common/Card.tsx";
import {useState} from "react";

export function Header() {
    const auth = useAuth()
    const connectionStream = useConnectionStream()
    const [userModalOpen, setUserModalOpen] = useState(false)
    function handleLogout() {
        auth?.logout()
    }

    function handleReconnect() {
        connectionStream?.reconnect()
    }

    return <header className={"sticky shadow-lg flex flex-col top-0"}>
        <div className={"flex flex-row bg-slate-50 px-4 py-2 items-center gap-5"}>
            <h1 className={"text-slate-600 text-2xl"}>Mitbringliste Jahrgangstreffen</h1>
            <div className={"sm:block hidden text-slate-400 cursor-pointer hover:bg-slate-100 rounded-md p-1 ml-auto"} onClick={() => setUserModalOpen(true)}>{connectionStream?.users.length || 0} Nutzer Online</div>
            <button className={"underline text-slate-400"} onClick={handleLogout}>Abmelden</button>
        </div>
        {!connectionStream?.users.find(user => user.uuid === auth?.user?.uuid) &&
            <div className={"px-4 py-1 bg-amber-300 text-amber-600 flex flex-row gap-2"}><span>Du hast die Verbindung zum Server verloren.</span>
                <button className={"ml-auto underline"} onClick={handleReconnect}>Neu verbinden</button>
            </div>}
        {userModalOpen && createPortal(<div
            onClick={(event) => (event.target as HTMLElement).id === "modal-bg" && setUserModalOpen(false)}
            id={"modal-bg"}
            className={"fixed top-0 left-0 w-screen h-screen bg-slate-200/50 backdrop-blur-sm flex items-center justify-center"}>
            <Card className={"bg-white"}>
                <div className={"text-2xl text-slate-700 text-center mb-2"}>Aktive Nutzer</div>
                {connectionStream?.users.sort((a, b) => a.name.localeCompare(b.name)).map(user =>
                    <div>{user.name}{user.uuid === auth?.user?.uuid ? " (ich)" : ""}</div>)}
            </Card>
        </div>, document.body)}
    </header>
}