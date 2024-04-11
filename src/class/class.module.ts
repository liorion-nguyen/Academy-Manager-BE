import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Class } from './entities/class.entities';
import { ClassRepository } from './repository/class.repository';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, ClassRepository, User]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}