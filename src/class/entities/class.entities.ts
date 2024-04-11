import { IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { State } from "../enum/class.enum";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(5, 100)
    course: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(5, 100)
    basis: string;  

    @Column()
    @IsString()
    @IsNotEmpty()
    @Length(5, 100)
    operate: string;

    @Column({
        type: 'enum',
        enum: State,
        default: State.Running
    })
    @IsEnum(State, { message: "Invalid State. Must be one of 'running', 'new', 'finished', 'pending', 'preparing'." })
    @IsNotEmpty()
    state: State;

    @Column({ nullable: true })
    @IsDate()
    @IsOptional()
    start: Date;

    @Column()
    @IsInt()
    @IsNotEmpty()
    countTime: number;

    @Column()
    @IsInt()
    @IsNotEmpty()
    mostLesson: number;

    @Column({ type: 'simple-array' }) 
    students: string[]

    @Column()
    teachers: string;

    @CreateDateColumn()
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    @IsOptional()
    updatedAt: Date;
}
