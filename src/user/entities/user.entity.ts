import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Length(1, 100)
    fullName: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    email: string;

    @Column()
    @IsNotEmpty()
    @Length(1, 11)
    phone: number;

    @Column()
    @IsNotEmpty()
    @Length(6, 100)
    username: string;

    @Column()
    @IsNotEmpty()
    @Length(6, 50)
    password: string;

    @Column({ default: false })
    isLoggedIn: boolean;

    @Column({ nullable: true })
    lastLoginAt: Date;

    @Column({ nullable: true })
    accessToken: string;

    @Column({ nullable: true })
    refreshToken: string;
}
