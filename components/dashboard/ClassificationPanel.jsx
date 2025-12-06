"use client";
import React, { useState, useEffect } from "react";

import styles from "./dashboard.module.css";

export default function ClassificationPanel({ documentText }) {
  const [labels, setLabels] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (documentText) {
      classifyDocument(documentText);
    } else {
      setLabels(null);
    }
  }, [documentText]);

  async function classifyDocument(text) {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch('/api/classify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
      const json = await res.json();
      setLabels(json.labels || []);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  return (
    <div className={styles.panel} style={{marginTop:12}}>
      <h4 className={styles.metalText}>Auto Classification</h4>
      <div style={{marginTop:8,padding:12,background:'#111',borderRadius:6,border:'1px solid #222',minHeight:40,display:'flex',alignItems:'center'}}>
        {loading && <span style={{color:'#ccc'}}>Classifying...</span>}
        {!loading && !labels && <span style={{color:'#888'}}>No document uploaded</span>}
        {!loading && labels && (
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {labels.map((l,i)=>(<span key={i} style={{display:'inline-block',background:'#222',padding:'6px 8px',borderRadius:6}} className={styles.metalPlain}>{l}</span>))}
          </div>
        )}
      </div>
    </div>
  );
}
