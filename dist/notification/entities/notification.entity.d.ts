import { User } from '../../user/entities/user.entity';
export declare class Notification {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
    user: User;
}
