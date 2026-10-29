import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, FolderGit2, Star, Calendar } from 'lucide-react';
import styles from './AssignmentsPreview.module.css';

export default function AssignmentsPreview() {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.header}>
        <div>
          <span className={styles.handwrittenLabel}>case studies &amp; assignments 📂</span>
          <h2 id="projects-heading" className={styles.title}>
            Koleksi Tugas &amp; Proyek Unggulan
          </h2>
        </div>
        <Link href="/tugas" className="sketch-btn">
          SEMUA TUGAS LMS ({'>'}) 
        </Link>
      </div>

      <div className={styles.projectsContainer}>
        {/* Project 01: Dark Folder Theme */}
        <div className={styles.folderCardDark}>
          <div className={styles.tabHeader}>
            <span className={styles.tabBadgeActive}>✦ TUGAS 01 • PAW</span>
            <span className={styles.tabBadgeInactive}>✦ SEMESTER 5</span>
          </div>

          <div className={styles.cardContentGrid}>
            <div>
              <div className={styles.metaDate}>
                <Calendar size={14} /> OKT 29, 2026
              </div>
              <h3 className={styles.projectTitle}>Portofolio LMS Platform</h3>
              <p className={styles.projectDesc}>
                Platform portofolio interaktif berbasis Learning Management System terintegrasi
                dengan Supabase PostgreSQL dan Storage untuk mengarsipkan tugas kuliah dan menerima
                review dari dosen.
              </p>
              <Link href="/tugas" className={styles.viewProjectLink}>
                VIEW PROJECT DETAILS <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className={styles.previewFrame}>
              <div className="washi-tape washi-tape-top-right"></div>
              <div className={styles.previewImageWrapper}>
                <Image
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                  alt="Tampilan kode program dan antarmuka Portofolio LMS"
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project 02: Yellow Folder Theme */}
        <div className={styles.folderCardYellow}>
          <div className={styles.tabHeaderYellow}>
            <span className={styles.tabBadgeYellowActive}>✦ TUGAS 02 • MBD</span>
            <span style={{ opacity: 0.75 }}>✦ BASIS DATA RELASIONAL</span>
          </div>

          <div className={styles.cardContentGrid}>
            <div>
              <div className={styles.metaDate} style={{ opacity: 0.9 }}>
                <Calendar size={14} /> OKT 15, 2026
              </div>
              <h3 className={styles.projectTitle} style={{ color: '#111827' }}>
                Perancangan Skema Basis Data Relasional
              </h3>
              <p className={styles.projectDesc} style={{ color: '#374151' }}>
                Normalisasi hingga 3NF, ERD kompleks, indexing performa tinggi, dan implementasi
                Row Level Security pada PostgreSQL untuk sistem transaksi akademik.
              </p>
              <Link href="/tugas" className={styles.viewProjectLink} style={{ color: '#111827' }}>
                VIEW PROJECT DETAILS <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className={styles.previewFrame} style={{ background: '#18181b' }}>
              <div className="washi-tape washi-tape-top-left washi-tape-yellow"></div>
              <div className={styles.previewImageWrapper}>
                <Image
                  src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80"
                  alt="Visualisasi skema basis data relasional dan diagram ERD"
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
