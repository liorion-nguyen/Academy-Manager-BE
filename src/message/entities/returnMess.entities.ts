import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNotEmpty, Length, ValidateNested, IsObject, IsOptional } from "class-validator";

interface Emoji {
    userId: string,
    type: string
}
@Entity()
export class ReturnMessage {
    @Column()
    @IsString()
    @IsNotEmpty()
    id: string;

    @Column({ nullable: true })
    boxId: string;

    @Column({ nullable: true })
    reply: string;

    @Column('jsonb', { nullable: true })
    @IsObject()
    @IsOptional()
    emoji: Emoji[];

    @Column("jsonb")
    @ValidateNested({ each: true })
    content: { role: string, parts: { text: string }[] }[];
}
