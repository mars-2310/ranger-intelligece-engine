"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Header from "../../components/dashboard/Header";
import SummaryPanel from "../../components/dashboard/SummaryPanel";
import SearchPanel from "../../components/dashboard/SearchPanel";
import DocumentList from "../../components/dashboard/DocumentList";
import QAConsole from "../../components/dashboard/QAConsole";
import ClassificationPanel from "../../components/dashboard/ClassificationPanel";
import AlertsPanel from "../../components/dashboard/AlertsPanel";
import KnowledgeGraph from "../../components/dashboard/KnowledgeGraph";
import EmbeddingCachePanel from "../../components/dashboard/EmbeddingCachePanel";
import OverviewPanel from "../../components/dashboard/OverviewPanel";
import styles from "../../components/dashboard/dashboard.module.css";

export default function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDocumentText, setCurrentDocumentText] = useState(null);

  // Placeholder: load document list (replace with your API)
  async function loadDocuments() {
    setLoading(true);
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        const json = await res.json();
        setDocuments(json.documents || []);
      } else {
        console.error('Failed to load documents');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.root}>
      <Header onSignOut={() => signOut({ callbackUrl: '/' })} />

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <SearchPanel onSearchResults={setDocuments} />
          <div className={styles.docsSection}>
            <h3 className={styles.sectionTitle}>Documents</h3>
            <button className={styles.ghostBtn} onClick={loadDocuments}>
              Refresh
            </button>
            <DocumentList documents={documents} loading={loading} />
          </div>
          <ClassificationPanel documentText={currentDocumentText} />
          <AlertsPanel />
        </aside>

        <section className={styles.content}>
          <h2 className={styles.pageTitle}>AI Document Processor</h2>
          <p className={styles.lead}>Summarize, search semantically, and explore your documents.</p>

          <OverviewPanel documents={documents} />
          <SummaryPanel onDocumentUpload={setCurrentDocumentText} />

          <div style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <QAConsole />
            <KnowledgeGraph />
          </div>

          <EmbeddingCachePanel />
        </section>
      </main>
    </div>
  );
}