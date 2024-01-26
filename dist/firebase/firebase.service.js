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
var FirebaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let FirebaseService = FirebaseService_1 = class FirebaseService {
    constructor() {
        if (!FirebaseService_1.isInitialized) {
            const serviceAccount = require('./school-management-35e3b-firebase-adminsdk-6s1cu-4a7b54de22.json');
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: 'school-management-35e3b.appspot.com',
            });
            FirebaseService_1.isInitialized = true;
        }
        this.storage = admin.storage();
    }
    getStorage() {
        return this.storage;
    }
    async UploadImage(file) {
        console.log(file);
        const storage = await this.getStorage();
        const bucket = storage.bucket();
        const filename = `${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(filename);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        return new Promise((resolve, reject) => {
            stream.on('error', (error) => {
                reject(error);
            });
            stream.on('finish', () => {
                fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491',
                }, (err, signedUrl) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(signedUrl);
                    }
                });
            });
            stream.end(file.buffer);
        });
    }
    async DeleteImage(imageUrl) {
        const storage = await this.getStorage();
        const bucket = storage.bucket();
        const fileName = imageUrl.split('/').pop().split("?").shift();
        if (!fileName) {
            throw new Error('Invalid imageUrl format');
        }
        const file = bucket.file(fileName);
        const [exists] = await file.exists();
        if (!exists) {
            throw new Error('File does not exist');
        }
        return new Promise((resolve, reject) => {
            file.delete((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
};
exports.FirebaseService = FirebaseService;
FirebaseService.isInitialized = false;
exports.FirebaseService = FirebaseService = FirebaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseService);
//# sourceMappingURL=firebase.service.js.map