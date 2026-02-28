// API route for peptides
import { NextRequest, NextResponse } from 'next/server';
import { dbOps } from '@/lib/db';

export const runtime = 'nodejs';

// GET all peptides or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let peptides;

    if (search) {
      peptides = dbOps.search(search);
    } else if (category && category !== 'All') {
      peptides = dbOps.getByCategory(category);
    } else {
      peptides = dbOps.getAll();
    }

    return NextResponse.json(peptides);
  } catch (error) {
    console.error('Error fetching peptides:', error);
    return NextResponse.json({ error: 'Failed to fetch peptides' }, { status: 500 });
  }
}

// POST create new peptide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.cat) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    const peptide = dbOps.create({
      name: body.name,
      alias: body.alias || '',
      cat: body.cat,
      mw: body.mw || 0,
      mech: body.mech || '',
      desc: body.desc || '',
      dose: body.dose || '',
      freq: body.freq || '',
      route: body.route || '',
      cycle: body.cycle || '',
      hl: body.hl || '',
      recon: body.recon || '',
      sides: body.sides || '',
      cancer: body.cancer || '',
      safety: body.safety || 5,
      status: body.status || 'Research',
      smiles: body.smiles || ''
    });

    return NextResponse.json(peptide, { status: 201 });
  } catch (error) {
    console.error('Error creating peptide:', error);
    return NextResponse.json({ error: 'Failed to create peptide' }, { status: 500 });
  }
}
