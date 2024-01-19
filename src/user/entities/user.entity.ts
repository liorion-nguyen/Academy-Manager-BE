import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    fullName: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    phone: number;

    @Column()
    @IsNotEmpty()
    username: string;
    
    
    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    @IsDate()
    birthday: Date;
}
