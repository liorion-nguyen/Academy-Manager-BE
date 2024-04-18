import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsString, IsNotEmpty, Length, IsOptional, IsBoolean, IsDate, IsObject } from "class-validator";

interface ContactUser {
    userId: string,
    nickName: string,
    role: string,
}
@Entity()
export class BoxChat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column({nullable: true})
    avatar: string;
    
    @Column('jsonb', { nullable: true })
    @IsObject()
    @IsOptional()
    contactUser: ContactUser[];
    
    @Column({ nullable: true })
    @IsString()
    emotional: string;
    
    @Column({ nullable: true })
    @IsString()
    theme: string;

    @CreateDateColumn()
    @IsDate()
    @IsOptional()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    @IsOptional()
    updatedAt: Date;
}