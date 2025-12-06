"use client";
import React from "react";

import styles from "./dashboard.module.css";
export default function DocumentList({ documents = [], loading = false }) {
  if (loading) return <div style={{color:'#ccc',marginTop:8}}>Loading documents…</div>;
  if (!documents.length) return <div style={{color:'#aaa',marginTop:8}}>No documents found.</div>;

  return (
    <ul style={{listStyle:'none',padding:0,marginTop:8,display:'flex',flexDirection:'column',gap:8}}>
      {documents.map((doc, idx) => (
        <li key={doc.id || idx} className={styles.panel} style={{padding:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div className={styles.metalText} style={{fontWeight:700}}>{doc.title || doc.name || `Document ${idx+1}`}</div>
              <div style={{color:'#ddd',fontSize:12,marginTop:4}}>{doc.excerpt || doc.description || ''}</div>
            </div>
            <div>
              <button className={styles.metalPlain} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.06)',padding:'6px 10px',borderRadius:6}}>Open</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
