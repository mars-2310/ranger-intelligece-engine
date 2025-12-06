import { NextResponse } from "next/server";
import { summarize } from "../../lib/ai/summarize";

export async function POST(req) {
    try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const summary = await summarize(text);
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

