import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string;

    @Column("varchar", { nullable: false })
    login!: string;

    @Column("varchar", { nullable: false })
    email!: string;

    @Column("varchar", { nullable: false })
    password!: string;
}