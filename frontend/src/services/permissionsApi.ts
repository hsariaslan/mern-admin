import PermissionModel from "../features/permissions/Permission";
import fetchData from "./fetchData";

const apiPrefix: string = process.env.REACT_APP_API_PREFIX as string;

export async function index(): Promise<PermissionModel[]> {
    const response: Response = await fetchData(apiPrefix + "/permissions/");

    return response.json();
}

export async function create(credentials: PermissionModel): Promise<PermissionModel> {
    const response: Response = await fetchData(apiPrefix + "/permissions/create", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function show(slug: string): Promise<PermissionModel> {
    const response: Response = await fetchData(apiPrefix + "/permissions/" + slug);

    return response.json();
}

export async function update(slug: string, credentials: PermissionModel): Promise<PermissionModel> {
    const response: Response = await fetchData(apiPrefix + "/permissions/" + slug + "/update", {
        method: "PATCH",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.json();
}

export async function deletePermission(slug: string): Promise<void> {
    await fetchData(apiPrefix + "/permissions/" + slug + "/delete", {
        method: "DELETE",
    });
}