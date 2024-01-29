import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    findAll(): Promise<Notification[]>;
    findOne(id: string): Promise<Notification | undefined>;
    create(notification: Notification): Promise<Notification>;
    update(id: string, notification: Partial<Notification>): Promise<Notification | undefined>;
    remove(id: string): Promise<void>;
}
