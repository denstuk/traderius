import { injectable } from "inversify";

@injectable()
export class Thread {
	async sleep(ms: number): Promise<void> {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), ms);
		});
	}
}
