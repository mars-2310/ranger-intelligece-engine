import { NextResponse } from 'next/server';

export async function GET(){
  const status = { count: 1234, updatedAt: new Date().toISOString() };
  return NextResponse.json(status);
}
