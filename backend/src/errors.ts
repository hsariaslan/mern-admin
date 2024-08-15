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

export function userNotFound() {
    return createHttpError(404, "User not found");
}

export function endpointNotFound() {
    return createHttpError(404, "Endpoint not found");
}

export function usernameAlreadyExists() {
    return createHttpError(409, "Username already exists");
}

export function emailAlreadyExists() {
    return createHttpError(409, "Username already exists");
}