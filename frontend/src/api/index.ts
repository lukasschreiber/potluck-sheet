import {ApiConfig, ApiError, LoggedInUser, Result, Table, UnregisteredUser, User} from "./types.ts";

export const API_PATH = "http://192.168.178.73:8080/api"

const headers: HeadersInit = {
    "Content-Type": "application/json"
}

export function getAuthenticatedHeaders(headers: HeadersInit = {}): HeadersInit {
    const user = localStorage.getItem("user")
    if(user == null) return headers
    const loggedInUser: LoggedInUser = JSON.parse(user)
    return {
        ...headers,
        "Authorization": "Basic " + loggedInUser.basicAuth
    }
}

export async function register(user: UnregisteredUser): Promise<Result<User | ApiError>> {
    const response = await fetch(API_PATH + "/auth/register", {
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

export async function getConfig(): Promise<Result<ApiConfig>> {
    const response = await fetch(API_PATH + "/config", {
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

export async function getTables(): Promise<Result<Table[]>> {
    const response = await fetch(API_PATH + "/tables", {
        method: "GET",
        headers: getAuthenticatedHeaders(headers)
    })
    const json: Table[] = await response.json()
    return {
        status: response.status,
        ok: response.ok,
        body: json
    }
}

export async function updateTable(value: string, tableId: string): Promise<Result<null>> {
    const response = await fetch(API_PATH + "/tables/entry", {
        method: "POST",
        body: JSON.stringify({
            tableId,
            value
        }),
        headers: getAuthenticatedHeaders(headers)
    })
    return {
        status: response.status,
        ok: response.ok,
        body: null
    }
}


