export interface User {
    uuid: string|null
    name: string
}

export interface LoggedInUser {
    uuid: string|null
    name: string,
    basicAuth: string
}

export interface UnregisteredUser {
    name: string
    password: string
}

export interface Result<T> {
    body: T
    status: number
    ok: boolean
}

export interface Table {
    uuid: string
    name: string
    entries: TableEntry[]
    description: string
}

export interface TableEntry {
    uuid: string
    value: string
    user: User
    tableId: string
}

export interface ApiConfig {
    version: String,
    buildYear: String
}

export interface ApiError {
    message: string
    errors: {field: string, message: string}[]
}

export interface ConnectionStreamMessage {
    type: "CONNECTED" | "DISCONNECTED",
    user: User
}

export interface TableStreamMessage {
    type: "UPDATED",
    tableEntry: TableEntry
}

export interface DietaryRestriction {
    uuid: string,
    label: string,
    color: string,
    count: number,
    active: boolean
}

export interface PatchDietaryRestriction {
    uuid: string,
    action: "ADD" | "REMOVE"
}