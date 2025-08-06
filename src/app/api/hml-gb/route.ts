// src/app/api/vouchers/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl =
    'https://api.tradedoubler.com/1.0/vouchers.json?token=42790B7081BBBC1297ED948E461B142FB5B33258';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
