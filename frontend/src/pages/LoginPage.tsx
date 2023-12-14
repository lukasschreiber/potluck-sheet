import React, {useState} from "react";
import {login} from "../api";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";
import {Card} from "../components/common/Card.tsx";
import {Input} from "../components/common/Input.tsx";
import {Button} from "../components/common/Button.tsx";
import {AbiLogo} from "../assets";
import {User} from "../api/types.ts";

export function LoginPage() {
    const [error, setError] = useState<string|undefined>(undefined)
    const auth  = useAuth()

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nameInput = event.currentTarget.querySelector("#name") as HTMLInputElement
        const passwordInput = event.currentTarget.querySelector("#password") as HTMLInputElement

        const result = await login({
            name: nameInput.value,
            password: passwordInput.value
        })

        if(result.ok && result.status == 200 && result.body) {
            const user: User = result.body as User
            auth?.login({
                name: user.name,
                uuid: user.uuid,
                basicAuth: btoa(user.name + ":" + passwordInput.value)
            })
        } else {
            setError("Das Login ist Fehlgeschlagen, Nutzername oder Passwort sind falsch.")
        }
    }

    return (
        <div className={"flex items-center justify-center flex-1 flex-col  mb-10"}>
            <AbiLogo className={"w-[350px] h-fit"}/>
            <Card className={"h-fit w-[400px]"}>
                <div className={"text-2xl text-slate-700 text-center mb-2"}>Anmelden</div>
                <form className={"flex flex-col"} onSubmit={handleLogin}>
                    <Input type="text" placeholder="Name" id="name" />
                    <Input type="password" placeholder="Passwort" id={"password"} />
                    {error && <div className={"text-red-500 text-sm"}>{error}</div>}
                    <Button type="submit">Anmelden</Button>
                    <div className={"text-sm text-slate-600"}>Du hast noch keinen Account? <Link to={"/register"} className={"underline"}>Hier Registrieren</Link></div>
                </form>
            </Card>
        </div>
    )
}
