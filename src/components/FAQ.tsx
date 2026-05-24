'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItemData {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItemData[] = [
  {
    id: 1,
    question: "Apakah peta belajar gratis?",
    answer: "Ya! Peta Belajar dapat digunakan secara gratis untuk membantu siapa saja memulai perjalanan belajar mereka tanpa hambatan biaya."
  },
  {
    id: 2,
    question: "Bagaimana cara AI membuat roadmap?",
    answer: "AI kami menganalisis topik yang ingin Anda kuasai, kemudian memetakan urutan konsep dari dasar hingga mahir. AI juga menyaring dan mengurasi materi belajar eksternal terbaik seperti video YouTube berkualitas dan artikel blog terpercaya agar Anda tidak terkena information overload."
  },
  {
    id: 3,
    question: "Apakah ada batasan limit?",
    answer: "Untuk akun gratis, Anda bisa membuat hingga 3 roadmap belajar kustom setiap bulannya. Untuk pembuatan roadmap tanpa batas dan fitur analisis belajar mendalam, tersedia opsi keanggotaan premium."
  },
  {
    id: 4,
    question: "Apa yang dilihat dari asesmen profil belajar?",
    answer: "Asesmen kami menggunakan kombinasi metode ilmiah (VARK dan Kolb) untuk mendiagnosis gaya belajar Anda (Visual, Auditorial, Kinestetik, atau Tekstual) dan kesiapan belajar mandiri. Hasil asesmen ini digunakan AI untuk menyesuaikan format materi di dalam roadmap Anda."
  },
  {
    id: 5,
    question: "Bisakah digunakan di perangkat mobile?",
    answer: "Tentu saja! Peta Belajar dirancang dengan pendekatan Mobile-First. Tampilan dashboard, pelacakan progress, hingga modul kuis interaktif dioptimalkan sepenuhnya agar sangat nyaman digunakan dari smartphone Anda kapan saja."
  },
  {
    id: 6,
    question: "Bagaimana jika saya sudah paham materinya?",
    answer: "Anda dapat menandai materi tersebut sebagai 'Sudah Dikuasai' secara manual, atau melewati modul tersebut dengan mengerjakan kuis evaluasi singkat. AI akan secara otomatis menyesuaikan sisa roadmap belajar Anda!"
  }
];

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={`${styles.faqCard} ${isOpen ? styles.cardOpen : styles.cardClosed}`}>
      <button
        className={styles.questionButton}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{item.question}</span>
        <div className={styles.circleButton}>
          {isOpen ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          )}
        </div>
      </button>

      <div className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : styles.answerClosed}`}>
        <div className={styles.answerContent}>
          <p className={styles.answerText}>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  // Independent toggles, allowing multiple cards open at once. Open first two by default like the mockup
  const [openIds, setOpenIds] = useState<number[]>([1, 2]);

  const handleToggle = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.badge}>F.A.Q</div>
          <h2 className={styles.title}>Pertanyaan yang Sering Diajukan</h2>
          <p className={styles.subtitle}>
            Temukan jawaban atas berbagai pertanyaan umum seputar fitur, cara kerja, dan penggunaan Peta Belajar.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqData.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openIds.includes(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
