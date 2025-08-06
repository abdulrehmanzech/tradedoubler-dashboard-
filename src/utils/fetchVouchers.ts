// utils/fetchVouchers.ts
export const fetchVouchers = async () => {
  const res = await fetch(
    'https://api.tradedoubler.com/1.0/vouchers.json?token=76157B40E634330DEDC74EE2762940B0366CC33E',
    { next: { revalidate: 60 } } // ISR (optional)
  );

  if (!res.ok) throw new Error('Failed to fetch vouchers');
  const data = await res.json();
  return data;
};
