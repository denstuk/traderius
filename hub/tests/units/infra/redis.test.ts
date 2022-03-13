import { ioc, Redis } from "../../../src/infra";

describe("Infrastructure: Redis", () => {
	const redis = ioc.resolve(Redis);

	test("should be defined", () => {
		expect(redis).toBeDefined();
	});
});
