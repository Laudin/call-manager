import { google } from 'googleapis';
import path from 'path';

export const credentials = new google.auth.GoogleAuth({
  keyFile: path.resolve('app', 'google-api-credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
