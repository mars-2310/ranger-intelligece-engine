import { NextResponse } from 'next/server';

export async function POST(req) {
  // In a real implementation you would parse multipart/form-data and extract text
  // Here we return a mocked response simulating text extraction
  const id = String(Date.now());
  return NextResponse.json({ id, document: { id, title: 'Uploaded Document', excerpt: 'Extracted text excerpt...' } });
}
