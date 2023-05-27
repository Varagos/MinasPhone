import { Image } from '@modules/product-catalog/domain/value-objects/image.value-object';
export interface ICloudStorageServicePort {
  /**
   *
   * @param image the image to be uploaded
   * @returns the url of the uploaded image
   */
  uploadImage(image: Image): Promise<string>;
}
