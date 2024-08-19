import fetchData from "./fetchData";
import {ILogin, ISignUp} from "../interfaces/auth";
import {User} from "../models/user";

const apiPrefix: string | undefined = process.env.REACT_APP_API_PREFIX;

export async function signUp(credentials: ISignUp): Promise<User> {
    const response: Response = await fetchData(apiPrefix + "/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function login(credentials: ILogin): Promise<User> {
    console.log(credentials);
    const response: Response = await fetchData(apiPrefix + "/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json();
}

export async function logout(): Promise<User> {
    const response: Response = await fetchData(apiPrefix + "/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return response.json();
}