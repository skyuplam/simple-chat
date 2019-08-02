import path from 'path';
import dotenv from 'dotenv';

// read .env.${NODE_ENV} files, parse the contents, assign it to process.env,
// and return an object containing the env vars;
export const loadEnv = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const dotenvFiles = [
    `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' ? '.env.local' : '',
    '.env',
  ].filter(Boolean);

  return dotenvFiles.map((f) =>
    dotenv.config({ path: path.resolve(process.cwd(), f) }),
  ).reduce((evs, ev) => ({ ...evs, ...ev }), {});
};
