import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository, getConnection } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./entities/message.entities";
import { ReturnMessage } from "./entities/returnMess.entities";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) { }

    async getChat(boxId: string) {
        return this.messageRepository.find({ where: { boxId }, select: ['id', 'mode', 'content', 'createdAt', 'updatedAt'] });
    }

    async getBoxChat(userId: string): Promise<string[]> {
        const query = `
        SELECT DISTINCT "boxId" FROM "message" WHERE "userId" = $1
    `;
        const result = await this.messageRepository.query(query, [userId]);

        const uniqueBoxIds = result.map((row: any) => row.boxId);

        return uniqueBoxIds;
    }

    async sendChat(content: ReturnMessage): Promise<any> {
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
                await this.userRepository.findOne({ where: { id: content.id } })
                const boxId = content.boxId || uuidv4();
                this.messageRepository.save({
                    userId: content.id,
                    boxId: boxId,
                    mode: false,
                    content: content.content[content.content.length - 1].parts[0].text
                });
                
                const saveMessage = await this.messageRepository.save({
                    userId: content.id,
                    boxId: boxId,
                    mode: true,
                    content: message
                });
                return {
                    content: message,
                    id: saveMessage.id,
                    createAt: saveMessage.createdAt,
                    creator: false,
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
            await this.messageRepository.delete({ boxId: boxId });
            return `Delete box chat ID: ${boxId} success`;
        } catch (error) {
            console.error('Lỗi khi xoá boxId:', error);
            throw error;
        }
    }
}

