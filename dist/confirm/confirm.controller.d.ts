import { ConfirmService } from './confirm.service';
import { User } from 'src/user/entities/user.entity';
import { Confirm } from './entities/confirm.etities';
export declare class ConfirmController {
    private readonly confirmService;
    constructor(confirmService: ConfirmService);
    sendCode(user: User): Promise<Confirm>;
    confirmCode(user: User, code: string): Promise<any>;
}
