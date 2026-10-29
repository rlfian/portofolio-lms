import React from 'react';
import { BookMarked, CheckCircle2 } from 'lucide-react';
import { COURSES, PROFILE_DATA } from '@/lib/constants';
import styles from './CourseTable.module.css';

export default function CourseTable() {
  const totalSks = COURSES.reduce((acc, curr) => acc + curr.sks, 0);

  return (
    <section id="courses" className={styles.courseSection} aria-labelledby="courses-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.handwrittenTag}>academic schedule 📌</span>
        <h2 id="courses-heading" className={styles.sectionTitle}>
          Tabel Mata Kuliah Semester Ini
        </h2>
        <p className={styles.sectionSubtitle}>
          Daftar mata kuliah aktif yang ditempuh oleh {PROFILE_DATA.name} pada {PROFILE_DATA.semester} di {PROFILE_DATA.university}.
        </p>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableTopBar}>
          <div className={styles.tableTopTitle}>
            <BookMarked size={18} color="#2563eb" />
            <span>Kartu Rencana Studi (KRS) — Tahun Ajaran 2026/2027</span>
          </div>
          <div className={styles.totalSksBadge}>
            Total Beban: {totalSks} SKS
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" style={{ width: '60px', textAlign: 'center' }}>No</th>
              <th scope="col" style={{ width: '110px' }}>Kode</th>
              <th scope="col">Mata Kuliah &amp; Silabus Ringkas</th>
              <th scope="col" style={{ width: '90px', textAlign: 'center' }}>SKS</th>
              <th scope="col" style={{ width: '110px', textAlign: 'center' }}>Semester</th>
              <th scope="col" style={{ width: '130px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map((course) => (
              <tr key={course.code}>
                <td style={{ textAlign: 'center', fontWeight: 700 }}>{course.no}</td>
                <td>
                  <span className={styles.courseCode}>{course.code}</span>
                </td>
                <td>
                  <span className={styles.courseName}>{course.name}</span>
                  <span className={styles.courseDesc}>{course.description}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={styles.sksPill}>{course.sks} SKS</span>
                </td>
                <td style={{ textAlign: 'center', fontWeight: 600 }}>
                  Sem {course.semester}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={styles.statusActive}>
                    <CheckCircle2 size={13} /> Aktif
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
