import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const text = body.text || '';
  // Very simple mock classifier
  const labels = [];
  if (text.toLowerCase().includes('threat')) labels.push('security');
  if (text.toLowerCase().includes('plan')) labels.push('planning');
  if (!labels.length) labels.push('uncategorized');
  return NextResponse.json({ labels });
}
