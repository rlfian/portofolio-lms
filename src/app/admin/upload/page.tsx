'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UploadCloud, CheckCircle2, File, AlertCircle } from 'lucide-react';
import { COURSES } from '@/lib/constants';
import styles from './upload.module.css';

export default function UploadAssignmentPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(COURSES[0].name);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tugas Kuliah');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const [fileSize, setFileSize] = useState(1500000);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(file.size);

      // Detect type
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
        setFileType('image');
      } else if (ext === 'pdf') {
        setFileType('pdf');
      } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) {
        setFileType('zip');
      } else if (['txt', 'md', 'js', 'ts', 'py', 'java', 'html', 'css'].includes(ext || '')) {
        setFileType('text');
      } else {
        setFileType('other');
      }

      // Create preview or object url
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject) {
      setError('Judul dan Mata Kuliah wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In production, we upload file to Supabase storage, then save record
      const finalFileUrl =
        fileUrl ||
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          subject,
          category,
          file_url: finalFileUrl,
          file_type: fileType,
          file_name: fileName || `${title.toLowerCase().replace(/\s+/g, '-')}.${fileType}`,
          file_size: fileSize,
          tags: [subject, category, fileType],
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
      } else {
        setError(json.error || 'Gagal mengunggah tugas.');
      }
    } catch (err: any) {
      setError('Terjadi kendala jaringan saat mengunggah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/admin" className={styles.backLink}>
        <ArrowLeft size={16} /> Kembali ke Dashboard Admin
      </Link>

      <div className={styles.card}>
        <div className="washi-tape washi-tape-top-right"></div>

        <h1 className={styles.title}>Unggah Berkas Tugas Baru</h1>
        <p className={styles.subtitle}>
          Tambahkan karya akademik Anda ke platform Portofolio LMS agar dapat ditinjau oleh dosen pengampu.
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '12px 16px', borderRadius: 8, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', padding: '12px 16px', borderRadius: 8, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} /> Berkas tugas berhasil disimpan! Mengalihkan ke dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>Judul Tugas / Proyek *</label>
            <input
              id="title"
              type="text"
              required
              placeholder="Contoh: Tugas 1 - Implementasi Normalisasi Basis Data"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className={styles.inputGroup}>
              <label htmlFor="subject" className={styles.label}>Mata Kuliah *</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={styles.input}
              >
                {COURSES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="category" className={styles.label}>Kategori Tugas</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.input}
              >
                <option value="Tugas Mandiri">Tugas Mandiri</option>
                <option value="Tugas Kelompok">Tugas Kelompok</option>
                <option value="Laporan Praktikum">Laporan Praktikum</option>
                <option value="Tugas Besar / Proyek">Tugas Besar / Proyek</option>
                <option value="Ujian Tengah Semester">Ujian Tengah Semester</option>
                <option value="Ujian Akhir Semester">Ujian Akhir Semester</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>Deskripsi &amp; Ringkasan Tugas</label>
            <textarea
              id="description"
              placeholder="Jelaskan ringkasan isi tugas, teknologi atau metode yang digunakan, serta capaian pembelajaran..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>

          {/* File Upload Dropzone */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Pilih Berkas Tugas (PDF, ZIP, Gambar, Teks, Dokumen) *</label>
            <label className={styles.dropzone}>
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.zip,.rar,.png,.jpg,.jpeg,.gif,.txt,.doc,.docx"
              />
              <UploadCloud size={36} className={styles.dropzoneIcon} />
              {selectedFile ? (
                <>
                  <div className={styles.dropzoneText}>
                    <CheckCircle2 size={16} color="#16a34a" style={{ display: 'inline', marginRight: 4 }} />
                    {selectedFile.name}
                  </div>
                  <div className={styles.dropzoneSubtext}>
                    Tipe: {fileType.toUpperCase()} • Ukuran: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.dropzoneText}>Klik untuk memilih atau seret berkas ke sini</div>
                  <div className={styles.dropzoneSubtext}>
                    Mendukung berkas PDF, ZIP folder proyek, Gambar (PNG/JPG), Teks/Dokumen hingga 50MB
                  </div>
                </>
              )}
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <button type="submit" disabled={loading} className="sketch-btn sketch-btn-dark">
              {loading ? 'Mengunggah Berkas...' : 'Publikasikan Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
