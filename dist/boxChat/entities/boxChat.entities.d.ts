interface ContactUser {
    userId: string;
    nickName: string;
    role: string;
}
export declare class BoxChat {
    id: string;
    name: string;
    avatar: string;
    contactUser: ContactUser[];
    emotional: string;
    theme: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
