import { DataProvider, fetchUtils } from 'react-admin';

// const apiUrl = 'https://my.api.com/';
const apiUrl = 'http://localhost:8080/api/v1';
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
  update: (resource, params) => {
    if (resource !== 'products') {
      // fallback to the default implementation
      return dataProvider.update(resource, params);
    }

    console.log('media', params.data.media);
    const isNewFile = params.data.media && params.data.media.rawFile instanceof File;
    let formData = new FormData();
    const { media, mediaFileName, ...rest } = params.data;

    const stringifiedBody = JSON.stringify(rest);
    if (isNewFile) {
      formData.append('image', params.data.media.rawFile);
    }
    formData.append('data', stringifiedBody);

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: formData,
    }).then(({ json }) => ({ data: json }));
  },
});

export default myDataProvider;
