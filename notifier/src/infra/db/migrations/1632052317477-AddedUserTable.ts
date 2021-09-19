import { MigrationInterface, QueryRunner } from "typeorm"

export class AddedUserTable1632052317477 implements MigrationInterface {
	name = "AddedUserTable1632052317477"

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "chatId" integer NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(`CREATE INDEX "IDX_1cfa1784ac9e67d4be782f4e5b" ON "user" ("chatId") `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "IDX_1cfa1784ac9e67d4be782f4e5b"`)
		await queryRunner.query(`DROP TABLE "user"`)
	}
}
