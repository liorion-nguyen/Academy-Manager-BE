import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { BoxChat } from "./entities/boxChat.entities";
export declare class BoxChatService {
    private readonly userRepository;
    private readonly boxChatRepository;
    constructor(userRepository: Repository<User>, boxChatRepository: Repository<BoxChat>);
    getBoxChat(userId: string): Promise<any[]>;
    getInformationUser(id: string): Promise<User>;
    getBoxIdWithUser(id1: string, id2: string): Promise<string | Error>;
    createBoxChat(data: any): Promise<any>;
}
