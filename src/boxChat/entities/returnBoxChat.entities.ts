import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNotEmpty, Length, ValidateNested } from "class-validator";

@Entity()
export class ReturnBoxChat {
    @Column()
    @IsString()
    @IsNotEmpty()
    id: string;

    @Column({ nullable: true })
    boxId: string;

    @Column("jsonb")
    @ValidateNested({ each: true })
    content: { role: string, parts: { text: string }[] }[];
}
