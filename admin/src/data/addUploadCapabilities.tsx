import { DataProvider, fetchUtils } from 'react-admin';
import { nanoid } from 'nanoid';
import { apiBaseUrl } from '../config';

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
const myDataProvider = (dataProvider: DataProvider): DataProvider => ({
  ...dataProvider,

  create: (resource, params) => {
    if (resource !== 'products') {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }

    const slug = `prod_${nanoid(10)}`; //=> "V1StGXR8_Z5jdHi6B-myT"
    const formData = buildFormData(params.data, { slug });
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: formData,
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },

  update: (resource, params) => {
    if (resource !== 'products') {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    const formData = buildFormData(params.data);

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: formData,
    }).then(({ json }) => ({ data: { ...(params.data as any), id: params.id } }));
  },
});

const buildFormData = (data: any, additionalData?: { [key: string]: any }): FormData => {
  // console.log('media', params.data.media);
  const isNewFile = data.media && data.media.rawFile instanceof File;
  let formData = new FormData();
  const { media, mediaFileName, ...rest } = data;

  if (additionalData) {
    Object.keys(additionalData).forEach((key) => {
      rest[key] = additionalData[key];
    });
  }
  const stringifiedBody = JSON.stringify(rest);
  if (isNewFile) {
    formData.append('image', data.media.rawFile);
  }
  formData.append('data', stringifiedBody);
  return formData;
};

export default myDataProvider;
