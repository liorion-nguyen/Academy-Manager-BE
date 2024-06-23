import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class OverviewService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<void>;
}
