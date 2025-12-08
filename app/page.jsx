"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./landing.module.css";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // IntersectionObserver reveal for any element with the module-scoped reveal class
    const revealClass = styles.reveal;
    const revealedClass = styles.revealed;
    const els = Array.from(document.querySelectorAll('.' + revealClass));
    if (!els.length) return;

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = Number(el.dataset.revealIndex || 0);
          // stagger reveal using transitionDelay
          el.style.transitionDelay = `${idx * 120}ms`;
          el.classList.add(revealedClass);
          // ensure the video/overlay transition runs even if user didn't scroll
          setScrolled(true);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    els.forEach((el, i) => {
      el.dataset.revealIndex = String(i);
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <main className={`${styles.root} ${scrolled ? styles.scrolled : ""}`}>
      <video
        className={`${styles.bgVideo} ${scrolled ? styles.bgVideoBack : ""}`}
        src="/Ranger_Video_Generation.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className={styles.videoOverlay} />

      <div className={`${styles.hero} ${scrolled ? styles.heroRaised : ""}`}>
        <h1 className={`${styles.title} ${styles.reveal}`}>Ranger Intelligence Engine</h1>
        <p className={`${styles.lead} ${styles.reveal}`}>AI-powered document processing — summarization, semantic search, and knowledge extraction in one place.</p>

        <div className={`${styles.actions} ${styles.reveal}`}>
          <button
            className={`${styles.cta} ${scrolled ? styles.ctaVisible : ""}`}
            onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          >
            Sign in
          </button>
        </div>
      </div>
    </main>
  );
}
