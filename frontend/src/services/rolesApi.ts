import RoleModel from "../features/roles/Role";
import fetchData from "./fetchData";

const apiPrefix: string = process.env.REACT_APP_API_PREFIX as string;

export async function index(): Promise<RoleModel[]> {
    const response: Response = await fetchData(apiPrefix + "/roles/");

    return response.json();
}

export async function create(credentials: RoleModel): Promise<RoleModel> {
    const response: Response = await fetchData(apiPrefix + "/roles/create", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function show(slug: string): Promise<RoleModel> {
    const response: Response = await fetchData(apiPrefix + "/roles/" + slug);

    return response.json();
}

export async function update(slug: string, credentials: RoleModel): Promise<RoleModel> {
    const response: Response = await fetchData(apiPrefix + "/roles/" + slug + "/update", {
        method: "PATCH",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function deleteRole(slug: string): Promise<void> {
    await fetchData(apiPrefix + "/roles/" + slug + "/delete", {
        method: "DELETE",
    });
}