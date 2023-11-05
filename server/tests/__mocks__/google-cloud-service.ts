import { Injectable } from '@nestjs/common';

// __mocks__/@services/google-cloud-storage.service.ts
@Injectable()
export class GoogleCloudStorageServiceAdapter {
  uploadImage = jest.fn().mockResolvedValue('mocked_public_url');
  deleteImage = jest.fn().mockResolvedValue(undefined);
}
