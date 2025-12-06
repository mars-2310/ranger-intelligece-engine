"use client";
import React, { useState } from "react";
import styles from "./dashboard.module.css";

export default function SummaryPanel({ onDocumentUpload }) {
  const [fileName, setFileName] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setLoading(true);
    try {
      const text = await file.text();
      if (onDocumentUpload) onDocumentUpload(text);
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const json = await res.json();
      setSummary(json.summary || 'No summary returned');
    } catch (e) {
      console.error(e);
      setSummary('Error generating summary');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.panel} style={{marginTop:18,padding:18}}>
      <h3 className={styles.metalText}>Summarization</h3>
      <div style={{marginTop:8,padding:20,borderRadius:6,background:'#111',border:'2px dashed #FFD300',textAlign:'center',cursor:'pointer'}}>
        <input 
          type="file" 
          onChange={handleFileUpload} 
          accept=".txt,.pdf,.doc,.docx"
          style={{display:'none'}}
          id="summaryFileInput"
        />
        <label htmlFor="summaryFileInput" style={{cursor:'pointer',color:'#ddd'}}>
          {fileName ? `📄 ${fileName}` : '📁 Click to upload file or drag & drop'}
        </label>
      </div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button onClick={()=>{setFileName('');setSummary(null);}} className={styles.ghostBtn}>Clear</button>
      </div>

      {loading && <div style={{color:'#ccc',marginTop:10}}>Generating summary...</div>}
      {summary && (
        <div style={{marginTop:12,background:'#111',padding:12,borderRadius:6,border:'1px solid #222'}}>
          <strong className={styles.metalText}>Summary</strong>
          <p className={styles.metalPlain} style={{marginTop:8,whiteSpace:'pre-wrap'}}>{summary}</p>
        </div>
      )}
    </div>
  );
}
