/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from 'typesafe-actions';


declare global {
  interface Window {
    __PRELOADED_STATE__: RootState;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }

  // https://github.com/parcel-bundler/parcel/issues/1063
  // interface NodeModule {
  //   hot: {
  //     accept(path?: string, fn: () => void, callback?: () => void): void;
  //   };
  // }
}
