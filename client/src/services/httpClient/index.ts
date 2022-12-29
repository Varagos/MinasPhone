import queryString from 'query-string';

const apiUrl = (process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8080') + '/api/v1';
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

export class DataProvider {
  constructor(private resource: string) {}
  async getList(params: GetListParams) {
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

  async getOne(resource: string, params: GetOneParams) {
    const response = await fetch(`${apiUrl}/${resource}/${params.id}`);
    const data = await response.json();
    return { data };

    // httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
    //   data: json,
    // })),
  }

  async getMany(params?: { ids: string[] }) {
    const query = {
      filter: JSON.stringify({ id: params?.ids }),
    };
    const url = `${apiUrl}/${this.resource}?${queryString.stringify(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    return { data };
  }

  async getManyReference(params: any) {
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
