"use client";
import React from "react";
import styles from "./dashboard.module.css";

export default function Header({ onSignOut }) {
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',background:'#000',height:'var(--header-height)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <video
          src="/logo-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{width:48,height:48,borderRadius:8,objectFit:'cover',backgroundColor:'transparent'}}
        />
        <div>
          <div className={`${styles.metalText} ${styles.metalShine} ${styles.metalGlow}`} style={{fontWeight:800,fontSize:16}}>Ranger Intelligence Engine</div>
          <div className={styles.metalSubtitle} style={{marginTop:2}}>AI Document Dashboard</div>
        </div>
      </div>

      <div>
        <button onClick={onSignOut} className={styles.metalPlain} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.12)',padding:'8px 12px',borderRadius:6}}>Sign out</button>
      </div>
    </header>
  );
}
