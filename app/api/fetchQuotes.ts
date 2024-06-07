import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Load the service account key JSON file
    const keyFile = path.join(
      process.cwd(),
      'path_to_your_service_account_key.json'
    );
    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
    const range = 'quotes!A1'; // Adjust the range as needed

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const value = response.data.values?.[0]?.[0];
    return NextResponse.json({ value });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch cell value' },
      { status: 500 }
    );
  }
}
