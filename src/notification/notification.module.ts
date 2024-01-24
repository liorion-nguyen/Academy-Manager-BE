import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from './repository/notification.repository';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, NotificationRepository])],
  controllers: [NotificationController],
  providers: [NotificationService],

})
export class NotificationModule { }
