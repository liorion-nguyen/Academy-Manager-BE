import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Confirm } from './entities/confirm.etities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ConfirmService {
    private transporter: nodemailer.Transporter;

    constructor(
        @InjectRepository(Confirm)
        private readonly confirmRepository: Repository<Confirm>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.ACCOUNT_MAIL,
                pass: process.env.PASSWORD_MAIL,
            },
        });
    }

    private verificationCode: string = null;

    async generateCode(email: string): Promise<string> {
        this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const mailOptions = {
            from: process.env.ACCOUNT_MAI,
            to: email,
            subject: 'OTP Verification',
            html: `
            <html>
                <body>
                    <h1>OTP Verification</h1>
                    <p>Your OTP is: <strong>${this.verificationCode}</strong>. This code will expire in 5 minutes.</p>
                    <p style="color: red;">Hello</p>
                </body>
            </html>
            `,
        };
        await this.transporter.sendMail(mailOptions);
        return this.verificationCode;
    }

    async sendCode(user: User): Promise<Confirm> {
        const checkEmail = await this.confirmRepository.findOne({ where: [{ email: user.email }, { phone: user.phone }] })
        if (checkEmail) {
            const code = await this.generateCode(user.email);
            checkEmail.code = code;
            return this.confirmRepository.save(checkEmail);
        } else {
            const code = await this.generateCode(user.email);
            if (code) {
                return this.confirmRepository.save({
                    email: user.email,
                    phone: user.phone || null,
                    code: code
                });
            }
        }
    }
    async confirmCode(user: User, code: string): Promise<any> {
        const checkEmail = await this.confirmRepository.findOne({ where: { email: user.email, code: code } })
        if (checkEmail) {
            const givenTime = new Date(checkEmail.timeSendCode);
            const currentTimeUTC = new Date();
            const timezoneOffset = currentTimeUTC.getTimezoneOffset();
            const ICTOffset = 0;
            const currentTimeICT = new Date(currentTimeUTC.getTime() + (timezoneOffset - ICTOffset) * 60000);
            const timeDifference = currentTimeICT.getTime() - givenTime.getTime();
            const minutesDifference = timeDifference / (1000 * 60);
            if (minutesDifference > 5) {
                return {
                    message: 'Code time has expired',
                    status: false
                }
            } else {
                let existingUser = await this.userRepository.findOne({ where: [ { email: user.email }, { phone: user.phone }] });
                if (existingUser) {
                    return {
                        message: 'Email or phone number already exists',
                        status: false
                    }
                }
                const hash: any = await bcrypt.hash(user.password, 10);
                user.password = hash;
                this.userRepository.save(user);
                return {
                    message: 'Successfully registered account',
                    status: true
                }
            }
        } else {
            return {
                message: 'Invalid code',
                status: false
            }
        }
    }
}