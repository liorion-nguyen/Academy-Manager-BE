import { Module } from '@nestjs/common';
import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [FirebaseController],
  providers: [FirebaseService]
})
export class FirebaseModule {}
