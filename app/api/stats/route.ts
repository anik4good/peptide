// API route for statistics
import { NextResponse } from 'next/server';
import { dbOps } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const stats = dbOps.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
