

import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender, Role } from "../enum/user.enum";
export class UpdateUserDto  {

    @IsOptional()
    @Column()
    @IsString()
    @Length(10, 100)
    @Matches(/^(?:[\p{L}\s]+(?:\s+[\p{L}\s]+){2,})?$/u, { message: 'Fullname must only contain Vietnamese letters and at least 2 spaces between words.' })
    fullName: string;

    @IsOptional()
    @Column()
    @Length(10, 11)
    @IsString()
    @Matches(/^\d+$/, { message: 'Phone must only contain digits.' })
    phone: string;

    @IsOptional()
    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.Khac
    })
    @IsEnum(Gender, { message: "Invalid gender. Must be one of 'Nam', 'Nữ'." })
    gender: Gender;

    @IsOptional()
    @Column()
    address: string;

    @IsOptional()
    @Column()
    avatar: string;


}
