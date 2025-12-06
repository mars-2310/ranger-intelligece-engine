import { NextResponse } from 'next/server';

export async function GET() {
  // Mocked documents list
  const documents = [
    { id: '1', title: 'Project Plan', excerpt: 'Plans for Q4' },
    { id: '2', title: 'Threat Assessment', excerpt: 'Anomalies detected in logs' }
  ];
  return NextResponse.json({ documents });
}
