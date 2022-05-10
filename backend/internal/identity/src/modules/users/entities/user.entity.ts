import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../users.types";

@Entity({ name: "user" })
export class UserEntity {
	@PrimaryGeneratedColumn("uuid", {
		comment: "User identifier",
	})
	readonly id: string;

	@Column("enum", {
		comment: "Role",
		nullable: false,
		enum: UserRole,
		default: UserRole.Simple,
	})
	role: UserRole;

	@Column("varchar", {
		comment: "Login",
		nullable: false,
		unique: true,
		length: 50,
	})
	login: string;

	@Column("varchar", {
		comment: "Email",
		nullable: false,
		unique: true,
		length: 50,
	})
	email: string;

	@Column("varchar", {
		comment: "Phone number",
		nullable: false,
		unique: true,
		length: 20,
	})
	phone: string;

	@Column("varchar", {
		comment: "Password",
		nullable: false,
	})
	password: string;

	@Column("varchar", {
		comment: "Password salt",
		nullable: false,
	})
	passwordSalt: string;
}
