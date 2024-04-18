// notification.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,) { }

    async findAll(): Promise<Notification[]> {
        return this.notificationRepository.find();
    }

    async findOne(id: string): Promise<Notification | undefined> {
        return this.notificationRepository.findOne({ where: { id } });
    }

    async findUser(userId: string): Promise<Notification[] | undefined> {
        return this.notificationRepository.find({ where: { userId } });
    }

    async create(notification: Notification) {
        try {
            await this.userRepository.findOne({ where: { id: notification.userId } })
            const newNotification = this.notificationRepository.create(notification);
            return this.notificationRepository.save(newNotification);
        } catch (error) {
            throw new BadRequestException(`User with id ${notification.userId} not found`);
        }
    }

    async update(id: string, notification: Partial<Notification>): Promise<Notification | undefined> {
        await this.notificationRepository.update(id, notification);
        return this.notificationRepository.findOne({ where: { id } });
    }

    async remove(id: string): Promise<void> {
        await this.notificationRepository.delete(id);
    }
}
