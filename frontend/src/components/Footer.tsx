import {Link} from "react-router-dom";
import {Github} from "../assets";
import {useEffect, useState} from "react";
import {ApiConfig} from "../api/types.ts";
import {getConfig} from "../api";

export function Footer() {
    const [config, setConfig] = useState<ApiConfig | undefined>(undefined)

    useEffect(() => {
        getConfig().then(result => setConfig(result.body))
    }, [])

    return (
        <footer className="bg-slate-50 px-5 py-2 text-slate-500 w-full flex md:flex-row flex-col justify-between gap-2">
            <div className={"hidden sm:block"}>
                &copy; <span>{config?.buildYear}</span>,
                Lukas Schreiber, David Heins - Version <span>{config?.version}</span>
            </div>
            <div className={"sm:hidden gap-2 flex flex-col"}>
                <div>&copy; <span>{config?.buildYear}</span>,
                    Lukas Schreiber, David Heins
                </div>
                <div>Version <span>{config?.version}</span></div>
            </div>
            <div className={"flex sm:flex-row gap-2 flex-col"}>
                <a href={"https://github.com/lukasschreiber/potluck-sheet"} target={"_blank"} className={"inline-flex items-center gap-1 underline"}>Source <Github className={"w-4 h-4"}/></a>
                <Link to={"/imprint"} className={"underline"}>Impressum</Link>
                <Link to={"/privacy"} className={"underline"}>Datenschutzerklärung</Link>
            </div>
        </footer>
    )
}