export interface User {
    uuid: string|null
    name: string
}

export interface LoggedinUser {
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
}

export interface ResponseTable {
    uuid: String,
    name: String,
    description: String,
    entries: {
        user: User,
        entry: {
            uuid: String,
            name: String,
            tableId: String,
            userId: String
        }
    }[]
}