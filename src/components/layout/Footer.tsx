import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>

          {/* Brand Identity */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <img src="/logo.png" alt="Peta Belajar Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              <span className={styles.logoText}>Peta Belajar</span>
            </div>
            <p className={styles.tagline}>
              Membantumu navigasi belajar mandiri bebas dari information overload dengan bantuan AI adaptif.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className={styles.metaCol}>
            <span className={styles.metaTitle}>Mulai Perjalananmu</span>
            <p className={styles.metaDesc}>Siap menguasai skill baru hari ini?</p>
            <a href="#" className={styles.backToTop}>
              Kembali ke atas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.arrowIcon}>
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </a>
          </div>

        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Peta Belajar. All rights reserved.
          </p>
          <div className={styles.madeWith}>
            <span>Dibuat dengan ❤️ untuk Pembelajar Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
