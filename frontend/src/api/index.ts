import {LoggedinUser, ResponseTable, Result, Table, UnregisteredUser, User} from "./types.ts";

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

function getAuthenticatedHeaders() {
    const user = localStorage.getItem("user")
    if(user == null) return headers
    const loggedInUser: LoggedinUser = JSON.parse(user)
    return {
        ...headers,
        "Authorization": "Basic " + loggedInUser.basicAuth
    }
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
        headers: getAuthenticatedHeaders()
    })
    const json: ResponseTable[] = await response.json()
    return {
        status: response.status,
        ok: response.ok,
        body: json.map(table => ({
            ...table,
            entries: table.entries.map(entry => ({
                uuid: entry.entry.uuid,
                tableId: entry.entry.tableId,
                value: entry.entry.name,
                user: entry.user
            }))
        } as unknown as Table))
    }
}


