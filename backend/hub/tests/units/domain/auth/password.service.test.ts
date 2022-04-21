import { ioc } from "../../../../src/ioc";
import { PasswordService } from "../../../../src/domain/auth/password.service";

describe("Domain: Authorization: PasswordService", () => {
	const passwordService = ioc.resolve(PasswordService);

	test("should be defined", () => {
		expect(passwordService).toBeDefined();
	});

	test("should return password and salt", () => {
		const result = passwordService.createHash("example");
		expect(result.salt).toBeDefined();
		expect(result.password).toBeDefined();
	});

	test("should return different password by same input", () => {
		const result1 = passwordService.createHash("example");
		const result2 = passwordService.createHash("example");
		expect(result1.password).not.toEqual(result2.password);
	});

	test("should return true when passwords are equal", () => {
		const result = passwordService.createHash("example");
		const isSame = passwordService.compareHashes("example", result.salt, result.password);
		expect(isSame).toBeTruthy();
	});

	test("should return false when passwords are not equal", () => {
		const result = passwordService.createHash("example");
		const isSame = passwordService.compareHashes("another", result.salt, result.password);
		expect(isSame).toBeFalsy();
	});
});
