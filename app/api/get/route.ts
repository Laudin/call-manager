import { Sheets } from '@/app/service/sheets.service';

import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
  try {
    const results = await Sheets.get('A2:I');

    return NextResponse.json({
      ok: true,
      data: results.data,
    });
  } catch (err) {
    return NextResponse.json({ data: err });
  }
};
