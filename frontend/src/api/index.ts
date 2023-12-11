import {Result, UnregisteredUser} from "./types.ts";

function emptyResult(ok: boolean, status: number): Result<null> {
    return {
        status,
        ok,
        success: null
    }
}

const API_PATH = "http://localhost:8080/api"

const headers = {
    "Content-Type": "application/json"
}

export async function register(user: UnregisteredUser): Promise<Result<null>> {
    const res = await fetch(API_PATH + "/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers
    });
    return emptyResult(res.ok, res.status);
}

export async function login(user: UnregisteredUser): Promise<Result<null>> {
    return fetch(API_PATH + "/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers
    }).then(res => emptyResult(res.ok, res.status));
}

