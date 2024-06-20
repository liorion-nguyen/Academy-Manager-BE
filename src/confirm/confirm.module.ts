import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/user/user.module';
import { ConfirmController } from './confirm.controller';
import { ConfirmService } from './confirm.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Confirm } from './entities/confirm.etities';
import { ConfirmRepository } from './repository/confirm.repository';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([Confirm, ConfirmRepository,User]),
    ScheduleModule.forRoot(),
    UserModule,
  ],
  controllers: [ConfirmController],
  providers: [ConfirmService]
})
export class ConfirmModule { }