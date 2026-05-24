'use client';

import React, { useRef } from 'react';
import styles from './Testimonials.module.css';

interface TestimonialData {
  id: number;
  numberStr: string;
  quote: string;
  author: string;
  role: string;
  innerBgColor: string;
  accentColor: string;
  pinColor: string;
  pinStrokeColor: string;
  rotation: number;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    numberStr: "01",
    quote: "Desainnya clean dan mudah dipahami, Roadmapnya membantu saya belajar lebih fokus tanpa bingung mulai dari mana.",
    author: "Anisa Hasna",
    role: "Guru Paud & Mahasiswi S2",
    innerBgColor: "#FFF7F2", // soft peach
    accentColor: "#F97316", // orange
    pinColor: "#FF5A36", // red-orange pin
    pinStrokeColor: "#D9381E",
    rotation: -2
  },
  {
    id: 2,
    numberStr: "02",
    quote: "Sangat terbantu dengan diagnosis tipe belajar VARK. Saya jadi tahu kalau saya tipe visual-kinestetik, jadinya cara belajar saya sesuaikan!",
    author: "Budi Santoso",
    role: "Self-taught Developer",
    innerBgColor: "#F0F7FF", // soft blue
    accentColor: "#3B82F6", // blue
    pinColor: "#3B82F6", // blue pin
    pinStrokeColor: "#1D4ED8",
    rotation: 2
  },
  {
    id: 3,
    numberStr: "03",
    quote: "Fitur tracking progress-nya bikin nagih banget. Streak harian bikin saya konsisten belajar coding tiap hari sepulang kerja.",
    author: "Clara Amelia",
    role: "UI/UX Designer",
    innerBgColor: "#FAF5FF", // soft purple
    accentColor: "#8B5CF6", // purple
    pinColor: "#8B5CF6", // purple pin
    pinStrokeColor: "#6D28D9",
    rotation: -1.5
  },
  {
    id: 4,
    numberStr: "04",
    quote: "AI roadmapnya luar biasa adaptif. Pas kuis saya kurang paham, materinya disesuaikan otomatis biar lebih mendasar.",
    author: "Daffa Pratama",
    role: "Mahasiswa Informatika",
    innerBgColor: "#FFF7F2", // soft peach
    accentColor: "#F97316", // orange
    pinColor: "#FF5A36", // red-orange pin
    pinStrokeColor: "#D9381E",
    rotation: 2.5
  },
  {
    id: 5,
    numberStr: "05",
    quote: "Peta Belajar bener-bener hemat waktu. Nggak perlu lagi pusing ngumpulin dan nyaring video YouTube atau artikel bermutu.",
    author: "Eka Wijaya",
    role: "Karyawan Swasta",
    innerBgColor: "#F0F7FF", // soft blue
    accentColor: "#3B82F6", // blue
    pinColor: "#3B82F6", // blue pin
    pinStrokeColor: "#1D4ED8",
    rotation: -2
  }
];

interface PushpinSvgProps {
  color: string;
  strokeColor: string;
}

function PushpinSvg({ color, strokeColor }: PushpinSvgProps) {
  return (
    <svg width="34" height="42" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.pushpin}>
      {/* Pin Shadow */}
      <ellipse cx="18" cy="44" rx="6" ry="2.5" fill="rgba(0, 0, 0, 0.25)" />
      {/* Needle */}
      <line x1="18" y1="24" x2="18" y2="44" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      {/* Plastic Cap */}
      <path d="M18 4C23.5228 4 28 8.47715 28 14C28 17.5 25.5 21 22 22.5V26H14V22.5C10.5 21 8 17.5 8 14C8 8.47715 12.4772 4 18 4Z" fill={color} fillOpacity="0.85" />
      {/* Gloss Highlight */}
      <circle cx="15" cy="10" r="3" fill="#FFFFFF" fillOpacity="0.6" />
      <path d="M12 24H24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface StickyNoteProps {
  data: TestimonialData;
}

function StickyNote({ data }: StickyNoteProps) {
  const stars = Array(5).fill(0);

  return (
    <div
      className={styles.stickyNoteWrapper}
      style={{
        transform: `rotate(${data.rotation}deg)`
      }}
    >
      {/* 3D Pushpin */}
      <div className={styles.pushpinContainer}>
        <PushpinSvg color={data.pinColor} strokeColor={data.pinStrokeColor} />
      </div>

      {/* Main Card */}
      <div className={styles.card}>
        <div className={styles.innerCard} style={{ backgroundColor: data.innerBgColor }}>

          <div className={styles.cardHeader}>
            <span className={styles.cardNumber} style={{ color: data.accentColor }}>
              {data.numberStr}
            </span>
            <div className={styles.stars}>
              {stars.map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={data.accentColor}>
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
          </div>

          <p className={styles.quote}>&ldquo;{data.quote}&rdquo;</p>

          <div className={styles.divider} style={{ borderColor: `${data.accentColor}22` }}></div>

          <div className={styles.authorSection}>
            <h4 className={styles.authorName}>{data.author}</h4>
            <p className={styles.authorRole}>{data.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <section id="testimoni" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <div className={styles.badge}>Testimoni Pengguna</div>
          <h2 className={styles.title}>Apa Kata Mereka Tentang Peta Belajar?</h2>
          <p className={styles.subtitle}>
            Pengalaman dan ulasan dari pengguna Peta Belajar.
          </p>
        </div>

        {/* Scrollable Horizontal Board */}
        <div className={styles.boardWrapper}>
          <div className={styles.board} ref={boardRef}>

            {/* Ruled lines inside scroll content to scroll naturally */}
            <div className={styles.scrollContent}>

              {/* Sticky Notes */}
              {testimonials.map((t) => (
                <StickyNote key={t.id} data={t} />
              ))}

            </div>
          </div>

          {/* Scroll Hint */}
          <div className={styles.scrollHint}>
            <span className={styles.hintText}>Geser ke kanan untuk melihat lebih banyak</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hintIcon}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
