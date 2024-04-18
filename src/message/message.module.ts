import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entities';
import { User } from 'src/user/entities/user.entity';
import { MessageRepository } from './respository/message.respository';
import { BoxChat } from 'src/boxChat/entities/boxChat.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, BoxChat, MessageRepository])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}