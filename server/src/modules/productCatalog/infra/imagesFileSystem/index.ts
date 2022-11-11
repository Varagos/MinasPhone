import { ServerFileSystem } from './serverFIleSystem';

export interface IImagesService {
  saveImageFromFormDataRequest: (field: string) => Promise<string>;
  deleteImage: (mediaFileName: string) => Promise<void>;
}

export const imagesService: IImagesService = new ServerFileSystem();
