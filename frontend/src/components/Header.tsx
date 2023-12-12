import {useAuth} from "../hooks/useAuth.tsx";
import {useConnectionStream} from "../hooks/useConnectionStream.tsx";

export function Header() {
    const auth = useAuth()
    const connectionStream = useConnectionStream()

    function handleLogout() {
        auth?.logout()
    }

    function handleReconnect() {
        connectionStream?.reconnect()
    }

    return <header className={"sticky shadow-lg flex flex-col"}>
        <div className={"flex flex-row bg-slate-50 px-4 py-2 items-center gap-5"}>
            <h1 className={"text-slate-600 text-2xl"}>Potluck Sheet</h1>
            <div>{connectionStream?.users.length || 0} Users connected
                ({(connectionStream?.users || []).map(user => user.name).join(", ")})
            </div>
            <button className={"underline text-slate-400 ml-auto"} onClick={handleLogout}>Logout</button>
        </div>
        {!connectionStream?.users.find(user => user.uuid === auth?.user?.uuid) && <div className={"px-4 py-1 bg-amber-300 text-amber-600 flex flex-row gap-2"}><span>You have lost connection to the server.</span>
            <button className={"ml-auto underline"} onClick={handleReconnect}>Reconnect</button>
        </div>}
    </header>
}