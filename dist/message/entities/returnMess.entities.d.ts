interface Emoji {
    userId: string;
    type: string;
}
export declare class ReturnMessage {
    id: string;
    boxId: string;
    reply: string;
    emoji: Emoji[];
    content: {
        role: string;
        parts: {
            text: string;
        }[];
    }[];
}
export {};
