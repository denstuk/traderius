import { ioc } from "../../../src/ioc";
import { Thread } from "../../../src/infra";

describe("Infrastructure: Thread", () => {
	const thread = ioc.resolve(Thread);

	test("should be defined", async () => {
		expect(thread).toBeDefined();
	});

	test("should not throw exceptions", async () => {
		await thread.sleep(10);
	});
});
