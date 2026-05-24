'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbarWrapper}>
      <nav className="container">
        <div className={styles.navbar}>
          {/* Logo */}
          <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
            <Image src="/logo.svg" alt="Peta Belajar Logo" width={36} height={36} style={{ objectFit: 'contain' }} />
            <span>Peta Belajar</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className={styles.navLinks}>
            <Link href="/" className={`${styles.navLink} ${styles.active}`}>Beranda</Link>
            <Link href="/#fitur" className={styles.navLink}>Fitur</Link>
            <Link href="/#cara-kerja" className={styles.navLink}>Cara Kerja</Link>
            <Link href="/#testimoni" className={styles.navLink}>Testimoni</Link>
            <Link href="/#faq" className={styles.navLink}>FAQ</Link>
          </div>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <Link href="/dashboard" className={styles.btnOutline}>
              Dashboardmu
            </Link>
            <Link href="/assessment" className={styles.btnPrimary}>
              Buat Roadmap
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileLinks}>
            <Link href="/" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Beranda</Link>
            <Link href="/#fitur" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Fitur</Link>
            <Link href="/#cara-kerja" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Cara Kerja</Link>
            <Link href="/#testimoni" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Testimoni</Link>
            <Link href="/#faq" className={styles.mobileLink} onClick={() => setIsOpen(false)}>FAQ</Link>
          </div>
          <div className={styles.mobileActions}>
            <Link href="/dashboard" className={styles.mobileBtnOutline} onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <Link href="/assessment" className={styles.mobileBtnPrimary} onClick={() => setIsOpen(false)}>
              Buat Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
