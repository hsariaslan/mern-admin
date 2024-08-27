import UserModel from "../features/users/User";
import fetchData from "./fetchData";

const apiPrefix: string = process.env.REACT_APP_API_PREFIX as string;

export async function index(): Promise<UserModel[]> {
    const response: Response = await fetchData(apiPrefix + "/users/");

    return response.json();
}

export async function create(credentials: UserModel): Promise<UserModel> {
    const response: Response = await fetchData(apiPrefix + "/users/create", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function show(username: string): Promise<UserModel> {
    const response: Response = await fetchData(apiPrefix + "/users/" + username);

    return response.json();
}

export async function update(username: string, credentials: UserModel): Promise<UserModel> {
    const response: Response = await fetchData(apiPrefix + "/users/" + username + "/update", {
        method: "PATCH",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function deleteUser(username: string): Promise<void> {
    await fetchData(apiPrefix + "/users/" + username + "/delete", {
        method: "DELETE",
    });
}