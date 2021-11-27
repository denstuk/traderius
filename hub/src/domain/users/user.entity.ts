import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar", { nullable: false })
    login!: string;

    @Column("varchar", { nullable: false })
    email!: string;

    @Column("varchar", { nullable: false })
    password!: string;
}
