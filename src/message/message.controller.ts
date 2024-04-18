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
    
    @Post('/chatAi')
    async sendChatAi(@Body() content: ReturnMessage): Promise<any> {
        return this.messageService.sendChatAi(content);
    }

    @Post()
    async createMessage(@Body() content: any): Promise<any> {
        return this.messageService.createMessage(content);
    }

    @Delete('/:id')
    async deleteBox(@Param('id') id: string): Promise<any> {
        return this.messageService.deleteBox(id);
    }
}