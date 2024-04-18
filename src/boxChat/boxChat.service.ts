import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository, getConnection } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BoxChat } from "./entities/boxChat.entities";
import { v4 as uuidv4 } from 'uuid';
import { log } from "console";

@Injectable()
export class BoxChatService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(BoxChat)
        private readonly boxChatRepository: Repository<BoxChat>
    ) { }

    async getBoxChat(userId: string) {
        const datas = await this.boxChatRepository.find();
        let result = [];
        datas.map((data) => {
            let check = false;
            data.contactUser.map((item) => {
                if (userId === item.userId) {
                    check = true;
                }
            })
            if (check) {
                result.push(data);
            }
        })
        return result;
    }

    async getInformationUser(id: string) {
        return this.userRepository.findOne({ where: {id}, select: ['id', 'avatar', 'fullName']});
    }

    async getBoxIdWithUser(id1: string, id2: string): Promise<string | Error> {
        try {
            const data = await this.boxChatRepository.find();
            for (const boxChat of data) {
                const contactUserIds = boxChat.contactUser.map(user => user.userId);

                if (contactUserIds.length === 2 && contactUserIds.includes(id1) && contactUserIds.includes(id2)) {
                    return boxChat.id;
                }
            }
            return this.createBoxChat({
                "userId": [
                    id1,
                    id2
                ]
            })         
        } catch (error) {
            console.error("Error finding box chat with users:", error);
            return new Error("Internal server error");
        }
    }


    async createBoxChat(data: any): Promise<any> {
        try {
            const contactUser = data.userId;
            if (contactUser.length <= 1) {
                return new BadRequestException("Error create Box Chat: number people join not full");
            } else {
                let boxName = "";
                let informationUser = [];
                for (const id of contactUser) {
                    const user = await this.userRepository.findOne({ where: { id }, select: ['fullName'] });
                    if (user) {
                        const { fullName } = user;
                        boxName += `${fullName.split(' ').slice(1).join(' ')}, `;
                        informationUser.push({
                            userId: id,
                            nickName: fullName,
                            role: informationUser.length === 0 ? "Creator" : "Member"
                        });
                    } else {
                        console.warn("User with ID", id, "not found while creating box chat");
                    }
                }
                return this.boxChatRepository.save({
                    name: boxName,
                    emotional: "👍",
                    theme: "radial-gradient(circle at center 75%, rgb(85, 208, 255) 0%, rgb(117, 151, 215) 33%, rgb(255, 159, 179) 66%, rgb(255, 159, 179) 99%)",
                    contactUser: informationUser
                })
            }
        } catch (error) {
            console.error('Error create Box Chat boxId:', error);
            throw error;
        }
    }
}

