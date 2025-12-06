"use client";
import React, { useEffect, useState } from "react";

export default function AlertsPanel(){
  const [alerts, setAlerts] = useState([]);

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('/api/alerts');
        const json = await res.json();
        setAlerts(json.alerts || []);
      }catch(e){console.error(e);}    }
    load();
  },[]);

  return (
    <div style={{marginTop:18,background:'rgba(15,15,15,0.65)',backdropFilter:'blur(10px)',padding:12,borderRadius:8,border:'1px solid rgba(255,211,0,0.08)'}}>
      <h4 style={{color:'#FFD300'}}>Threat & Anomaly Alerts</h4>
      <ul style={{listStyle:'none',padding:0,marginTop:8}}>
        {alerts.length===0 && <li style={{color:'#aaa'}}>No alerts</li>}
        {alerts.map((a,i)=> (
          <li key={i} style={{background:'#0f0f0f',padding:8,borderRadius:6,border:'1px solid #222',marginBottom:8}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{color:'#FFD300',fontWeight:700}}>{a.title}</div>
              <div style={{fontSize:12,color:'#ccc'}}>{a.level}</div>
            </div>
            <div style={{color:'#ddd',fontSize:13,marginTop:6}}>{a.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
