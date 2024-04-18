import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Message } from "./entities/message.entities";
import { BoxChat } from "src/boxChat/entities/boxChat.entities";
export declare class MessageService {
    private readonly userRepository;
    private readonly messageRepository;
    private readonly boxChatRepository;
    constructor(userRepository: Repository<User>, messageRepository: Repository<Message>, boxChatRepository: Repository<BoxChat>);
    getChat(boxId: string): Promise<Message[]>;
    createMessage(content: any): Promise<any>;
    sendChatAi(content: any): Promise<any>;
    deleteBox(boxId: string): Promise<any>;
}
