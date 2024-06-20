import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private generateRefreshToken;
    private saveTokensToDatabase;
    refreshTokens(refreshToken: string): Promise<void>;
    getUserFromAccessToken(accessToken: string): Promise<false | {
        id: string;
        fullName: string;
        role: import("src/user/enum/user.enum").Role;
        avatar: string;
        isActive: boolean;
    }>;
}
