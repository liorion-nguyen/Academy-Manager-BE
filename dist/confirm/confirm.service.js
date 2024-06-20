"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nodemailer = require("nodemailer");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const confirm_etities_1 = require("./entities/confirm.etities");
const bcrypt = require("bcrypt");
let ConfirmService = class ConfirmService {
    constructor(confirmRepository, userRepository) {
        this.confirmRepository = confirmRepository;
        this.userRepository = userRepository;
        this.verificationCode = null;
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.ACCOUNT_MAIL,
                pass: process.env.PASSWORD_MAIL,
            },
        });
    }
    async generateCode(email) {
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
    async sendCode(user) {
        const checkEmail = await this.confirmRepository.findOne({ where: [{ email: user.email }, { phone: user.phone }] });
        if (checkEmail) {
            const code = await this.generateCode(user.email);
            checkEmail.code = code;
            return this.confirmRepository.save(checkEmail);
        }
        else {
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
    async confirmCode(user, code) {
        const checkEmail = await this.confirmRepository.findOne({ where: { email: user.email, code: code } });
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
                };
            }
            else {
                let existingUser = await this.userRepository.findOne({ where: [{ email: user.email }, { phone: user.phone }] });
                if (existingUser) {
                    return {
                        message: 'Email or phone number already exists',
                        status: false
                    };
                }
                const hash = await bcrypt.hash(user.password, 10);
                user.password = hash;
                this.userRepository.save(user);
                return {
                    message: 'Successfully registered account',
                    status: true
                };
            }
        }
        else {
            return {
                message: 'Invalid code',
                status: false
            };
        }
    }
};
exports.ConfirmService = ConfirmService;
exports.ConfirmService = ConfirmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(confirm_etities_1.Confirm)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConfirmService);
//# sourceMappingURL=confirm.service.js.map