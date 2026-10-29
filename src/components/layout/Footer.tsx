import React from 'react';
import Link from 'next/link';
import { PROFILE_DATA } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <div className={styles.brandTitle}>
              <span>✨</span> {PROFILE_DATA.name}
            </div>
            <p className={styles.brandDesc}>
              Portofolio LMS dibangun untuk memenuhi tugas mata kuliah{' '}
              <strong>Pengembangan Aplikasi Web</strong> di{' '}
              <a
                href="https://uinsgd.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {PROFILE_DATA.university}
              </a>
              .
            </p>
          </div>

          <div className={styles.linksCol}>
            <div>
              <div className={styles.linkGroupTitle}>Navigasi</div>
              <ul className={styles.linkList}>
                <li><Link href="/">Halaman Profil</Link></li>
                <li><a href="#about">Tentang Saya</a></li>
                <li><a href="#courses">Tabel Mata Kuliah</a></li>
                <li><Link href="/tugas">Galeri Tugas LMS</Link></li>
              </ul>
            </div>

            <div>
              <div className={styles.linkGroupTitle}>Tautan Resmi</div>
              <ul className={styles.linkList}>
                <li>
                  <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer">
                    GitHub Profile ↗
                  </a>
                </li>
                <li>
                  <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href="https://uinsgd.ac.id" target="_blank" rel="noopener noreferrer">
                    Portal UIN SGD Bandung ↗
                  </a>
                </li>
                <li>
                  <Link href="/admin">Portal Admin Rio 🔒</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div>
            &copy; {new Date().getFullYear()} {PROFILE_DATA.name} — All Rights Reserved.
          </div>
          <div className={styles.badgePill}>
            <span>🎓</span> {PROFILE_DATA.major} • {PROFILE_DATA.semester}
          </div>
        </div>
      </div>
    </footer>
  );
}
