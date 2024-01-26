import { Body, Controller, Delete, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('firebase')
export class FirebaseController {

    constructor(private readonly filebaseService: FirebaseService){
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File){
        const imageUrl = await this.filebaseService.UploadImage(file);
        return {imageUrl}
    }

    @Delete('delete')
  async deleteImage(@Body('imageUrl') imageUrl: string) {
    // try {
      await this.filebaseService.DeleteImage(imageUrl);
      return { message: 'Image deleted successfully' };
    // } catch (error) {
    //   return { error: 'Failed to delete image' };
    // }
  }
}
