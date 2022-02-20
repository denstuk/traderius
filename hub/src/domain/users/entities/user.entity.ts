import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationEntity } from "../../shared/entities/base.entity";
import { UserStrategy } from "../users.types";

@Entity({ name: "users" })
export class UserEntity extends ApplicationEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column("varchar", { nullable: false, unique: true })
	login!: string;

	@Column("varchar", { nullable: false, unique: true })
	email!: string;

	@Column("varchar", { nullable: false })
	password!: string;

	@Column("varchar", { nullable: false })
	salt!: string;

	@Column("enum", { enum: UserStrategy, nullable: false, default: UserStrategy.None })
	strategy!: UserStrategy;

	@Column("varchar", { nullable: true, name: "tinkoff_market_token" })
	tinkoffMarketToken!: string;

	@Column("boolean", { nullable: false, name: "notification_enabled", default: false })
	notificationEnabled!: boolean;

	@Column("boolean", { nullable: false, name: "automated_trading_enabled", default: false })
	automatedTradingEnabled!: boolean;
}
