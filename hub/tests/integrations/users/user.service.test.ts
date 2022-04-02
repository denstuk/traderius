import { ioc } from "../../../src/ioc";
import { UserService } from "../../../src/domain/users/user.service";
import { DatabaseTest } from "../../infra/database-test";
import { TestUser1Data } from "../../data/users.store";

describe("Domain: Users: UserService", () => {
	let userService: UserService;

	beforeAll(async () => {
		await DatabaseTest.connect();
		userService = ioc.resolve(UserService);
	});
	afterEach(async () => await DatabaseTest.drop());

	test("should create user and save in database", async () => {
		const user = await userService.create(TestUser1Data);
		expect(user).toBeDefined();

		const fromDb = await userService.getById(user.id);
		expect(fromDb).toBeDefined();
		expect(fromDb).toStrictEqual(user);
	});

	test("should update user and save changes", async () => {
		const user = await userService.create(TestUser1Data);
		expect(user).toBeDefined();

		const updated = await userService.update(user.id, { login: "newLogin", email: "test@ex.com" });
		expect(updated).toBeDefined();
		expect(updated.login).toEqual("newLogin");
		expect(updated.email).toEqual("test@ex.com");
	});
});
