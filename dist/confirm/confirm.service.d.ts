import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Confirm } from './entities/confirm.etities';
export declare class ConfirmService {
    private readonly confirmRepository;
    private readonly userRepository;
    private transporter;
    constructor(confirmRepository: Repository<Confirm>, userRepository: Repository<User>);
    private verificationCode;
    generateCode(email: string): Promise<string>;
    sendCode(user: User): Promise<Confirm>;
    confirmCode(user: User, code: string): Promise<any>;
}
