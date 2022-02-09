import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationEntity } from "../../shared/entities/base.entity";

@Entity({ name: "users" })
export class UserEntity extends ApplicationEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { nullable: false })
    login!: string;

    @Column("varchar", { nullable: false })
    email!: string;

    @Column("varchar", { nullable: false })
    password!: string;

	@Column("varchar", { nullable: false })
	salt!: string;

	@Column("varchar", { nullable: true, name: 'tinkoff_market_token' })
	tinkoffMarketToken!: string;
}
