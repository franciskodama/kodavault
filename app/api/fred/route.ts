import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const apiKey = process.env.FRED_KEY;

  if (!apiKey) {
    console.error('Missing FRED API key');
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.stlouisfed.org/fred/releases/dates?api_key=${apiKey}&file_type=json`
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('FRED API error:', error.response?.data || error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Error fetching FRED data';

    return NextResponse.json({ message }, { status });
  }
}
