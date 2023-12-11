export interface User {
    uuid: string|null;
    username: string;
    password: string;
}

export interface UnregisteredUser {
    username: string;
    password: string;
}

export interface Result<T> {
    success: T,
    status: number,
    ok: boolean
}