'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, Star, MessageSquare, Send, CheckCircle2, FileText, Calendar } from 'lucide-react';
import { Assignment, Review } from '@/lib/types';
import styles from './detail.module.css';

export default function TugasDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('Dosen Pengampu');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        const [resAssign, resRev] = await Promise.all([
          fetch(`/api/assignments`),
          fetch(`/api/reviews?assignment_id=${id}`),
        ]);

        const jsonAssign = await resAssign.json();
        const jsonRev = await resRev.json();

        if (jsonAssign.success && jsonAssign.data) {
          const found = jsonAssign.data.find((item: Assignment) => item.id === id);
          setAssignment(found || null);
        }

        if (jsonRev.success && jsonRev.data) {
          setReviews(jsonRev.data);
        }
      } catch (err) {
        console.error('Error fetching details', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !comment) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignment_id: id,
          reviewer_name: reviewerName,
          reviewer_role: reviewerRole,
          rating,
          comment,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setReviews([json.data, ...reviews]);
        setComment('');
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to submit review', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '2rem' }}>
          Membuka lembar tugas... 📖
        </p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>Tugas tidak ditemukan</h2>
        <p style={{ color: '#71717a', margin: '12px 0 24px 0' }}>
          Berkas tugas yang Anda tuju mungkin telah dipindahkan atau dihapus.
        </p>
        <Link href="/tugas" className="sketch-btn">
          Kembali ke Galeri Tugas
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/tugas" className={styles.backLink}>
        <ArrowLeft size={16} /> Kembali ke Daftar Tugas
      </Link>

      <article className={styles.detailCard}>
        <div className="washi-tape washi-tape-top-right"></div>

        <div className={styles.metaRow}>
          <span className={styles.subjectBadge}>{assignment.subject}</span>
          <span style={{ fontSize: '0.85rem', color: '#71717a', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={14} /> Diunggah: {new Date(assignment.created_at).toLocaleDateString('id-ID')}
          </span>
        </div>

        <h1 className={styles.title}>{assignment.title}</h1>
        <p className={styles.description}>{assignment.description}</p>

        {/* File Viewer Box */}
        <div className={styles.fileViewer}>
          {assignment.file_type === 'image' && (
            <div className={styles.imagePreview}>
              <Image
                src={assignment.file_url}
                alt={assignment.title}
                width={800}
                height={450}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 4 }}
              />
            </div>
          )}

          {assignment.file_type === 'pdf' && (
            <iframe
              src={assignment.file_url}
              title={`Pratinjau PDF ${assignment.title}`}
              className={styles.pdfFrame}
            />
          )}

          <div className={styles.downloadRow}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{assignment.file_name}</div>
              <div style={{ fontSize: '0.8rem', color: '#71717a' }}>
                Format: {assignment.file_type.toUpperCase()} • {((assignment.file_size || 1500000) / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>

            <a
              href={assignment.file_url}
              download={assignment.file_name}
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn"
            >
              <Download size={16} /> Unduh Berkas Tugas
            </a>
          </div>
        </div>
      </article>

      {/* Review Section */}
      <section className={styles.reviewSection} aria-labelledby="review-heading">
        <h2 id="review-heading" className={styles.reviewTitle}>
          <MessageSquare size={22} color="#2563eb" /> Evaluasi &amp; Ulasan Tugas
        </h2>
        <p style={{ color: '#52525b', fontSize: '0.92rem', marginBottom: 20 }}>
          Dosen pengampu dan rekan mahasiswa dapat memberikan ulasan, saran konstruktif, dan nilai
          bintang pada tugas ini.
        </p>

        {/* Form Input Ulasan */}
        <form onSubmit={handleSubmitReview} className={styles.formBox}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className={styles.inputGroup}>
              <label htmlFor="revName" className={styles.label}>Nama Peninjau / Dosen *</label>
              <input
                id="revName"
                type="text"
                placeholder="Contoh: Dr. Nama Dosen, M.T."
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="revRole" className={styles.label}>Peran Peninjau</label>
              <select
                id="revRole"
                value={reviewerRole}
                onChange={(e) => setReviewerRole(e.target.value)}
                className={styles.input}
              >
                <option value="Dosen Pengampu">Dosen Pengampu</option>
                <option value="Asisten Dosen">Asisten Dosen / Lab</option>
                <option value="Rekan Mahasiswa">Rekan Mahasiswa</option>
                <option value="Pengunjung Umum">Pengunjung Umum</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Penilaian (Rating)</label>
            <div className={styles.starsRow} role="radiogroup" aria-label="Rating Bintang">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={styles.starBtn}
                  aria-label={`${star} bintang`}
                >
                  <Star
                    size={24}
                    fill={star <= rating ? '#eab308' : 'none'}
                    color={star <= rating ? '#eab308' : '#cbd5e1'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="revComment" className={styles.label}>Komentar / Masukan Konstruktif *</label>
            <textarea
              id="revComment"
              required
              placeholder="Tuliskan ulasan, catatan evaluasi, atau apresiasi mengenai tugas ini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <button type="submit" disabled={submitting} className="sketch-btn sketch-btn-dark">
              <Send size={15} /> {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>

            {submitSuccess && (
              <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} /> Ulasan berhasil dipublikasikan!
              </span>
            )}
          </div>
        </form>

        {/* List of Reviews */}
        <div className={styles.reviewsList}>
          {reviews.length === 0 ? (
            <p style={{ color: '#71717a', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>
              Belum ada ulasan untuk tugas ini. Jadilah yang pertama memberikan masukan!
            </p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className={styles.reviewItem}>
                <div className={styles.reviewerMeta}>
                  <div>
                    <span className={styles.reviewerName}>{rev.reviewer_name}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: 8 }}>
                      ({rev.reviewer_role})
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= rev.rating ? '#eab308' : 'none'}
                        color={s <= rev.rating ? '#eab308' : '#cbd5e1'}
                      />
                    ))}
                  </div>
                </div>
                <p className={styles.reviewComment}>{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
