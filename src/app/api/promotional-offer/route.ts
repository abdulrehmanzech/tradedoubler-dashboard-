import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl =
    'https://api.tradedoubler.com/1.0/vouchers.json?token=F02A35FB5DDE8108DC4960AFAB55A1646C73955B';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
