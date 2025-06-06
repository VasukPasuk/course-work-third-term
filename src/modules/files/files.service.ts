import { InternalServerErrorException, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'node:path';
import * as fs from 'node:fs';

export enum DestinationEnum {
  PRODUCTS = 'products',
  AVATARS = 'avatars',
}

@Injectable()
export class FilesService {
  constructor() {}
  upload(
    file: Express.Multer.File,
    destination: DestinationEnum,
    basename: string,
  ): [string, DestinationEnum] {
    try {
      const [fileName, fileExtension] = file.originalname.split('.');

      const newFileName = uuid.v4() + '_' + fileName + '.' + fileExtension;

      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'static',
        `${destination}`,
      );

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, newFileName), file.buffer);
      return [newFileName, destination];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(fileName: string) {
    const filePath = path.join(__dirname, '..', '..', 'static', fileName);
    return fs.unlink(filePath, (e) => {
      if (e) throw new InternalServerErrorException(e.message);
    });
  }
}
