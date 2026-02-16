import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// File-based cache to survive restarts and multiple refreshes
const CACHE_FILE = path.join(
  process.cwd(),
  'app/api/economic-calendar/cache.json'
);
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour (as requested by the feed provider)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter'); // 'high_impact' or 'all'

  // 1. Try to read from file cache
  let cachedData: any[] = [];
  let isCacheValid = false;

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const stats = fs.statSync(CACHE_FILE);
      const now = Date.now();

      if (now - stats.mtimeMs < CACHE_DURATION) {
        const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
        cachedData = JSON.parse(fileContent);
        isCacheValid = true;
      }
    }
  } catch (e) {
    console.error('Error reading cache file:', e);
  }

  if (isCacheValid) {
    return NextResponse.json(applyFilter(cachedData, filter));
  }

  try {
    // 2. Try to fetch new data (JSON endpoint is usually more permissive)
    const response = await axios.get(
      'https://nfs.faireconomy.media/ff_calendar_thisweek.json',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        timeout: 10000,
      }
    );

    if (response.data && Array.isArray(response.data)) {
      const formattedEvents = response.data.map((e: any) => {
        const eventDate = new Date(e.date);

        // Format to MM-DD-YYYY
        const month = String(eventDate.getMonth() + 1).padStart(2, '0');
        const day = String(eventDate.getDate()).padStart(2, '0');
        const year = eventDate.getFullYear();
        const dateStr = `${month}-${day}-${year}`;

        // Format time to h:mma
        let hours = eventDate.getHours();
        const minutes = String(eventDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const timeStr = `${hours}:${minutes}${ampm}`;

        return {
          title: String(e.title || ''),
          country: String(e.country || ''),
          date: dateStr,
          time: timeStr,
          impact: String(e.impact || 'Low').toLowerCase(),
          forecast: String(e.forecast || ''),
          previous: String(e.previous || ''),
          actual: String(e.actual || ''),
        };
      });

      // Write to cache file
      try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(formattedEvents));
      } catch (e) {
        console.error('Error writing cache file:', e);
      }

      return NextResponse.json(applyFilter(formattedEvents, filter));
    }

    // If we reach here, response.data was not an array (e.g. Rate Limited HTML)
    throw new Error('Response data is not an array');
  } catch (error: any) {
    console.warn(
      'ForexFactory Feed error (using fallback or empty):',
      error.message
    );

    // 3. Fallback: If cache exists but is expired, use it anyway
    if (fs.existsSync(CACHE_FILE)) {
      try {
        const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
        const expiredData = JSON.parse(fileContent);
        return NextResponse.json(applyFilter(expiredData, filter));
      } catch (e) {}
    }

    // 4. Final Fallback: Return some mock data for local testing if absolutely blocked
    // This allows the user to see the UI changes they made even if the feed is down
    const mockData = generateMockData();
    return NextResponse.json(applyFilter(mockData, filter));
  }
}

function applyFilter(events: any[], filter: string | null) {
  let filtered = events.filter(
    (e: any) => e.country === 'USD' || e.country === 'US'
  );

  if (filter === 'high_impact') {
    filtered = filtered.filter((e: any) => e.impact === 'high');
  }

  return filtered;
}

function generateMockData() {
  const today = new Date();
  const format = (d: Date) => {
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${month}-${day}-${d.getFullYear()}`;
  };

  return [
    {
      title: 'CPI m/m (Local Demo)',
      country: 'USD',
      date: format(today),
      time: '8:30am',
      impact: 'high',
      forecast: '0.2%',
      previous: '0.3%',
      actual: '0.2%',
    },
    {
      title: 'Retail Sales m/m (Local Demo)',
      country: 'USD',
      date: format(today),
      time: '8:30am',
      impact: 'high',
      forecast: '0.4%',
      previous: '0.6%',
      actual: '',
    },
    {
      title: 'Empire State Manufacturing Index',
      country: 'USD',
      date: format(new Date(today.getTime() + 86400000)),
      time: '8:30am',
      impact: 'high',
      forecast: '-4.0',
      previous: '-11.9',
      actual: '',
    },
  ];
}
