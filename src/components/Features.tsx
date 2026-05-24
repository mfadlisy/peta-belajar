import React from 'react';
import Image from 'next/image';
import styles from './Features.module.css';

export default function Features() {
  return (
    <section id="fitur" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Teman Perjalanan Proses Belajarmu</div>
          <h2 className={styles.title}>Fitur Lengkap Untuk Perjalanan Belajar</h2>
          <p className={styles.subtitle}>
            Peta Belajar dirancang untuk membantumu belajar lebih terarah, terstruktur, dan sesuai dengan tujuanmu.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.blueBg}`}>
              <Image src="/icon-profile-belajar.svg" alt="Diagnosis Profil Belajar" width={28} height={28} />
            </div>
            <h3 className={styles.cardTitle}>Diagnosis Profil Belajar</h3>
            <p className={styles.cardDesc}>
              Menggunakan metode VARK, Kolb & SDLRS untuk memahami tipe dan tujuan belajar mu
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.greenBg}`}>
              <Image src="/icon-roadmap.svg" alt="Roadmap Adaptif" width={28} height={28} />
            </div>
            <h3 className={styles.cardTitle}>Roadmap Adaptif</h3>
            <p className={styles.cardDesc}>
              Gunakan roadmap personal yang dibuat oleh AI sesuai tujuan, level, dan waktu belajar kamu
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.orangeBg}`}>
              <Image src="/icon-materi-belajar.svg" alt="Materi Belajar Relevan" width={28} height={28} />
            </div>
            <h3 className={styles.cardTitle}>Materi Belajar Relevan</h3>
            <p className={styles.cardDesc}>
              Setiap materi dilengkapi dengan informasi untuk membantu kamu memahami pelajaran
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.purpleBg}`}>
              <Image src="/icon-belajar-evaluasi.svg" alt="Belajar dan Evaluasi" width={28} height={28} />
            </div>
            <h3 className={styles.cardTitle}>Belajar dan Evaluasi</h3>
            <p className={styles.cardDesc}>
              Belajar interaktif yang dilengkapi kuis dan evaluasi untuk memastikan pemahamanmu
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles.blueBg2}`}>
              <Image src="/icon-tracking.svg" alt="Progress Tracking" width={28} height={28} />
            </div>
            <h3 className={styles.cardTitle}>Progress Tracking</h3>
            <p className={styles.cardDesc}>
              Pantau perkembangan belajarmu dari waktu ke waktu dan raih targetmu dengan konsisten
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
