import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entities';
import { User } from 'src/user/entities/user.entity';
import { MessageRepository } from './respository/message.respository';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, MessageRepository])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}