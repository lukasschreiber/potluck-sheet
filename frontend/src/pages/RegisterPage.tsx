import React, {useState} from "react";
import {register} from "../api";
import {Card} from "../components/common/Card.tsx";
import {Input} from "../components/common/Input.tsx";
import {Button} from "../components/common/Button.tsx";
import {useAuth} from "../hooks/useAuth.tsx";
import {ApiError, User} from "../api/types.ts";
import {Link} from "react-router-dom";
import {AbiLogo} from "../assets";

export function RegisterPage() {
    const auth  = useAuth()
    const [nameErrors, setNameErrors] = useState<string[]>([])
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[]>([])

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        setConfirmPasswordErrors([])
        setNameErrors([])
        setPasswordErrors([])

        event.preventDefault();
        const password = (event.currentTarget.querySelector("#password") as HTMLInputElement).value
        if(password !== (event.currentTarget.querySelector("#confirmPassword") as HTMLInputElement).value) {
            setConfirmPasswordErrors(prev => [...prev, "Die Passwörter müssen übereinstimmen."])
            return;
        }

        const result = await register({
            name: (event.currentTarget.querySelector("#name") as HTMLInputElement).value,
            password: (event.currentTarget.querySelector("#password") as HTMLInputElement).value
        })

        if(result.status == 200) {
            const user: User = result.body as User
            auth?.login({
                name: user.name,
                uuid: user.uuid,
                basicAuth: btoa(user.name + ":" + password)
            }, "/restrictions")
        } else {
            const error: ApiError = result.body as ApiError
            for(let fieldError of error.errors) {
                if(fieldError.field === "name") setNameErrors(prev => [...prev, fieldError.message])
                if(fieldError.field === "password") setPasswordErrors(prev => [...prev, fieldError.message])
            }
        }
    }

    return (
        <div className={"flex items-center justify-center flex-1 flex-col"}>
            <AbiLogo className={"w-[350px] h-fit"}/>
            <Card className={"h-fit w-[400px]"}>
                <div className={"text-2xl text-slate-700 text-center mb-2"}>Registrieren</div>
                <form className={"flex flex-col"} onSubmit={handleRegister}>
                    <Input type="text" placeholder="Name" id="name" />
                    {nameErrors.length > 0 && <div className={"text-red-500 text-sm"}>{nameErrors.map(error => <div>{error}</div>)}</div>}
                    <Input type="password" placeholder="Passwort" id={"password"} />
                    {passwordErrors.length > 0 && <div className={"text-red-500 text-sm"}>{passwordErrors.map(error => <div>{error}</div>)}</div>}
                    <Input type="password" placeholder="Passwort Wiederholen" id={"confirmPassword"} />
                    {confirmPasswordErrors.length > 0 && <div className={"text-red-500 text-sm"}>{confirmPasswordErrors.map(error => <div>{error}</div>)}</div>}
                    <Button type="submit">Registrieren</Button>
                    <div className={"text-sm text-slate-600"}>Bist du bereits registriert? <Link to={"/login"} className={"underline"}>Hier anmelden</Link></div>
                </form>
            </Card>
        </div>

    )
}
