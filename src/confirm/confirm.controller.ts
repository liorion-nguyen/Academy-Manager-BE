import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import internal from 'stream';
import { ConfirmService } from './confirm.service';
import { User } from 'src/user/entities/user.entity';
import { Confirm } from './entities/confirm.etities';

@Controller('confirm')
export class ConfirmController {
    constructor(private readonly confirmService: ConfirmService) {}

    @Post('email')
    async sendCode(@Body() user:User) {
        return this.confirmService.sendCode(user);
    }

    @Post('code/:code')
    async confirmCode(@Body() user: User, @Param('code') code: string) {
        return this.confirmService.confirmCode(user, code);
    }
}