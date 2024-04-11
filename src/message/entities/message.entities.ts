import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsString, IsNotEmpty, Length, IsOptional, IsBoolean, IsDate } from "class-validator";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    boxId: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsBoolean()
    mode: boolean;

    @Column()
    @IsString()
    @IsNotEmpty()
    content: string;

    @CreateDateColumn()
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    @IsOptional()
    updatedAt: Date;
}