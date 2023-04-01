export const makeHttpRequest = async (
  url: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  data?: any,
  responseContentType?: 'text' | 'json'
) => {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const contentType = response.headers.get('Content-Type'); // -> "text/html; charset=utf-8"
  if (responseContentType === 'text' || (contentType && /text\/html/i.test(contentType))) {
    const text = await response.text();
    return text;
  }

  const jsonData = await response.json();
  return jsonData;
};
