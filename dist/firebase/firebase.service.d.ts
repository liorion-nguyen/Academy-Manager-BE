/// <reference types="multer" />
import * as admin from 'firebase-admin';
export declare class FirebaseService {
    private static isInitialized;
    private readonly storage;
    constructor();
    getStorage(): admin.storage.Storage;
    UploadImage(file: Express.Multer.File): Promise<string>;
    DeleteImage(imageUrl: string): Promise<void>;
}
