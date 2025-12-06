import { NextResponse } from 'next/server';

export async function GET() {
  const nodes = [ { id: '1', label: 'Project Plan' }, { id: '2', label: 'Threat Report' } ];
  const edges = [ { from: '1', to: '2' } ];
  return NextResponse.json({ nodes, edges });
}
