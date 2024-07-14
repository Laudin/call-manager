import { credentials } from '@/app/service/credentialsLoad.service';
import { google, sheets_v4 } from 'googleapis';

export default async function GET() {
  const SPREADSHEET_ID = '1yRT2DecwyA_IcEsuoIgaJP4ztrB77ngeg7NPBaxeUAE';
  const RANGE_NAME = 'Sheet1!J1';

  google.options({ auth: credentials });

  const sheets: sheets_v4.Sheets = google.sheets({
    version: 'v4',
    auth: credentials,
  });

  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A:H', // RANGE_NAME,
    });
    // console.log(`${result.data.values}`);
    return { data: result.data.values };
  } catch (err) {
    return { data: err };
  }
}
