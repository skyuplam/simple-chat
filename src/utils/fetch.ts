import 'whatwg-fetch';
import { includes } from './string';
import { pick } from 'lodash';
import { FetchFailure, FetchSuccess } from 'SCModels';


export async function parseResponse(response: Response) {
  const contentType = response.headers.get('Content-Type') || '';
  const includesJson = includes('json');
  const includesText = includes('text/html');
  const includesMarkdown = includes('markdown');

  if (includesJson(contentType)) {
    const json = await response.json();
    return json;
  }

  if (includesText(contentType) || includesMarkdown(contentType)) {
    const text = await response.text();
    return text;
  }

  return response;
}

async function fetchAPI(
  url: string | Request,
  options: RequestInit = {},
) {
  const { headers, ...rest } = options;
  const opts = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  const response = await fetch(url, opts);

  const meta = {
    response: pick(response, [
      'ok', 'status', 'statusText', 'url', 'redirected', 'type',
    ]),
    request: { url, opts },
  };
  const content = await parseResponse(response);
  if (response.ok) {
    const payload: FetchSuccess = { payload: content, meta };
    return payload;
  }
  const error = new Error(response.statusText);
  const err: FetchFailure = { ...error, meta, error: content };
  throw err;
}

export default fetchAPI;