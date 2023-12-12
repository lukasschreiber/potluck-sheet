import {useConfig} from "../hooks/useConfig.tsx";

export function Footer() {
    const config = useConfig()
    return (<div className="bg-amber-300">&copy; <span className="text-amber-700">{config?.config?.buildYear}</span>,
        Lukas Schreiber - Version <span>{config?.config?.version}</span>
    </div>)
}