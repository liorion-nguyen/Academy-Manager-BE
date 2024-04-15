import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MessageService } from "./message.service";
import { ReturnMessage } from "./entities/returnMess.entities";

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get(':id')
    async getChat(@Param('id') id: string): Promise<any> {
        return this.messageService.getChat(id);
    }

    @Get('/box/:id')
    async getBoxChat(@Param('id') id: string): Promise<any> {
        return this.messageService.getBoxChat(id);
    }

    @Post()
    async sendChat(@Body() content: ReturnMessage): Promise<any> {
        return this.messageService.sendChat(content);
    }

    @Delete('/:id')
    async deleteBox(@Param('id') id: string): Promise<any> {
        return this.messageService.deleteBox(id);
    }

}