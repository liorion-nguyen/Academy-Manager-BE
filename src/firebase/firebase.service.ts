import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as file from "./school-management-35e3b-firebase-adminsdk-6s1cu-4a7b54de22.json"

@Injectable()
export class FirebaseService {
  
  private static isInitialized = false; // Static variable to track initialization status
  private readonly storage: admin.storage.Storage;

  constructor() {
    // Ensure that Firebase is initialized only once
    if (!FirebaseService.isInitialized) {
      const serviceAccount = require('./school-management-35e3b-firebase-adminsdk-6s1cu-4a7b54de22.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'school-management-35e3b.appspot.com',
      });
      FirebaseService.isInitialized = true; // Mark Firebase as initialized
    }

    this.storage = admin.storage();
  }

  getStorage(): admin.storage.Storage {
    return this.storage;
  }

  async UploadImage(file: Express.Multer.File):Promise<string> {
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
            expires: '03-09-2491', // Adjust the expiration date as needed
          }, (err, signedUrl) => {
            if (err) {
              reject(err);
            } else {
              resolve(signedUrl);
            }
          });
      });
      stream.end(file.buffer);
      
    });
  }

  async DeleteImage(imageUrl: string): Promise<void> {
    const storage = await this.getStorage();
    const bucket = storage.bucket();
  
    // Extract the file name from the imageUrl
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
        } else {
          resolve();
        }
      });
    });
  }
  
}
