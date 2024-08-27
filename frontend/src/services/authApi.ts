import fetchData from "./fetchData";
import {ILogin} from "../features/auth/interfaces/ILogin";
import {ISignUp} from "../features/auth/interfaces/ISignUp";
import {IUser} from "../features/common/interfaces/IUser";

const apiPrefix: string = process.env.REACT_APP_API_PREFIX as string;

export async function signUp(credentials: ISignUp): Promise<IUser> {
    const response: Response = await fetchData(apiPrefix + "/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function login(credentials: ILogin): Promise<IUser> {
    const response: Response = await fetchData(apiPrefix + "/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json();
}

export async function logout(): Promise<IUser> {
    const response: Response = await fetchData(apiPrefix + "/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json();
}