/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
interface CustomFileContainer {
  rawFile: File;
}

const convertFileToBase64 = (file: CustomFileContainer) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export { convertFileToBase64 };
