import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../../core/abstract.entity";
import { UserStrategy } from "../users.types";

@Entity({
	name: "users"
})
export class UserEntity extends AbstractEntity {
	@PrimaryGeneratedColumn("uuid", {
		comment: 'User identifier'
	})
	id!: string;

	@Column("varchar", {
		comment: 'Login',
		nullable: false,
		unique: true,
	})
	login!: string;

	@Column("varchar", {
		comment: 'Email',
		nullable: false,
		unique: true
	})
	email!: string;

	@Column("varchar", {
		comment: 'Password hash',
		nullable: false
	})
	password!: string;

	@Column("varchar", {
		comment: 'Password salt',
		nullable: false
	})
	salt!: string;

	@Column("enum", {
		comment: 'Trading strategy',
		enum: UserStrategy,
		default: UserStrategy.None,
		nullable: false,
	})
	strategy!: UserStrategy;

	@Column("varchar", {
		comment: 'Tinkoff market token',
		nullable: true,
		name: "tinkoff_market_token",
	})
	tinkoffMarketToken!: string;

	@Column("boolean", {
		comment: 'Required notifications',
		nullable: false,
		name: "notification_enabled",
		default: false,
	})
	notificationEnabled!: boolean;

	@Column("boolean", {
		nullable: false,
		name: "automated_trading_enabled",
		default: false,
	})
	automatedTradingEnabled!: boolean;
}
