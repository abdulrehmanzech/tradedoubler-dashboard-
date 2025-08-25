// src/app/api/vouchers/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl =
    'https://api.tradedoubler.com/1.0/products.json;page=1;pageSize=100;fid=112621?token=BDAEB50497574DD5A9655C0F38CCD44545251259';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
