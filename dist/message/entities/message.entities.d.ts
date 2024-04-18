import { User } from "src/user/entities/user.entity";
interface Emoji {
    userId: string;
    type: string;
}
interface Reply {
    id: string;
    content: string;
}
export declare class Message {
    id: string;
    userId: string;
    user: User;
    boxId: string;
    content: string;
    reply: Reply[];
    emoji: Emoji[];
    createdAt: Date;
    updatedAt: Date;
}
export {};
