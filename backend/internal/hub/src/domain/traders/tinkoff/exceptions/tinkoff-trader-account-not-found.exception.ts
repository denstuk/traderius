import { ApplicationException } from "../../../core/exceptions/application.exception";

export class TinkoffTraderAccountNotFoundException extends ApplicationException {
	constructor() {
		super("Tinkoff API account not found");
	}
}
