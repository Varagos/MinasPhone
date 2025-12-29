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
    console.log(`getList: ${resource}`, url);

    return httpClient(url).then(({ headers, json }) => {
      const rangeHeader = headers.get('content-range');
      console.log('getList', json);
      let total = rangeHeader ? parseInt(rangeHeader.split('/')?.pop()!, 10) : json.length;
      if (total === undefined) {
        // My backend returns a count
        total = json.count;
      }
      console.log({ total });
      return {
        data: json.data,
        total,
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

        // Transform attributeValues from backend DTO format to simple form format
        if (getOneData.attributeValues) {
          const simpleAttributeValues: Record<string, any> = {};

          Object.entries(getOneData.attributeValues).forEach(([attributeId, values]: [string, any]) => {
            if (!Array.isArray(values) || values.length === 0) {
              return;
            }

            // Handle multiselect (multiple values)
            if (values.length > 1) {
              simpleAttributeValues[attributeId] = values.map((v: any) => v.valueId).filter(Boolean);
              return;
            }

            // Single value - extract the actual value
            const value = values[0];
            if (value.valueId) {
              simpleAttributeValues[attributeId] = value.valueId;
            } else if (value.textValue !== null) {
              simpleAttributeValues[attributeId] = value.textValue;
            } else if (value.numericValue !== null) {
              simpleAttributeValues[attributeId] = value.numericValue;
            } else if (value.booleanValue !== null) {
              simpleAttributeValues[attributeId] = value.booleanValue;
            }
          });

          console.log('📥 DataProvider - Original attributeValues:', getOneData.attributeValues);
          console.log('📥 DataProvider - Simplified attributeValues:', simpleAttributeValues);

          getOneData.attributeValues = simpleAttributeValues;
        }
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
  create: (resource, params) => {
    console.log({ data: params.data });
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },
  // update a record based on a patch
  update: (resource, params) => {
    console.log('update', {
      url: `${apiUrl}/${resource}/${params.id}`,
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: { id: params.id, ...(params.data as any) } }));
  },

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
  deleteMany: async (resource, params) => {
    // const query = {
    //   filter: JSON.stringify({ id: params.ids }),
    // };
    // return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
    //   method: 'DELETE',
    // }).then(({ json }) => ({ data: json }));
    // Call delete for each id
    const promises = params.ids.map((id) =>
      httpClient(`${apiUrl}/${resource}/${id}`, {
        method: 'DELETE',
      })
    );
    const responses = await Promise.all(promises);
    console.log('DeteleMany responses', responses);
    return {
      data: params.ids,
    };
  },
};
export default dataProvider;
