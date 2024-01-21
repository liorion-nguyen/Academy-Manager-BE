import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    fullName: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    @Length(1, 100)
    email: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(1, 11)
    phone: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(6, 100)
    username: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(6, 50)
    password: string;

    @Column({ default: false })
    @IsBoolean()
    isLoggedIn: boolean;

    @Column({ nullable: true })
    @IsDate()
    lastLoginAt: Date;

    @Column({ nullable: true })
    @IsString()
    @Length(1, 255)
    accessToken: string;

    @Column({ nullable: true })
    @IsString()
    @Length(1, 255)
    refreshToken: string;
}
