"use client";
import React, { useEffect, useState } from "react";

import styles from "./dashboard.module.css";

export default function OverviewPanel({ documents=[] }){
  const [stats,setStats] = useState({docs: documents.length,alerts:0,embeddings:0});

  useEffect(()=>{
    async function load(){
      try{
        const [docsRes,alertsRes,embRes] = await Promise.all([
          fetch('/api/documents'),
          fetch('/api/alerts'),
          fetch('/api/embeddings')
        ]);
        const docs = await docsRes.json();
        const alerts = await alertsRes.json();
        const emb = await embRes.json();
        setStats({docs: (docs.documents||[]).length, alerts: (alerts.alerts||[]).length, embeddings: emb.count||0});
      }catch(e){console.error(e);}    }
    load();
  },[]);

  return (
    <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
      <div className={styles.panel}>
        <div className={styles.metalText} style={{fontWeight:700}}>Documents</div>
        <div className={styles.metalPlain} style={{fontSize:20}}>{stats.docs}</div>
      </div>
      <div className={styles.panel}>
        <div className={styles.metalText} style={{fontWeight:700}}>Alerts</div>
        <div className={styles.metalPlain} style={{fontSize:20}}>{stats.alerts}</div>
      </div>
      <div className={styles.panel}>
        <div className={styles.metalText} style={{fontWeight:700}}>Embeddings</div>
        <div className={styles.metalPlain} style={{fontSize:20}}>{stats.embeddings}</div>
      </div>
    </div>
  );
}
