// API route for individual peptide operations
import { NextRequest, NextResponse } from 'next/server';
import { dbOps } from '@/lib/db';

export const runtime = 'nodejs';

// GET single peptide
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const peptide = dbOps.getById(params.id);

    if (!peptide) {
      return NextResponse.json({ error: 'Peptide not found' }, { status: 404 });
    }

    return NextResponse.json(peptide);
  } catch (error) {
    console.error('Error fetching peptide:', error);
    return NextResponse.json({ error: 'Failed to fetch peptide' }, { status: 500 });
  }
}

// PUT update peptide
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const peptide = dbOps.update(params.id, body);

    if (!peptide) {
      return NextResponse.json({ error: 'Peptide not found' }, { status: 404 });
    }

    return NextResponse.json(peptide);
  } catch (error) {
    console.error('Error updating peptide:', error);
    return NextResponse.json({ error: 'Failed to update peptide' }, { status: 500 });
  }
}

// DELETE peptide
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    dbOps.delete(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting peptide:', error);
    return NextResponse.json({ error: 'Failed to delete peptide' }, { status: 500 });
  }
}
