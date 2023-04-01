import queryString from 'query-string';

const apiUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080') + '/api/v1';
/**
 *
 * @returns {string} the API base URL ending with /api/v1
 */
export const getApiUrl = () => apiUrl;

type GetListParams = {
  pagination: {
    page: number;
    perPage: number;
  };
  sort: {
    field: string;
    order: string;
  };
  filter: any;
};

type GetOneParams = {
  id: string;
};

export class DataProvider<T> {
  constructor(private resource: string) {}
  async getList(params: GetListParams): Promise<{ data: T[] }> {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${this.resource}?${queryString.stringify(query)}`;

    const response = await fetch(url);
    const data = await response.json();
    return { data };
    // return httpClient(url).then(({ headers, json }) => ({
    //   data: json,
    //   total: parseInt(headers.get('content-range').split('/').pop(), 10),
    // }));
  }

  async getOne(resource: string, params: GetOneParams): Promise<{ data: T }> {
    const response = await fetch(`${apiUrl}/${resource}/${params.id}`);
    const data = await response.json();
    return { data };

    // httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
    //   data: json,
    // })),
  }

  async getMany(params?: { ids: string[] }): Promise<{ data: T[] }> {
    const query = {
      filter: JSON.stringify({ id: params?.ids }),
    };
    const url = `${apiUrl}/${this.resource}?${queryString.stringify(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return { data };
  }

  async getManyReference(params: any): Promise<{ data: T[]; total: number }> {
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
    const url = `${apiUrl}/${this.resource}?${queryString.stringify(query)}`;

    const response = await fetch(url);
    const data = await response.json();
    const { headers } = response;
    const header = headers.get('content-range')!;
    return { data, total: parseInt(header.split('/').pop()!, 10) };
    // return httpClient(url).then(({ headers, json }) => ({
    //   data: json,
    //   total: parseInt(headers.get('content-range').split('/').pop(), 10),
    // }));
  }
}

export async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
