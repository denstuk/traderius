import { ioc } from "../../../../src/infra";
import { TokenService } from "../../../../src/domain/shared/token.service";

describe("Domain: Auth: TokenService", () => {
	const tokenService = ioc.resolve(TokenService);

	test("should be defined", () => {
		expect(tokenService).toBeDefined();
	});

	test("should return token", () => {
		const result = tokenService.generate({});
		expect(result).toBeDefined();
		expect(typeof result === "string").toBeTruthy();
	});

	test("should not throw when token is correct", () => {
		const token = tokenService.generate({});
		tokenService.verify<{}>(token);
	});

	test("should throw when token is invalid", () => {
		const wrapper = () => tokenService.verify("example");
		expect(wrapper).toThrow(Error);
	});

	test("should return correct payload", () => {
		const payload = { id: 1, name: "Test" };
		const token = tokenService.generate(payload);
		const result = tokenService.verify(token);
		expect(payload).toStrictEqual(result);
	});
});
