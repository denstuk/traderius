import { ApplicationException } from "../../../core/exceptions/application.exception";

export class TinkoffTraderMarketNotConnectedException extends ApplicationException {
	constructor() {
		super("Missed Tinkoff API market token");
	}
}
