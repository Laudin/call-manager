import { google } from 'googleapis';
import {
  BaseExternalAccountClient,
  ExternalAccountClient,
} from 'google-auth-library';

//load credentials some how...
let creds = null;
try {
  creds = require('@/google-api-credentials');
} catch (err) {
  throw `Failed to load google-api-credentials: ${err}`;
}

export const auth = ExternalAccountClient.fromJSON(
  creds
) as BaseExternalAccountClient;

//prepare oauth2 client
// export const auth = new google.auth.OAuth2(
//   creds.client_id,
//   creds.client_secret,
//   'urn:ietf:wg:oauth:2.0:oob'
// );
console.log(auth);

// auth.setCredentials({
//   access_token: 'DUMMY',
//   expiry_date: 1,
//   refresh_token: creds.refresh_token,
//   token_type: 'Bearer',
// });
