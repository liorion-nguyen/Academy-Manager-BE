import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
<<<<<<< HEAD
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }
=======
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
>>>>>>> 176a68f70f82014d60fd9fdd92d6b400ab8944f7

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByemail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

<<<<<<< HEAD
    async login(user: any) {
        const payload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.generateRefreshToken();
        this.saveTokensToDatabase(user.id, accessToken, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
=======
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();
    this.saveTokensToDatabase(user.id, accessToken, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
>>>>>>> 176a68f70f82014d60fd9fdd92d6b400ab8944f7

  private generateRefreshToken(): string {
    const tokenLength = 32;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let refreshToken = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      refreshToken += characters[randomIndex];
    }
    return refreshToken;
  }

<<<<<<< HEAD
    private saveTokensToDatabase(userId: string, accessToken: string, refreshToken: string) {
        this.userService.saveTokens(userId, accessToken, refreshToken);
    }
=======
  private saveTokensToDatabase(
    userId: string,
    accessToken: string,
    refreshToken: string,
  ) {
    // Lưu access token và refresh token vào cơ sở dữ liệu
    this.userService.saveTokens(userId, accessToken, refreshToken);
  }
>>>>>>> 176a68f70f82014d60fd9fdd92d6b400ab8944f7

  async refreshTokens(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
    const user = await this.userService.findByemail(payload.email);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }
<<<<<<< HEAD

    async getUserFromAccessToken(accessToken: string) {
        try {
            const jwtParts = accessToken.split('.');
            if (jwtParts.length !== 3) {
                throw new Error('Invalid Access Token');
            }
            const encodedPayload = jwtParts[1];
            const decodedPayload = Buffer.from(encodedPayload, 'base64').toString('utf-8');
            const data = JSON.parse(decodedPayload);
            const user = await this.userService.findByemail(data.email);
            return {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                gender: user.gender,
                address: user.address,
                avatar: user.avatar,
                isActive: true
            };
        } catch (error) {
            return false;
        }
    }
=======
    const newAccessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    return {
      access_token: newAccessToken,
      refresh_token: refreshToken,
    };
  }

  async checkAccesstoken(accessToken: string) {
   try {
    const user = await this.userService.findByAccess(accessToken);
    delete user.createdAt;
    delete user.updatedAt;
    delete user.isLoggedIn;
    delete user.lastLoginAt;
    delete user.refreshToken;
    delete user.accessToken;
    return user;
   } catch (error) {
    throw new UnauthorizedException('Accesstoken not found');
   }
  }
>>>>>>> 176a68f70f82014d60fd9fdd92d6b400ab8944f7
}
