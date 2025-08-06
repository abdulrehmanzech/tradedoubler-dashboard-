// src/app/api/vouchers/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl =
    'https://api.tradedoubler.com/1.0/vouchers.json?token=76157B40E634330DEDC74EE2762940B0366CC33E';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
