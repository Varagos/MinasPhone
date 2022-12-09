import { join } from 'path';
import fs from 'fs';
import { IImagesService } from './index.js';

export class ServerFileSystem implements IImagesService {
  private static instance: ServerFileSystem;

  static getInstance(): ServerFileSystem {
    if (!ServerFileSystem.instance) {
      ServerFileSystem.instance = new ServerFileSystem();
    }

    return ServerFileSystem.instance;
  }

  async saveImageFromFormDataRequest(field: string): Promise<string> {
    throw new Error('Method not implemented.');
    // const { filename, mimetype, createReadStream } = await fileUpload(field);

    // const mediaFileName = `${uuidv4()}.${mimetype.split('/')[1]}`;

    // const stream = createReadStream();

    // const path = join(process.cwd(), 'uploads', mediaFileName);

    // await stream.pipe(createWriteStream(path));

    // return mediaFileName;
  }

  async deleteImage(mediaFileName: string): Promise<void> {
    const path = join(process.cwd(), 'images', mediaFileName);

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}
