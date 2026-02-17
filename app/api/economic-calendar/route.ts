import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use /tmp for caching to avoid permission issues in production and restart loops in dev
const CACHE_FILE = path.join('/tmp', 'trezo-economic-cache.json');
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  // 1. Try to read from cache
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const stats = fs.statSync(CACHE_FILE);
      const now = Date.now();

      if (now - stats.mtimeMs < CACHE_DURATION) {
        const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
        const cachedData = JSON.parse(fileContent);
        return NextResponse.json(applyFilter(cachedData, filter));
      }
    }
  } catch (e) {
    console.error('Error reading cache:', e);
  }

  try {
    // 2. Fetch fresh data
    const response = await fetch(
      'https://nfs.faireconomy.media/ff_calendar_thisweek.json',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        next: { revalidate: 3600 }, // Also use Next.js built-in fetch cache
      }
    );

    if (!response.ok) throw new Error(`Feed responded with ${response.status}`);

    const rawData = await response.json();

    if (rawData && Array.isArray(rawData)) {
      const formattedEvents = rawData.map((e: any) => {
        const eventDate = new Date(e.date);
        const month = String(eventDate.getMonth() + 1).padStart(2, '0');
        const day = String(eventDate.getDate()).padStart(2, '0');
        const year = eventDate.getFullYear();
        const dateStr = `${month}-${day}-${year}`;

        let hours = eventDate.getHours();
        const minutes = String(eventDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;
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

      // Write to cache
      try {
        fs.writeFileSync(CACHE_FILE, JSON.stringify(formattedEvents));
      } catch (e) {
        console.error('Error writing cache:', e);
      }

      return NextResponse.json(applyFilter(formattedEvents, filter));
    }

    throw new Error('Response data is not an array');
  } catch (error: any) {
    console.warn('ForexFactory Feed error:', error.message);

    // Fallback to existing cache even if expired
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const fileContent = fs.readFileSync(CACHE_FILE, 'utf-8');
        const expiredData = JSON.parse(fileContent);
        return NextResponse.json(applyFilter(expiredData, filter));
      }
    } catch (e) {}

    // Final fallback to mock data
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
  ];
}
