'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();
      if (json.success) {
        // Save in sessionStorage as fallback
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('admin_logged_in', 'true');
        }
        router.push('/admin');
      } else {
        setError(json.error || 'Password admin tidak valid');
      }
    } catch (err) {
      setError('Gagal menghubungkan ke server autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#52525b',
          fontSize: '0.88rem',
          fontWeight: 700,
          textDecoration: 'none',
          marginBottom: 16,
        }}
      >
        <ArrowLeft size={16} /> Kembali ke Beranda
      </Link>

      <div className={styles.card}>
        <div className="washi-tape washi-tape-top-right"></div>

        <div className={styles.avatarBadge}>
          <ShieldCheck size={28} color="#18181b" />
        </div>

        <h1 className={styles.title}>Portal Admin Rio</h1>
        <p className={styles.desc}>
          Masuk ke area manajemen untuk mengunggah tugas kuliah baru dan memantau ulasan dosen.
        </p>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="adminPassword" className={styles.label}>
              Password / Access Key Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="adminPassword"
                type="password"
                placeholder="Masukkan kode akses admin..."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`sketch-btn sketch-btn-dark ${styles.submitBtn}`}
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
