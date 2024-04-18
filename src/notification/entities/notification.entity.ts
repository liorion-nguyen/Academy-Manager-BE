import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, BeforeInsert, getRepository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    content: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'userId' })
    user: User;

    @CreateDateColumn()
    @IsDate()
    @IsOptional()
    createdAt: Date;
}
