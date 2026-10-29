'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Star, User, BookOpen, Layers, ShieldCheck, Github, Linkedin, ExternalLink } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer} aria-label="Main Navigation">
        <Link href="/" className={styles.brand}>
          <div className={styles.avatarBadge}>RA</div>
          <span className={styles.brandText}>rio.alfian</span>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/"
              className={`${styles.navItem} ${pathname === '/' ? styles.navItemActive : ''}`}
            >
              <Star size={14} /> HOME
            </Link>
          </li>
          <li>
            <a href="#about" className={styles.navItem}>
              <User size={14} /> ABOUT
            </a>
          </li>
          <li>
            <a href="#courses" className={styles.navItem}>
              <Layers size={14} /> MATA KULIAH
            </a>
          </li>
          <li>
            <Link
              href="/tugas"
              className={`${styles.navItem} ${pathname.startsWith('/tugas') ? styles.navItemActive : ''}`}
            >
              <BookOpen size={14} /> TUGAS LMS
            </Link>
          </li>
        </ul>

        <div className={styles.rightGroup}>
          <a
            href="https://github.com/rlfiann"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/rioalfian"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialBtn}
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <Link href="/admin" className={styles.adminBtn} title="Portal Admin Rio">
            <ShieldCheck size={15} /> ADMIN
          </Link>
        </div>
      </nav>
    </header>
  );
}
