// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { config } from 'config';

export const environment = {
  production: config.production,
  AUTH_URL: config.AUTH_URL,
  GRANT_TYPE: config.GRANT_TYPE,
  CLIENT_SECRET: config.CLIENT_SECRET,
  CLIENT_ID: config.CLIENT_ID,
  API_CEP: config.API_CEP
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
