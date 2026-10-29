'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, FileText, Star, Eye, ShieldCheck, LogOut, CheckCircle } from 'lucide-react';
import { Assignment } from '@/lib/types';
import styles from './admin.module.css';

export default function AdminDashboardPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('admin_logged_in') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }

    async function loadData() {
      try {
        const res = await fetch('/api/assignments');
        const json = await res.json();
        if (json.success) {
          setAssignments(json.data);
        }
      } catch (err) {
        console.error('Error fetching admin data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_logged_in');
    }
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Admin Rio Alfian</h1>
          <p className={styles.subtitle}>
            Kelola arsip tugas perkuliahan dan evaluasi ulasan dosen secara terpusat.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/admin/upload" className="sketch-btn">
            <PlusCircle size={16} /> Unggah Tugas Baru
          </Link>
          <button
            onClick={handleLogout}
            className="sketch-btn"
            style={{ background: '#f4f4f5', color: '#18181b' }}
          >
            <LogOut size={15} /> Keluar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fef08a' }}>
            <FileText size={22} color="#854d0e" />
          </div>
          <div>
            <div className={styles.statValue}>{assignments.length}</div>
            <div className={styles.statLabel}>Total Tugas Terunggah</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#bbf7d0' }}>
            <CheckCircle size={22} color="#166534" />
          </div>
          <div>
            <div className={styles.statValue}>6 Matkul</div>
            <div className={styles.statLabel}>Cakupan Kurikulum Sem 5</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fbcfe8' }}>
            <Star size={22} color="#9d174d" />
          </div>
          <div>
            <div className={styles.statValue}>5.0 ⭐</div>
            <div className={styles.statLabel}>Rata-rata Penilaian Dosen</div>
          </div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableHeaderTitle}>Daftar Tugas yang Tersimpan</h2>
          <span style={{ fontSize: '0.85rem', color: '#71717a' }}>
            {assignments.length} berkas aktif
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 18px', fontWeight: 800 }}>Judul Tugas</th>
                <th style={{ padding: '12px 18px', fontWeight: 800 }}>Mata Kuliah</th>
                <th style={{ padding: '12px 18px', fontWeight: 800 }}>Format</th>
                <th style={{ padding: '12px 18px', fontWeight: 800 }}>Tanggal Unggah</th>
                <th style={{ padding: '12px 18px', fontWeight: 800, textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 18px', fontWeight: 700 }}>{item.title}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span
                      style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 4,
                      }}
                    >
                      {item.subject}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    {item.file_type.toUpperCase()}
                  </td>
                  <td style={{ padding: '14px 18px', color: '#64748b' }}>
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                    <Link
                      href={`/tugas/${item.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        color: '#2563eb',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <Eye size={14} /> Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
