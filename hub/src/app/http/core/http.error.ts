import { HttpStatus } from "./http-status.enum";

export class HttpError extends Error {
    readonly status: HttpStatus

    constructor(status: HttpStatus, details: string) {
        super(details);
        this.status = status;
    }
}