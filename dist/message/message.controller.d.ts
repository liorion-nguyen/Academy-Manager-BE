import { MessageService } from "./message.service";
import { ReturnMessage } from "./entities/returnMess.entities";
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getChat(id: string): Promise<any>;
    getBoxChat(id: string): Promise<any>;
    sendChat(content: ReturnMessage): Promise<string>;
}
