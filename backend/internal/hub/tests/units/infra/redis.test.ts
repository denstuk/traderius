import { ioc } from "../../../src/ioc";
import { Redis } from "../../../src/infra";

describe("Infrastructure: Redis", () => {
	const redis = ioc.resolve(Redis);

	test("should be defined", () => {
		expect(redis).toBeDefined();
	});
});
