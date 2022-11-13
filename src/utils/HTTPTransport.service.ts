export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
}

type Options = {
    method: Method;
    headers?: any;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
};

function queryStringify(data: Record<string, unknown> | FormData): string {
    if (typeof data !== 'object' || data instanceof FormData) {
        throw new Error('Data must be object, not a file');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get<Response>(path = '/'): Promise<Response> {
        return this.request<Response>(this.endpoint + path);
    }

    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Post,
            data,
          });
    }

    public put<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Patch,
            data,
          });
    }

    public patch<Response = void>(path: string, options = {timeout: 5000}): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            ...options,
            method: Method.Patch,
        });
    }

    public delete<Response>(path: string,  data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path,  {
            method: Method.Delete,
            data
          });
    }

    private request<Response>(
        url: string, 
        options: Options = {method: Method.Get}): Promise<Response> {
        const {method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (method === Method.Get) {
                xhr.open(method, !data === undefined ? `${url}${queryStringify(data)}` : url);
            } else {
                xhr.open(method, url);
            }

            xhr.onreadystatechange = (e) => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({ reason: 'abort' });
            xhr.onerror = () => reject({ reason: 'network error' });
            xhr.ontimeout = () => reject({ reason: 'timeout' });

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === Method.Get || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}