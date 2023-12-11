import React from "react";
import {login} from "../api";

export function LoginPage() {

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(event.currentTarget)
        const l = await login({
            name: (event.currentTarget.querySelector("#name") as HTMLInputElement).value,
            password: (event.currentTarget.querySelector("#password") as HTMLInputElement).value
        })
        let msg: string
        if (l.ok && l.status === 200) msg = "Successfully logged in"
        else msg = "Login failed"
        alert(msg)
    }

    return (
        <form className={"flex flex-col"} onSubmit={handleLogin}>
            <input type="text" placeholder="Name" id="name" />
            <input type="password" placeholder="Password" id={"password"} />
            <button type="submit">Login</button>
        </form>
    )
}
