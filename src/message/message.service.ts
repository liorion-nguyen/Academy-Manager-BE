import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository, getConnection } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entities";
import { ReturnMessage } from "./entities/returnMess.entities";
import { v4 as uuidv4 } from 'uuid';
import { BoxChat } from "src/boxChat/entities/boxChat.entities";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(BoxChat)
        private readonly boxChatRepository: Repository<BoxChat>
    ) { }

    async getChat(boxId: string) {
        return this.messageRepository.find({ where: { boxId }, select: ['id', 'reply', 'emoji', 'userId', 'content', 'createdAt', 'updatedAt'] });
    }

    async createMessage(content: any): Promise<any> {
        try {
            await this.userRepository.findOne({ where: { id: content.id } })
            const boxId = content.boxId;
            return this.messageRepository.save({
                userId: content.id,
                boxId: boxId,
                reply: content.reply || null,
                content: content.content
            });
        } catch (error) {
            throw new BadRequestException(`User with id ${content.id} not found`);
        }
    }

    async sendChatAi(content: any): Promise<any> {
        const dataFetch = {
            contents: content.content
        }

        const url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:streamGenerateContent";
        const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.API_KEY_GG,
            "Connection": "keep-alive"
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dataFetch)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();

            let message = "";
            data.forEach((mess: any) => {
                message += mess.candidates[0].content.parts[0].text;
            });
            message = message.replace(/gemini/gi, "LiorionAi");
            message = message.replace(/google/gi, "Liorion Nguyen");
            try {
                let boxId = content.boxId;
                let boxChat;
                if (!boxId) {
                    const id = content.id;
                    const user = await this.userRepository.findOne({ where: { id }, select: ['fullName'] });
                    boxChat = await this.boxChatRepository.save({
                        name: "ChatBox Ai",
                        emotional: "👍",
                        theme: "radial-gradient(circle at center 75%, rgb(85, 208, 255) 0%, rgb(117, 151, 215) 33%, rgb(255, 159, 179) 66%, rgb(255, 159, 179) 99%)",
                        contactUser: [{
                            userId: content.id,
                            nickName: user.fullName,
                            role: "Creator"
                        }, {
                            userId: 'd6435b92-f9fe-480e-a8b6-b8cea08900ab',
                            nickName: "ChatBox Ai",
                            role: "ChatBox"
                        }]
                    })
                    boxId = boxChat.id;
                }
                
                await this.messageRepository.save({
                    userId: content.id,
                    boxId: boxId,
                    reply: content.reply || null,
                    content: content.content[content.content.length - 1].parts[0].text
                });

                const saveMessage = await this.messageRepository.save({
                    userId: 'd6435b92-f9fe-480e-a8b6-b8cea08900ab',
                    boxId: boxId,
                    reply: content.reply || null,
                    content: message
                });
                return {
                    boxId: boxId,
                    id: saveMessage.id,
                    content: message,
                    createAt: saveMessage.createdAt,
                    emoji: []
                };
            } catch (error) {
                throw new BadRequestException(`User with id ${content.id} not found`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteBox(boxId: string): Promise<any> {
        try {
            const id = boxId;
            await this.messageRepository.delete({ boxId: boxId });
            await this.boxChatRepository.delete({ id });
            return `Delete box chat ID: ${boxId} success`;
        } catch (error) {
            console.error('Lỗi khi xoá boxId:', error);
            throw error;
        }
    }
}

