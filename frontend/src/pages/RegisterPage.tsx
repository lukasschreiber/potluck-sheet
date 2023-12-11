import React from "react";
import {register} from "../api";

export function RegisterPage() {

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(event.currentTarget)
        if((event.currentTarget.querySelector("#password") as HTMLInputElement).value !== (event.currentTarget.querySelector("#confirmPassword") as HTMLInputElement).value) {
            alert("Passwords do not match");
            return;
        }

        const r = await register({
            name: (event.currentTarget.querySelector("#name") as HTMLInputElement).value,
            password: (event.currentTarget.querySelector("#password") as HTMLInputElement).value
        })
        let msg: string
        if (r.ok && r.status === 200) msg = "Successfully registered"
        else msg = "Registration failed"
        alert(msg)
    }

    return (
        <form className={"flex flex-col"} onSubmit={handleRegister}>
            <input type="text" placeholder="Name" id="name" />
            <input type="password" placeholder="Password" id={"password"} />
            <input type="password" placeholder="Confirm Password" id={"confirmPassword"} />
            <button type="submit">Register</button>
        </form>
    )
}
