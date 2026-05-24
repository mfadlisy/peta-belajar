import React from 'react';
import Image from 'next/image';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Cara kerja Peta Belajar</div>
          <h2 className={styles.title}>Belajar jadi lebih mudah dalam 3 langkah</h2>
          <p className={styles.subtitle}>
            Peta Belajar membantumu merencanakan, belajar dan berkembang secara terarah dan konsisten
          </p>
        </div>

        <div className={styles.grid}>
          {/* Card 1 */}
          <div className={`${styles.card} ${styles.bgBlue}`}>
            <div className={styles.cardContent}>
              <div className={styles.stepBadge}>Langkah 1</div>
              <h3 className={styles.cardTitle}>Kenali tipe belajarmu</h3>
              <p className={styles.cardDesc}>
                Isi asesmen singkat untuk memahami profil belajar, minat, tujuan dan ketersediaan waktumu untuk belajar
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image 
                src="/step1.png" 
                alt="Kenali tipe belajarmu" 
                width={400}
                height={350}
                className={styles.cardImage}
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${styles.card} ${styles.bgGreen}`}>
            <div className={styles.cardContent}>
              <div className={styles.stepBadge}>Langkah 2</div>
              <h3 className={styles.cardTitle}>Dapatkan Roadmap</h3>
              <p className={styles.cardDesc}>
                AI menyusun roadmap personal berisi urutan belajar terbaik dan sumber belajar yang paling relevan untuk kamu
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image 
                src="/step2.png" 
                alt="Dapatkan Roadmap" 
                width={400}
                height={350}
                className={styles.cardImage}
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className={`${styles.card} ${styles.bgYellow}`}>
            <div className={styles.cardContent}>
              <div className={styles.stepBadge}>Langkah 3</div>
              <h3 className={styles.cardTitle}>Mulai Belajar Terarah</h3>
              <p className={styles.cardDesc}>
                Belajar dengan struktur yang sudah dibuat dan dengan materi yang mudah dipahami dan sudah dipersonalisasikan
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image 
                src="/step3.png" 
                alt="Mulai Belajar Terarah" 
                width={400}
                height={350}
                className={styles.cardImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
