import {Result, Table, UnregisteredUser, User} from "./types.ts";

function emptyResult(ok: boolean, status: number): Result<null> {
    return {
        status,
        ok,
        body: null
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

export async function login(user: UnregisteredUser): Promise<Result<User>> {
    const response = await fetch(API_PATH + "/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers
    })
    const json = await response.json()
    return {
        status: response.status,
        ok: response.ok,
        body: json
    }
}

export async function getTables(): Promise<Result<Table[]>> {
    const response = await fetch(API_PATH + "/tables", {
        method: "GET",
        headers
    })
    const json = await response.json()
    return {
        status: response.status,
        ok: response.ok,
        body: json
    }
}


