import { Sheets } from '@/app/service/sheets.service';

import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
  const json = await new Response(req.body).json();
  console.log(json);
  const { id, state } = json;

  try {
    await Sheets.update(`I${id + 1}`, state);

    return NextResponse.json({
      ok: true,
      // data: results.data,
    });
  } catch (err) {
    return NextResponse.json({ data: err });
  }
};
