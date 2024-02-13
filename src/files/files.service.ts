import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const allowedExtensions = ['.txt', '.jpg', '.png', '.gif'];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        throw new HttpException(
          'Unsupported file type',
          HttpStatus.BAD_REQUEST,
        );
      }

      const txtMaxSize = 100 * 1024;
      if (
        fileExtension === allowedExtensions[0] &&
        file.buffer.length > txtMaxSize
      ) {
        throw new HttpException(
          'TXT must be under 100kb',
          HttpStatus.BAD_REQUEST,
        );
      }

      const fileMaxSize = 5000 * 1024;
      if (
        fileExtension !== allowedExtensions[0] &&
        file.buffer.length > fileMaxSize
      ) {
        throw new HttpException(
          'File must be under 5mb',
          HttpStatus.BAD_REQUEST,
        );
      }

      const fileName = uuid.v4() + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException('Files error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
