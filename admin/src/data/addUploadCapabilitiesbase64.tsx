import { DataProvider, fetchUtils } from 'react-admin';
import { nanoid } from 'nanoid';
import { apiBaseUrl } from '../config';
import { convertFileToBase64 } from './fileToBase64';

const apiUrl = `${apiBaseUrl}/api/v1`;
const httpClient = fetchUtils.fetchJson;
// https://stackoverflow.com/questions/4083702/posting-a-file-and-associated-data-to-a-restful-webservice-preferably-as-json
// https://stackoverflow.com/questions/59267434/multi-part-form-data-in-react-admin
/**
 * As Data Providers are just objects, you can extend them with custom logic for a given method.
 *
 * For instance, the following Data Provider extends the ra-data-simple-rest provider,
 * and stores images passed to the dataProvider.update('posts') call as Base64 strings.
 * React-admin offers an <ImageInput /> component that allows image upload:
 */
const myDataProviderWithBase64Image = (dataProvider: DataProvider): DataProvider => ({
  ...dataProvider,

  create: async (resource, params) => {
    if (resource !== 'products') {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    const slug = `prod_${nanoid(10)}`; //=> "V1StGXR8_Z5jdHi6B-myT"
    /**
     * For posts update only, convert uploaded image in base 64 and attach it to
     * the `picture` sent property, with `src` and `title` attributes.
     */

    const base64Image = await convertFileToBase64(params.data.media);
    // return dataProvider.create(resource, {
    //   ...params,
    //   data: {
    //     ...params.data,
    //     slug,
    //     image: base64Image,
    //   },
    // });
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify({
        ...params.data,
        slug,
        image: base64Image,
      }),
    })
      .then(({ json }) => ({
        data: { ...params.data, id: json.id, media: { src: params.data.imageUrl } },
      }))
      .catch((error) => {
        console.log('what the hell');
        console.log(error);
        throw error;
      });
  },
  update: async (resource, params) => {
    if (resource !== 'products') {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    const jsonBody = await buildJsonBody(params.data);

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: jsonBody,
    }).then(({ json }) => ({ data: { ...(params.data as any), id: params.id } }));
  },
});

const buildJsonBody = async (data: any, additionalData?: Record<string, any>): Promise<any> => {
  // console.log('media', params.data.media);
  const { media, mediaFileName, ...rest } = data;

  if (additionalData) {
    for (const [key, value] of Object.entries(additionalData)) {
      rest[key] = value;
    }
  }
  const isNewFile = data.media && data.media.rawFile instanceof File;
  if (isNewFile) {
    rest.image = await convertFileToBase64(data.media);
  }
  return rest;
};

export default myDataProviderWithBase64Image;
