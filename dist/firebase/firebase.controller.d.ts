/// <reference types="multer" />
import { FirebaseService } from './firebase.service';
export declare class FirebaseController {
    private readonly filebaseService;
    constructor(filebaseService: FirebaseService);
    uploadFile(file: Express.Multer.File): Promise<{
        imageUrl: string;
    }>;
    deleteImage(imageUrl: string): Promise<{
        message: string;
    }>;
}
