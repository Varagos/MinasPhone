import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { apiBaseUrl } from '../config';

const apiUrl = `${apiBaseUrl}/api/v1`;
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  // get a list of records based on sort, filter, and pagination
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      const rangeHeader = headers.get('content-range');
      console.log('getList', json);
      return {
        data: json.data,
        total: rangeHeader ? parseInt(rangeHeader.split('/')?.pop()!, 10) : json.length,
      };
    });
  },
  // get a single record by id
  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      console.log('getOne', json);
      // const getOneData = Object.values(json)[0] as any;
      const getOneData = json;
      if (resource === 'products') {
        // This is how we transform the api imageUrl to the expected react-admin media object
        const { imageUrl } = getOneData;
        getOneData.media = {
          title: 'cat.png',
          src: imageUrl,
        };
      }
      return {
        data: getOneData,
      };
    }),
  // get a list of records based on an array of ids
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json.data }));
  },
  // get the records referenced to another record, e.g. comments for a post
  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json[resource],
      //   total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },
  // create a record
  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),
  // update a record based on a patch
  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: { id: params.id, ...(params.data as any) } })),

  // update a list of records based on an array of ids and a common patch
  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  // delete a record by id
  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  // delete a list of records based on an array of ids
  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }));
  },
};
export default dataProvider;
