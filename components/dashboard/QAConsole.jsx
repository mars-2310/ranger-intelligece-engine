"use client";
import React, { useState } from "react";

import styles from "./dashboard.module.css";

export default function QAConsole() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runQA() {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/qa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
      const json = await res.json();
      setAnswer(json.answer || 'No answer');
    } catch (e) {
      console.error(e);
      setAnswer('Error');
    } finally { setLoading(false); }
  }

  return (
    <div className={styles.panel}>
      <h4 className={styles.sectionTitle}>Cross-Document Q&A</h4>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask across documents"
        style={{ width: '100%', padding: 8, borderRadius: 6, background: '#111', border: '1px solid #222' }}
        className={styles.metalPlain}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button
          onClick={runQA}
          disabled={loading}
          style={{ background: '#FFD300', border: 'none', padding: '8px 12px', borderRadius: 6 }}
          className={styles.metalPlain}
        >
          Ask
        </button>
        <button onClick={() => { setQuery(''); setAnswer(null); }} className={styles.ghostBtn}>
          Clear
        </button>
      </div>
      {loading && <div style={{ color: '#ccc', marginTop: 8 }}>Thinking…</div>}
      {answer && (
        <div style={{ marginTop: 10, background: '#111', padding: 10, borderRadius: 6 }}>
          <strong className={styles.metalText}>Answer</strong>
          <p className={styles.metalPlain} style={{ marginTop: 8 }}>{answer}</p>
        </div>
      )}
    </div>
  );
}
