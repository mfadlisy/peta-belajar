import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CallToAction.module.css';

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.banner}>
          
          {/* Left Column: Headline, Description and Orange Pill Button */}
          <div className={styles.leftCol}>
            <h2 className={styles.title}>
              Jadi yang pertama yang merasakan Pengalaman belajar yang lebih baik.
            </h2>
            <p className={styles.description}>
              Peta belajar baru saja diluncurkan dan akan terus berkembang untuk membantumu mencapai tujuan belajarmu
            </p>
            <div className={styles.btnWrapper}>
              <Link href="/assessment" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
                Mulai Gratis Sekarang
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column: Framed Image and Overlapping Floating White Card */}
          <div className={styles.rightCol}>
            <div className={styles.imageFrame}>
              <Image 
                src="/image-banner.png" 
                alt="Pengalaman belajar" 
                width={500}
                height={320}
                className={styles.bannerImage}
                priority
              />
            </div>

            {/* Floating Checklist Card */}
            <div className={styles.floatingCard}>
              <h3 className={styles.listTitle}>Pakai aplikasi ini kalau kamu:</h3>
              <ul className={styles.checklist}>
                <li className={styles.checkItem}>
                  <div className={styles.checkIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Ingin belajar skill baru dari sumber gratis</span>
                </li>
                
                <li className={styles.checkItem}>
                  <div className={styles.checkIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Bingung harus belajar darimana dulu</span>
                </li>

                <li className={styles.checkItem}>
                  <div className={styles.checkIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Ingin memiliki roadmap belajar yang jelas</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
