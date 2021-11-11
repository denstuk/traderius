import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Currency} from "../../infra/market/interfaces";

@Entity({ name: "transaction" })
export class Transaction {
	@PrimaryGeneratedColumn("uuid")
	id!: string

	@Column("varchar", { nullable: false })
	ticker!: string

	@Column("varchar", { nullable: false })
	name!: string

	@Column("int", { nullable: false })
	amount!: number

	@Column("decimal", { nullable: false })
	price!: number

	@Column("enum", { enum: Currency, nullable: false })
	currency!: Currency

	@CreateDateColumn()
	createdAt!: Date
}
