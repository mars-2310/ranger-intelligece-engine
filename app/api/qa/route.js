import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { query } = body || {};
  // Mocked answer — replace with real LLM + retrieval
  const answer = `Mocked answer for query: "${query}"`;
  return NextResponse.json({ answer });
}
