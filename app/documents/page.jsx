"use client";
import { useState } from "react";

export default function SummaryBox() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (!input.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to summarize");

      setSummary(data.summary);
    } catch (err) {
      setSummary("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Text Summarizer</h2>

      <textarea
        rows={6}
        value={input}
        placeholder="Paste your text here..."
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          fontSize: 14,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          borderRadius: 8,
        }}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#f5f5f5",
            borderRadius: 8,
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
