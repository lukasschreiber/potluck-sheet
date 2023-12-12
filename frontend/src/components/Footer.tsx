import {useConfig} from "../hooks/useConfig.tsx";

export function Footer() {
    const config = useConfig()
    return (
        <footer className="bg-slate-50 px-5 py-2 text-slate-500 w-full">
            &copy; <span>{config?.config?.buildYear}</span>,
            Lukas Schreiber, David Heins - Version <span>{config?.config?.version}</span>
        </footer>
    )
}