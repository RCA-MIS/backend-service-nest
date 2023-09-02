import { Injectable, UploadedFile, NotFoundException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const uniqueFileName = this.generateUniqueFileName(file);
        const filePath = `uploads/${uniqueFileName}`;
    
        fs.writeFileSync(filePath, file.buffer);
    
        return uniqueFileName;
      }
    
      async deleteFile(fileName: string): Promise<void> {
        const filePath = `uploads/${fileName}`;
    
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          if (error.code === 'ENOENT') {
            // File does not exist, handle or log this case as needed
            throw new NotFoundException('File not found');
          } else {
            // Handle other errors, e.g., permission issues
            throw error;
          }
        }
      }
    
      async updateFile(
        currentFileName: string,
        newFile: Express.Multer.File,
      ): Promise<string> {
        await this.deleteFile(currentFileName); // Delete the existing file
        return this.uploadFile(newFile); // Upload the new file
      }
    
      private generateUniqueFileName(file: Express.Multer.File): string {
        const fileExt = extname(file.originalname);
        return `${uuidv4()}${fileExt}`;
      }


}