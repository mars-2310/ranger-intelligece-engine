"use client";
import React, { useState } from "react";
import styles from "./dashboard.module.css";

export default function UploadPanel({ onUploaded }) {
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState(null);

  async function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    const fd = new FormData();
    fd.append('file', f);

    setStatus('uploading');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      setStatus('done');
      if (onUploaded) onUploaded(json.document || { id: json.id, title: f.name, excerpt: json.excerpt });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div className={styles.panel} style={{marginBottom:16}}>
      <h3 className={styles.metalText}>Upload & Extract</h3>
      <input type="file" onChange={handleFile} style={{width:'100%',marginTop:8}} />
      {fileName && <div style={{color:'#ddd',marginTop:8}}>{fileName} — {status || 'ready'}</div>}
    </div>
  );
}
