export interface User {
    uuid: string|null
    username: string
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