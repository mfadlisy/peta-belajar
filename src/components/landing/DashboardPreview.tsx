import React from 'react';
import styles from './DashboardPreview.module.css';

export default function DashboardPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>

          {/* Left Side: Dashboard Placeholder */}
          <div className={styles.leftColumn}>
            <img
              src="/dashboard-preview.png"
              alt="Preview Dashboard Peta Belajar"
              className={styles.dashboardImage}
            />
          </div>

          {/* Right Side: Text Content */}
          <div className={styles.rightColumn}>
            <div className={styles.badge}>Lebih Dari Sekedar Roadmap Belajar</div>
            <h2 className={styles.title}>Semua Kebutuhan Belajar Terkumpul Dalam Satu Tempat</h2>

            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <div className={styles.checkIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="transparent" />
                    <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className={styles.featureText}>Roadmap personal yang selalu up-to-date</span>
              </li>

              <li className={styles.featureItem}>
                <div className={styles.checkIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="transparent" />
                    <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className={styles.featureText}>Sumber belajar relevan dan terakurasi</span>
              </li>

              <li className={styles.featureItem}>
                <div className={styles.checkIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="transparent" />
                    <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className={styles.featureText}>Tracking progress dan streak harian</span>
              </li>

              <li className={styles.featureItem}>
                <div className={styles.checkIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="transparent" />
                    <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className={styles.featureText}>Catatan, highlight dan review materi</span>
              </li>

              <li className={styles.featureItem}>
                <div className={styles.checkIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="transparent" />
                    <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className={styles.featureText}>Kuis dan latihan untuk menguji pemahaman</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
