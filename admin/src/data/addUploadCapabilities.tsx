import { DataProvider } from 'react-admin';

// https://stackoverflow.com/questions/4083702/posting-a-file-and-associated-data-to-a-restful-webservice-preferably-as-json
// https://stackoverflow.com/questions/59267434/multi-part-form-data-in-react-admin
/**
 * As Data Providers are just objects, you can extend them with custom logic for a given method.
 *
 * For instance, the following Data Provider extends the ra-data-simple-rest provider,
 * and stores images passed to the dataProvider.update('posts') call as Base64 strings.
 * React-admin offers an <ImageInput /> component that allows image upload:
 */
const myDataProvider = (dataProvider: DataProvider): DataProvider => ({
  ...dataProvider,
  update: (resource, params) => {
    if (resource !== 'posts') {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    /**
     * For posts update only, convert uploaded image in base 64 and attach it to
     * the `picture` sent property, with `src` and `title` attributes.
     */

    // Freshly dropped pictures are File objects and must be converted to base64 strings
    const newPictures = params.data.pictures.filter((p: any) => p.rawFile instanceof File);
    const formerPictures = params.data.pictures.filter((p: any) => !(p.rawFile instanceof File));

    return Promise.all(newPictures.map(convertFileToBase64))
      .then((base64Pictures) =>
        base64Pictures.map((picture64) => ({
          src: picture64,
          title: `${params.data.title}`,
        }))
      )
      .then((transformedNewPictures) =>
        dataProvider.update(resource, {
          data: {
            ...params.data,
            pictures: [...transformedNewPictures, ...formerPictures],
          },
        } as any)
      );
  },
});

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export default myDataProvider;
