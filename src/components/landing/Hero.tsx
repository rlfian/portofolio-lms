import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, BookOpen, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '@/lib/constants';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-labelledby="main-heading">
      {/* Top sticker pills row */}
      <div className={styles.topPillsRow}>
        <span className={styles.pillMint}>MADE WITH PASSION</span>
        <span className={styles.handwrittenIntro}>my name is</span>
        <span className={styles.pillYellow}>SWEAT THE DETAILS</span>
      </div>

      {/* Main Name Box with retro block display */}
      <div className={styles.nameBoxWrapper}>
        {/* Floating Avatar Left */}
        <div className={styles.floatingAvatarLeft} aria-hidden="true">
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fed7aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#9a3412',
            }}
          >
            👨‍💻
          </div>
        </div>

        {/* Floating Avatar Right */}
        <div className={styles.floatingAvatarRight} aria-hidden="true">
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#bbf7d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#166534',
            }}
          >
            🎓
          </div>
        </div>

        <div className={styles.nameBox}>
          <h1 id="main-heading" className={styles.nameTitle}>
            {PROFILE_DATA.name.toUpperCase()}
          </h1>
        </div>

        {/* Bottom tags */}
        <div className={styles.bottomPillsRow}>
          <span className={styles.tagRole}>Teknik Informatika ↗</span>
          <span className={styles.tagStatus}>
            <span className={styles.statusDot}></span>
            {PROFILE_DATA.status} • {PROFILE_DATA.semester}
          </span>
          <span className={styles.tagLocation}>Bandung, ID ↗</span>
        </div>
      </div>

      {/* Main Headline */}
      <p className={styles.headline}>
        Saya merancang dan membangun aplikasi web yang{' '}
        <span className={styles.emojiIcon} role="img" aria-label="target">🎯</span>
        mudah digunakan, terstruktur, &amp; solutif.{' '}
        <span className={styles.emojiIcon} role="img" aria-label="flower">🌸</span>
      </p>

      {/* CTA Buttons */}
      <div className={styles.ctaGroup}>
        <a href="#about" className="sketch-btn sketch-btn-dark">
          <Sparkles size={16} /> KENALI SAYA
        </a>
        <Link href="/tugas" className="sketch-btn">
          <BookOpen size={16} /> LIHAT TUGAS LMS ↗
        </Link>
      </div>

      {/* Handcrafted curve line */}
      <div className={styles.curveDivider} aria-hidden="true"></div>
    </section>
  );
}
