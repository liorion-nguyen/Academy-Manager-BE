import { User } from '../../user/entities/user.entity';
export declare class Notification {
    id: string;
    title: string;
    content: string;
    userId: string;
    user: User;
}
