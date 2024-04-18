import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsString, IsNotEmpty, Length, IsOptional, IsBoolean, IsDate, IsObject } from "class-validator";
import { User } from "src/user/entities/user.entity";

interface Emoji {
    userId: string,
    type: string
}
interface Reply {
    id: string,
    content: string
}
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
    @IsString()
    boxId: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Column('jsonb', { nullable: true })
    @IsObject()
    @IsOptional()
    reply: Reply[];

    @Column('jsonb', { nullable: true })
    @IsObject()
    @IsOptional()
    emoji: Emoji[];

    @CreateDateColumn()
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    @IsOptional()
    updatedAt: Date;
}