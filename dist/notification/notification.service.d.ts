import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/user/entities/user.entity';
export declare class NotificationService {
    private notificationRepository;
    private readonly userRepository;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>);
    findAll(): Promise<Notification[]>;
    findOne(id: string): Promise<Notification | undefined>;
    findUser(userId: string): Promise<Notification[] | undefined>;
    create(notification: Notification): Promise<Notification>;
    update(id: string, notification: Partial<Notification>): Promise<Notification | undefined>;
    remove(id: string): Promise<void>;
}
