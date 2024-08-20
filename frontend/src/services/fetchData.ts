import {BadRequestError, ConflictError, NotFoundError, UnauthorizedError} from "../errors/httpErrors";

export default async function fetchData(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const response: Response = await fetch(input, init);

    if (!response.ok) {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;

        switch (response.status) {
            case 400: throw new BadRequestError(errorMessage);
            case 401: throw new UnauthorizedError(errorMessage);
            case 404: throw new NotFoundError(errorMessage);
            case 409: throw new ConflictError(errorMessage);
            default: throw new Error("Request failed with status: " + response.status + ", message: " + errorMessage);
        }
    }

    return response;
}