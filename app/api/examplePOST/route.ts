import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const bodyJSON = await request.json();

  const res = await fetch(`https://data.mongodb-api.com/`, {
    body: bodyJSON,
  });
  const data = await res.json();

  return NextResponse.json(data);
}
