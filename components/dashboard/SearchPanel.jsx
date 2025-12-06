"use client";
import React, { useState } from "react";
import styles from "./dashboard.module.css";

export default function SearchPanel({ onSearchResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/semantic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const json = await res.json();
      if (onSearchResults) onSearchResults(json.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.panel} style={{marginBottom:18,padding:16}}>
      <h3 className={styles.metalText} style={{fontSize:16,marginBottom:12}}>Semantic Search</h3>
        <div style={{display:'flex',gap:10,marginTop:10,alignItems:'center'}}>
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search across documents" style={{flex:1,minWidth:0,padding:10,borderRadius:6,background:'#111',border:'1px solid #222',fontSize:13}} className={styles.metalPlain} />
          <button onClick={handleSearch} disabled={loading} style={{background:'#FFD300',border:'none',padding:'8px 10px',borderRadius:6,fontWeight:700,fontSize:12,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flex:'0 0 auto'}} className={styles.metalPlain}>Search</button>
        </div>
      {loading && <div style={{color:'#ccc',marginTop:8}}>Searching…</div>}
    </div>
  );
}
