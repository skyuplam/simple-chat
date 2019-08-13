import Cookies, { CookieSetOptions } from 'universal-cookie';


const defaultOptions: CookieSetOptions = {
  path: '/',
  secure: false,
  maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
};

// Cookies storage wrapper for `redux-persist`
// https://github.com/rt2zz/redux-persist#storage-engines
export function createCookiesStorage(
  cookiesHeader?: string | object | null,
  options: CookieSetOptions = defaultOptions,
) {
  const cookies = new Cookies(cookiesHeader);

  return {
    getItem: (key: string): Promise<string> => {
      // No need to parse as `redux-persist` will parse the returned value
      const item = cookies.get(key, { doNotParse: true });
      return new Promise(resolve => {
        resolve(item);
      });
    },
    setItem: (key: string, value: string): Promise<void> => {
      cookies.set(key, value, options);
      return new Promise(resolve => {
        resolve();
      });
    },
    removeItem: (key: string): Promise<void> => {
      cookies.remove(key, options);
      return new Promise(resolve => {
        resolve();
      });
    },
  };
}
