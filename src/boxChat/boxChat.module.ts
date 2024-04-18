import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxChatService } from './boxChat.service';
import { BoxChatController } from './boxChat.controller';
import { BoxChat } from './entities/boxChat.entities';
import { User } from 'src/user/entities/user.entity';
import { BoxChatRepository } from './respository/boxChat.respository';

@Module({
  imports: [TypeOrmModule.forFeature([BoxChat, User, BoxChatRepository])],
  controllers: [BoxChatController],
  providers: [BoxChatService],
})
export class BoxChatModule {}