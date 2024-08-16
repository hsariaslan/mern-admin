import createHttpError from "http-errors";

export const unknownErrorMessage: string = "An unknown error occurred!";
export const unknownErrorStatusCode: number = 500;

export function missingParam() {
    return createHttpError(400, "Parameters are missing");
}

export function passwordsDoesntMatch() {
    return createHttpError(400, "Passwords does not match");
}

export function invalidCredentials() {
    return createHttpError(401, "Invalid credentials");
}

export function userIsNotAuthenticated() {
    return createHttpError(401, "User is not authenticated");
}

export function userIsNotAuthorized() {
    return createHttpError(401, "User is not authorized");
}

export function notFoundError(subject: string) {
    return createHttpError(404, subject + " not found");
}

export function userNotFound() {
    return notFoundError("User");
}

export function roleNotFound() {
    return notFoundError("Role");
}

export function permissionNotFound() {
    return notFoundError("Permission");
}

export function endpointNotFound() {
    return notFoundError("Endpoint");
}

export function alreadyExistsError(subject: string) {
    return createHttpError(409, subject + " already exists");
}

export function usernameAlreadyExists() {
    return alreadyExistsError("Username");
}

export function emailAlreadyExists() {
    return alreadyExistsError("Email");
}

export function roleAlreadyExists() {
    return alreadyExistsError("Role");
}

export function permissionAlreadyExists() {
    return alreadyExistsError("Permission");
}