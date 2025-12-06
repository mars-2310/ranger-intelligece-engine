"use client";
import React, { useEffect, useState } from "react";

import styles from "./dashboard.module.css";

export default function EmbeddingCachePanel(){
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('/api/embeddings');
        const json = await res.json();
        setStatus(json);
      }catch(e){console.error(e);}    }
    load();
  },[]);

  if (!status) return null;

  return (
    <div className={styles.panel} style={{marginTop:18}}>
      <h4 className={styles.metalText}>Embedding Cache</h4>
      <div style={{color:'#ddd',marginTop:8}}>Cached vectors: <strong className={styles.metalPlain}>{status.count}</strong></div>
      <div style={{color:'#bbb',fontSize:13}}>Last updated: {status.updatedAt}</div>
    </div>
  );
}
