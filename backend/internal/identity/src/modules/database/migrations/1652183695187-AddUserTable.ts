import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1652183695187 implements MigrationInterface {
	name = "AddUserTable1652183695187";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2')`);
		await queryRunner.query(
			`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."user_role_enum" NOT NULL DEFAULT '1', "login" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "phone" character varying(20) NOT NULL, "password" character varying NOT NULL, "passwordSalt" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."id" IS 'User identifier'; COMMENT ON COLUMN "user"."role" IS 'Role'; COMMENT ON COLUMN "user"."login" IS 'Login'; COMMENT ON COLUMN "user"."email" IS 'Email'; COMMENT ON COLUMN "user"."phone" IS 'Phone number'; COMMENT ON COLUMN "user"."password" IS 'Password'; COMMENT ON COLUMN "user"."passwordSalt" IS 'Password salt'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
	}
}
