'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, BookOpen, ArrowRight, FileText, Image as ImageIcon, Archive, File, Download } from 'lucide-react';
import { Assignment } from '@/lib/types';
import { COURSES } from '@/lib/constants';
import styles from './tugas.module.css';

export default function TugasPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await fetch(`/api/assignments?subject=${selectedSubject}`);
        const json = await res.json();
        if (json.success) {
          setAssignments(json.data);
        }
      } catch (err) {
        console.error('Failed to load assignments', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssignments();
  }, [selectedSubject]);

  const filtered = assignments.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase()) ||
    item.subject.toLowerCase().includes(search.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon size={14} />;
      case 'pdf': return <FileText size={14} />;
      case 'zip': return <Archive size={14} />;
      default: return <File size={14} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.handwrittenTag}>learning repository 📚</span>
        <h1 className={styles.title}>Galeri Tugas &amp; Proyek Perkuliahan</h1>
        <p className={styles.subtitle}>
          Arsip digital seluruh tugas akademik Rio Alfian (Semester 5). Dosen dan rekan mahasiswa
          dapat melihat berkas tugas secara langsung serta meninggalkan evaluasi/ulasan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={18} color="#71717a" />
          <input
            type="text"
            placeholder="Cari tugas, topik, atau kata kunci..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className={styles.categorySelect}
          aria-label="Filter berdasarkan mata kuliah"
        >
          <option value="all">Semua Mata Kuliah ({COURSES.length})</option>
          {COURSES.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Assignments Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-handwritten)', fontSize: '1.8rem' }}>
          Memuat berkas tugas... ⏳
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>Belum ada tugas yang cocok.</p>
          <p style={{ color: '#71717a', marginTop: 6 }}>Coba ubah kata kunci pencarian atau filter mata kuliah.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardBanner}>
                {item.file_type === 'image' && item.file_url ? (
                  <Image
                    src={item.file_url}
                    alt={`Pratinjau berkas ${item.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                    }}
                  >
                    📄 BERKAS {item.file_type.toUpperCase()}
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.badgeRow}>
                  <span className={styles.subjectBadge}>{item.subject}</span>
                  <span className={styles.fileTypeBadge}>
                    {getFileIcon(item.file_type)} {item.file_type}
                  </span>
                </div>

                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardDesc}>{item.description}</p>

                <div className={styles.cardFooter}>
                  <span>{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <a
                      href={`/api/download?url=${encodeURIComponent(item.file_url)}&filename=${encodeURIComponent(item.file_name)}`}
                      download={item.file_name}
                      title={`Unduh berkas ${item.file_name}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        border: '1.5px solid var(--color-border-dark)',
                        background: 'var(--accent-yellow)',
                        color: 'var(--color-ink)',
                        textDecoration: 'none',
                        boxShadow: '1.5px 1.5px 0px var(--color-border-dark)',
                      }}
                    >
                      <Download size={14} />
                    </a>
                    <Link href={`/tugas/${item.id}`} className={styles.viewBtn}>
                      Buka Berkas <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
