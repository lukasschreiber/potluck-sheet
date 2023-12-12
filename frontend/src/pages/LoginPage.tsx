import React, {useState} from "react";
import {login} from "../api";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";

export function LoginPage() {
    const [error, setError] = useState<String|undefined>(undefined)
    const auth  = useAuth()

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const name = (event.currentTarget.querySelector("#name") as HTMLInputElement).value
        const password = (event.currentTarget.querySelector("#password") as HTMLInputElement).value

        const result = await login({
            name: name,
            password: password
        })
        if(result.ok && result.status == 200) {
            auth?.login({
                name: result.body.name,
                uuid: result.body.uuid,
                basicAuth: btoa(name + ":" + password)
            })
        } else {
            setError("Login failed, username or password are not correct.")
        }
    }

    return (
        <form className={"flex flex-col"} onSubmit={handleLogin}>
            <input type="text" placeholder="Name" id="name" />
            <input type="password" placeholder="Password" id={"password"} />
            <button type="submit">Login</button>
            {error != undefined && <div>{error}</div>}
            <Link to={"/register"} >Register</Link>
        </form>
    )
}
