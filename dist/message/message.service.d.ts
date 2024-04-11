import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Message } from "./entities/message.entities";
import { ReturnMessage } from "./entities/returnMess.entities";
export declare class MessageService {
    private readonly userRepository;
    private readonly messageRepository;
    constructor(userRepository: Repository<User>, messageRepository: Repository<Message>);
    getChat(boxId: string): Promise<Message[]>;
    getBoxChat(userId: string): Promise<string[]>;
    sendChat(content: ReturnMessage): Promise<string>;
}
