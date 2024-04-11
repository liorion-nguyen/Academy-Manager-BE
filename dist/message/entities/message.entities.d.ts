import { User } from "src/user/entities/user.entity";
export declare class Message {
    id: string;
    userId: string;
    user: User;
    boxId: string;
    mode: boolean;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
