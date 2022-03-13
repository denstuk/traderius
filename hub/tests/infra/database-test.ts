import { Database } from "../../src/infra";

export class DatabaseTest extends Database {
	static async drop(): Promise<void> {
		await this.connection.dropDatabase();
		await this.connect();
	}
}
