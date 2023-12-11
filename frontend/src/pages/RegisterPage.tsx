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

        await register({username: (event.currentTarget.querySelector("#name") as HTMLInputElement).value, password: (event.currentTarget.querySelector("#password") as HTMLInputElement).value})
        alert("Successfully registered")
    }

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" id="name" />
            <input type="password" placeholder="Password" id={"password"} />
            <input type="password" placeholder="Confirm Password" id={"confirmPassword"}/>
            <button type="submit">Register</button>
        </form>
    )
}