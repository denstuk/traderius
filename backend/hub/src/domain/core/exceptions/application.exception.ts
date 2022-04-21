export class ApplicationException extends Error {
	private readonly reason: string;
	private readonly code: number;

	constructor(reason: string, code = 500) {
		super(reason);
		this.reason = reason;
		this.code = code;
	}
}
