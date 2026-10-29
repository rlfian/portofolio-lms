import React from 'react';
import Image from 'next/image';
import { UserCheck, Sparkles, Code2, Database, Layout, ShieldCheck } from 'lucide-react';
import { PROFILE_DATA } from '@/lib/constants';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.aboutSection} aria-labelledby="about-heading">
      <div className={styles.handwrittenLabel}>about me!</div>
      <div className={styles.whatsUpBadge}>what&apos;s up</div>

      <div className={styles.aboutGrid}>
        {/* Left Polaroid Frame: Photo of Rio Alfian */}
        <div className={styles.polaroidCol}>
          <div className="polaroid-frame" style={{ transform: 'rotate(-2deg)' }}>
            {/* Washi Tape */}
            <div className="washi-tape washi-tape-top-left"></div>
            <div className="washi-tape washi-tape-top-right"></div>

            <div
              style={{
                width: 200,
                height: 250,
                position: 'relative',
                backgroundColor: '#f4f4f5',
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Foto profil resmi Rio Alfian"
                fill
                sizes="200px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div
              style={{
                marginTop: 10,
                textAlign: 'center',
                fontFamily: 'var(--font-handwritten)',
                fontSize: '1.25rem',
                color: '#52525b',
              }}
            >
              Rio Alfian — 2026
            </div>
          </div>
        </div>

        {/* Center: Friendly Bio & Scalloped Skill Stamps */}
        <div className={styles.centerBioCol}>
          <h2 id="about-heading" className={styles.bioHeading}>
            Mengenal Rio Lebih Dekat
          </h2>

          <p className={styles.handwrittenBio}>
            Saya mahasiswa Teknik Informatika yang suka menyederhanakan hal-hal rumit menjadi
            antarmuka yang menyenangkan dan fungsional. ✨ Saya peduli pada detail kecil,
            konsistensi sistem, dan menghadirkan karya yang bermanfaat nyata bagi pengguna. 🎨
          </p>

          <div className={styles.stampGroup}>
            <div className={`stamp-badge ${styles.stampYellow}`}>
              <span>⚡</span> Frontend Architecture
            </div>
            <div className={`stamp-badge ${styles.stampGreen}`}>
              <span>🧩</span> Next.js &amp; React
            </div>
            <div className={`stamp-badge ${styles.stampPink}`}>
              <span>🎨</span> UI/UX &amp; IMK
            </div>
            <div className={`stamp-badge ${styles.stampBlue}`}>
              <span>🗄️</span> Supabase &amp; SQL
            </div>
          </div>
        </div>

        {/* Right Polaroid Frame: Workspace / Setup Desk */}
        <div className={styles.polaroidCol}>
          <div className="polaroid-frame" style={{ transform: 'rotate(2.5deg)' }}>
            <div className="washi-tape washi-tape-top-left washi-tape-yellow"></div>
            <div className="washi-tape washi-tape-top-right washi-tape-yellow"></div>

            <div
              style={{
                width: 200,
                height: 250,
                position: 'relative',
                backgroundColor: '#f4f4f5',
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                alt="Foto meja kerja dan lingkungan belajar Rio Alfian"
                fill
                sizes="200px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div
              style={{
                marginTop: 10,
                textAlign: 'center',
                fontFamily: 'var(--font-handwritten)',
                fontSize: '1.25rem',
                color: '#52525b',
              }}
            >
              my workspace 💻
            </div>
          </div>
        </div>
      </div>

      {/* Structured Biodata Box */}
      <div className={styles.biodataBox}>
        <div className={styles.biodataHeader}>
          <h3 className={styles.biodataTitle}>
            <UserCheck size={22} color="#2563eb" /> Biodata Lengkap Mahasiswa
          </h3>
          <span className="stamp-badge" style={{ background: '#dbeafe', color: '#1e40af' }}>
            TERVERIFIKASI SISTEM
          </span>
        </div>

        <div className={styles.biodataGrid}>
          <div className={styles.bioItem}>
            <span className={styles.bioItemLabel}>Nama Lengkap</span>
            <span className={styles.bioItemValue}>{PROFILE_DATA.name}</span>
          </div>

          <div className={styles.bioItem}>
            <span className={styles.bioItemLabel}>Program Studi</span>
            <span className={styles.bioItemValue}>{PROFILE_DATA.major}</span>
          </div>

          <div className={styles.bioItem}>
            <span className={styles.bioItemLabel}>Fakultas / Perguruan Tinggi</span>
            <span className={styles.bioItemValue}>
              {PROFILE_DATA.faculty}, {PROFILE_DATA.university}
            </span>
          </div>

          <div className={styles.bioItem}>
            <span className={styles.bioItemLabel}>Semester / Jenjang</span>
            <span className={styles.bioItemValue}>
              {PROFILE_DATA.semester} (Strata 1 / S-1)
            </span>
          </div>

          <div className={styles.bioItem}>
            <span className={styles.bioItemLabel}>Domisili Kampus</span>
            <span className={styles.bioItemValue}>{PROFILE_DATA.location}</span>
          </div>

          <div className={styles.bioItem}>
            <span className={styles.bioItemLabel}>Email Akademik &amp; Kontak</span>
            <span className={styles.bioItemValue}>{PROFILE_DATA.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
