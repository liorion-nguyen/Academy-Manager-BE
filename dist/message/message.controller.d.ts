import { MessageService } from "./message.service";
import { ReturnMessage } from "./entities/returnMess.entities";
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getChat(id: string): Promise<any>;
    sendChatAi(content: ReturnMessage): Promise<any>;
    createMessage(content: any): Promise<any>;
    deleteBox(id: string): Promise<any>;
}
