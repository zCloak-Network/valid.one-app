import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // body
  // const bodyJSON = await request.json()

  const res = await fetch(
    `https://data.mongodb-api.com/?${searchParams.toString()}`,
  );
  const data = await res.json();

  return NextResponse.json(data);
}
