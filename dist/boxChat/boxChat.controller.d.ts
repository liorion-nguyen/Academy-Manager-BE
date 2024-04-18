import { BoxChatService } from "./boxChat.service";
export declare class BoxChatController {
    private readonly boxChatService;
    constructor(boxChatService: BoxChatService);
    getBoxChat(id: string): Promise<any>;
    getInformationUser(id: string): Promise<any>;
    getBoxIdWithUser(id1: string, id2: string): Promise<any>;
    createBoxChat(content: any): Promise<any>;
}
