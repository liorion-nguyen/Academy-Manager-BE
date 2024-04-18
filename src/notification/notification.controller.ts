// notification.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Get()
    findAll(): Promise<Notification[]> {
        return this.notificationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Notification | undefined> {
        return this.notificationService.findOne(id);
    }

    @Get('/user/:id')
    findUser(@Param('id') id: string): Promise<Notification[] | undefined> {
        return this.notificationService.findUser(id);
    }

    @Post()
    create(@Body() notification: Notification) {
        return this.notificationService.create(notification);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() notification: Partial<Notification>): Promise<Notification | undefined> {
        return this.notificationService.update(id, notification);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.notificationService.remove(id);
    }
}
