import { Gender, Role } from "../enum/user.enum";
export declare class User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    role: Role;
    gender: Gender;
    password: string;
    address: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isLoggedIn: boolean;
    lastLoginAt: Date;
    accessToken: string;
    refreshToken: string;
}
