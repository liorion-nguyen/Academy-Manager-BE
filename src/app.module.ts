import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { FirebaseModule } from './firebase/firebase.module';
import { ClassModule } from './class/class.module';
import { Class } from './class/entities/class.entities';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User, Notification, Class],
    }),
    UserModule,
    ClassModule,
    AuthModule,
    FirebaseModule,
    NotificationModule,
    JwtModule.register({
      secret: 'liorion',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
