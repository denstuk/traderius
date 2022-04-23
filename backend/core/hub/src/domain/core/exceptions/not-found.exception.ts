import { ApplicationException } from "./application.exception";

export class NotFoundException extends ApplicationException {
	constructor(reason: string) {
		super(reason, 404);
	}
}
