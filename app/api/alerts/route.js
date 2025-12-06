import { NextResponse } from 'next/server';

export async function GET() {
  const alerts = [
    { title: 'Suspicious login pattern', level: 'high', detail: 'Multiple failed logins from 3 countries.' },
    { title: 'Unusual upload activity', level: 'medium', detail: 'Large number of files uploaded in short time.' }
  ];
  return NextResponse.json({ alerts });
}
