import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender, Role } from "../enum/user.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(10, 100)
    @Matches(/^(?:[\p{L}\s]+(?:\s+[\p{L}\s]+){2,})?$/u, { message: 'Fullname must only contain Vietnamese letters and at least 2 spaces between words.' })
    fullName: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    @Length(10, 100)
    email: string;

    @Column()
    @IsNotEmpty()
    @Length(10, 11)
    @IsString()
    @Matches(/^\d+$/, { message: 'Phone must only contain digits.' })
    phone: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Student
    })
    @IsNotEmpty()
    role: Role;

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.Khac
    })
    @IsNotEmpty()
    @IsEnum(Gender, { message: "Invalid gender. Must be one of 'Nam', 'Nu'." })
    gender: Gender;

    @Column()
    @IsNotEmpty()
    @IsString()
    @Length(8, 50)
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
