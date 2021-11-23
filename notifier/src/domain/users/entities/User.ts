import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column("varchar", { unique: true, nullable: false })
	username!: string

	@Column("int")
	@Index()
	chatId!: number
}
