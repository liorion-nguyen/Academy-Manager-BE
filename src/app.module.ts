import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { FirebaseModule } from './firebase/firebase.module';
import { ClassModule } from './class/class.module';
import { Class } from './class/entities/class.entities';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entities';
import { BoxChat } from './boxChat/entities/boxChat.entities';
import { BoxChatModule } from './boxChat/boxChat.module';
import { SocketGateway } from './socket/socket.gateway';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User, Notification, Class, Message, BoxChat],
    }),
    UserModule,
    ClassModule,
    AuthModule,
    MessageModule,
    BoxChatModule,
    FirebaseModule,
    NotificationModule,
    JwtModule.register({
      secret: 'liorion',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})

export class AppModule {

}
