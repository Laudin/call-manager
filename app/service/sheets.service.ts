import { credentials } from '@/app/service/credentialsLoad.service';
import { google, sheets_v4 } from 'googleapis';

class SheetsService {
  private sheets: sheets_v4.Sheets;

  constructor(private readonly SPREADSHEET_ID?: string) {
    // Create and auth a new google sheets client
    this.sheets = google.sheets({
      version: 'v4',
      auth: credentials,
    });

    this.SPREADSHEET_ID =
      SPREADSHEET_ID || '1yRT2DecwyA_IcEsuoIgaJP4ztrB77ngeg7NPBaxeUAE';
  }

  async get(
    range: string = 'A:H'
  ): Promise<{ ok: true; data: any[][] } | { ok: false; data: Error }> {
    try {
      const result = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.SPREADSHEET_ID,
        range,
      });
      return { ok: true, data: result.data.values as any[][] };
    } catch (err) {
      return { ok: false, data: err as Error };
    }
  }

  async update(range: string, value: string) {
    // Prepare the data to update
    const resource = {
      values: [[value]],
    };

    try {
      const result = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.SPREADSHEET_ID,
        range,
        valueInputOption: 'RAW',
        requestBody: resource,
      });
      return { ok: true, data: 'updated' };
    } catch (err) {
      console.error('The API returned an error: ' + err);
      return { ok: false, data: err };
    }
  }
}

export const Sheets = new SheetsService();
