"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

export default function KnowledgeGraph(){
  const [graph, setGraph] = useState({nodes:[],edges:[]});

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('/api/graph');
        const json = await res.json();
        setGraph(json);
      }catch(e){console.error(e);}
    }
    load();
  },[]);

  return (
    <div className={styles.panel}>
      <h4 className={styles.metalText}>Knowledge Graph</h4>
      <div style={{height:180,display:'flex',alignItems:'center',justifyContent:'center',color:'#999'}}>
        {/* Placeholder — render a simple summary */}
        <div>
          <div style={{color:'#ddd',marginBottom:8}}>Nodes: {graph.nodes.length} — Edges: {graph.edges.length}</div>
          <div style={{fontSize:12,color:'#bbb'}}>Graph visualization placeholder. Replace with d3/vis-network for full view.</div>
        </div>
      </div>
    </div>
  );
}
