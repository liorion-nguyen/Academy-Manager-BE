import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Confirm {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @Length(5, 100)
    email: string;

    @Column()
    @IsString()
    @Length(8, 100)
    phone: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(4, 8)
    code: string;  

    @UpdateDateColumn()
    @IsDate()
    @IsOptional()
    timeSendCode: Date;
}