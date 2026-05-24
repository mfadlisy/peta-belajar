'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { saveLearningProfile } from '@/lib/storage/localLearning';
import styles from './assessment.module.css';

// Definition of assessment questions
interface Option {
  id: string;
  text: string;
  category: 'V' | 'A' | 'R' | 'K' | 'Diverger' | 'Assimilator' | 'Converger' | 'Accommodator' | 'score_5' | 'score_4' | 'score_3' | 'score_2';
}

interface Question {
  id: number;
  section: 'vark' | 'kolb' | 'sdlrs';
  questionText: string;
  options: Option[];
}

const questions: Question[] = [
  // SECTION 1: VARK (Visual, Auditory, Read/Write, Kinesthetic)
  {
    id: 1,
    section: 'vark',
    questionText: 'Ketika Anda ingin mempelajari cara kerja sebuah aplikasi atau tools baru, Anda biasanya lebih memilih untuk...',
    options: [
      { id: '1a', text: 'Melihat infografis, video demonstrasi visual, atau screenshot panduan.', category: 'V' },
      { id: '1b', text: 'Mendengarkan penjelasan lisan, podcast review, atau video panduan bersuara.', category: 'A' },
      { id: '1c', text: 'Membaca dokumentasi teks tertulis, e-book panduan, atau artikel blog.', category: 'R' },
      { id: '1d', text: 'Langsung membuka aplikasi tersebut dan mengklik menu-menunya secara langsung.', category: 'K' },
    ]
  },
  {
    id: 2,
    section: 'vark',
    questionText: 'Jika Anda harus menjelaskan konsep yang cukup rumit kepada rekan belajar Anda, Anda biasanya...',
    options: [
      { id: '2a', text: 'Menggambar diagram alir, grafik, atau coretan visual di papan tulis.', category: 'V' },
      { id: '2b', text: 'Menjelaskannya secara lisan menggunakan perumpamaan/analogi cerita suara.', category: 'A' },
      { id: '2c', text: 'Menuliskan ringkasan berupa poin-poin penjelasan di chat atau dokumen.', category: 'R' },
      { id: '2d', text: 'Mengajaknya mempraktikkan langsung langkah demi langkah konsep tersebut.', category: 'K' },
    ]
  },
  {
    id: 3,
    section: 'vark',
    questionText: 'Di waktu luang Anda, format media pembelajaran manakah yang paling membuat Anda menikmati proses belajar?',
    options: [
      { id: '3a', text: 'Mind map visual berwarna, bagan diagram, atau komik edukatif.', category: 'V' },
      { id: '3b', text: 'Webinar langsung, diskusi santai di podcast, atau rekaman audio.', category: 'A' },
      { id: '3c', text: 'Modul materi tertulis, forum tanya-jawab Reddit/StackOverflow, atau buku ilmiah.', category: 'R' },
      { id: '3d', text: 'Simulator interaktif, playground coding sandbox, atau projek eksperimen fisik.', category: 'K' },
    ]
  },
  
  // SECTION 2: KOLB Learning Cycle
  {
    id: 4,
    section: 'kolb',
    questionText: 'Ketika Anda menghadapi sebuah masalah teknis (misal error kode/alat rusak) yang belum pernah Anda temui, Anda akan...',
    options: [
      { id: '4a', text: 'Merenungkan masalahnya sejenak dan bertukar pikiran dengan orang lain untuk mendapat ide kreatif.', category: 'Diverger' },
      { id: '4b', text: 'Membaca teori dasar, logika, atau diagram ilmiah di balik sistem tersebut terlebih dahulu.', category: 'Assimilator' },
      { id: '4c', text: 'Merencanakan solusi logis langkah demi langkah dan langsung mengujinya secara fokus.', category: 'Converger' },
      { id: '4d', text: 'Mengikuti insting awal Anda dan langsung mencoba solusi acak secara bertahap sampai berhasil.', category: 'Accommodator' },
    ]
  },
  {
    id: 5,
    section: 'kolb',
    questionText: 'Dalam sebuah kolaborasi kelompok atau tim projek, peran manakah yang paling membuat Anda nyaman?',
    options: [
      { id: '5a', text: 'Brainstorming ide-ide baru, mengamati dinamika, dan merumuskan sudut pandang kreatif.', category: 'Diverger' },
      { id: '5b', text: 'Menganalisis data, menyusun model teoritis logis, dan merapikan alur konseptual.', category: 'Assimilator' },
      { id: '5c', text: 'Mengambil keputusan teknis, merancang solusi praktis, dan memecahkan problem taktis.', category: 'Converger' },
      { id: '5d', text: 'Memimpin eksekusi lapangan, mengambil risiko, dan beradaptasi cepat dengan perubahan mendadak.', category: 'Accommodator' },
    ]
  },
  {
    id: 6,
    section: 'kolb',
    questionText: 'Bagaimanakah cara terbaik Anda untuk mengevaluasi pemahaman setelah mempelajari satu bab materi baru?',
    options: [
      { id: '6a', text: 'Merefleksikannya dan mendiskusikannya kembali dengan rekan belajar untuk melihat sudut pandang mereka.', category: 'Diverger' },
      { id: '6b', text: 'Menuliskan ringkasan komprehensif, mengelompokkan teori, dan membuat struktur hierarki logis.', category: 'Assimilator' },
      { id: '6c', text: 'Mengerjakan bank kuis latihan, studi kasus teknis, atau tes simulasi mandiri.', category: 'Converger' },
      { id: '6d', text: 'Mencoba membuat sebuah projek kecil nyata berbasis materi baru tersebut.', category: 'Accommodator' },
    ]
  },

  // SECTION 3: SDLRS (Self-Directed Learning Readiness Score)
  {
    id: 7,
    section: 'sdlrs',
    questionText: 'Seberapa disiplin Anda dalam mengatur jadwal belajar Anda sendiri tanpa adanya paksaan atau pengawasan orang lain?',
    options: [
      { id: '7a', text: 'Sangat Disiplin — Saya rutin menjadwalkan waktu belajar kustom dan konsisten mematuhinya.', category: 'score_5' },
      { id: '7b', text: 'Cukup Disiplin — Saya bisa belajar sendiri, walaupun seringkali terdistraksi di tengah jalan.', category: 'score_4' },
      { id: '7c', text: 'Sedang — Saya membutuhkan pengingat berkala, tenggat waktu eksternal, atau alarm agar tetap fokus.', category: 'score_3' },
      { id: '7d', text: 'Butuh Bimbingan — Saya kesulitan jika tidak memiliki pelatih atau jadwal teratur yang disiapkan mentor.', category: 'score_2' },
    ]
  },
  {
    id: 8,
    section: 'sdlrs',
    questionText: 'Ketika Anda menemukan konsep materi belajar yang sangat membingungkan atau sulit di tengah jalan, Anda cenderung...',
    options: [
      { id: '8a', text: 'Mencari sumber referensi lain secara aktif (video YouTube, forum StackOverflow, artikel) sampai benar-benar paham.', category: 'score_5' },
      { id: '8b', text: 'Mencoba membedahnya sendiri secara mandiri beberapa kali sebelum memutuskan bertanya pada rekan.', category: 'score_4' },
      { id: '8c', text: 'Langsung bertanya kepada asisten AI atau memposting pertanyaan di grup komunitas.', category: 'score_3' },
      { id: '8d', text: 'Merasa frustrasi, menunda mempelajarinya kembali, atau bahkan meninggalkannya begitu saja.', category: 'score_2' },
    ]
  }
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Welcome screen, 1..8 = Questions, 9 = Result screen
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Result States
  const [varkScores, setVarkScores] = useState({ V: 0, A: 0, R: 0, K: 0 });
  const [dominantVark, setDominantVark] = useState('');
  const [kolbStyle, setKolbStyle] = useState('');
  const [sdlrsScore, setSdlrsScore] = useState(0);
  const [sdlrsLevel, setSdlrsLevel] = useState('');

  // Auto hide toast after 3.5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };


  const handleOptionSelect = (questionId: number, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep < questions.length) {
      if (!selectedAnswers[currentStep]) {
        showToast("Silakan pilih salah satu opsi terlebih dahulu!", 'error');
        return;
      }
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate final scores
      calculateResults();
      setCurrentStep(9);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    // 1. VARK
    let V = 0, A = 0, R = 0, K = 0;
    // 2. Kolb
    const kolbCounts = { Diverger: 0, Assimilator: 0, Converger: 0, Accommodator: 0 };
    // 3. SDLRS
    let sdlTotal = 0;

    questions.forEach(q => {
      const selectedOptId = selectedAnswers[q.id];
      const opt = q.options.find(o => o.id === selectedOptId);
      if (!opt) return;

      if (q.section === 'vark') {
        if (opt.category === 'V') V += 1;
        if (opt.category === 'A') A += 1;
        if (opt.category === 'R') R += 1;
        if (opt.category === 'K') K += 1;
      } else if (q.section === 'kolb') {
        const cat = opt.category as 'Diverger' | 'Assimilator' | 'Converger' | 'Accommodator';
        kolbCounts[cat] += 1;
      } else if (q.section === 'sdlrs') {
        if (opt.category === 'score_5') sdlTotal += 5;
        if (opt.category === 'score_4') sdlTotal += 4;
        if (opt.category === 'score_3') sdlTotal += 3;
        if (opt.category === 'score_2') sdlTotal += 2;
      }
    });

    setVarkScores({ V, A, R, K });

    // Determine dominant VARK style
    const varkMaxVal = Math.max(V, A, R, K);
    const dominantVarkStyles: string[] = [];
    if (V === varkMaxVal) dominantVarkStyles.push('Visual (Peta & Diagram)');
    if (A === varkMaxVal) dominantVarkStyles.push('Auditory (Audio & Diskusi)');
    if (R === varkMaxVal) dominantVarkStyles.push('Read/Write (Teks & Dokumentasi)');
    if (K === varkMaxVal) dominantVarkStyles.push('Kinesthetic (Praktik & Eksperimen)');
    setDominantVark(dominantVarkStyles.join(' & '));

    // Determine dominant Kolb style
    let maxKolbCount = -1;
    let finalKolb = 'Converger'; // Fallback
    Object.entries(kolbCounts).forEach(([style, count]) => {
      if (count > maxKolbCount) {
        maxKolbCount = count;
        finalKolb = style;
      }
    });
    setKolbStyle(finalKolb);

    // SDLRS Assessment
    setSdlrsScore(sdlTotal);
    if (sdlTotal >= 9) {
      setSdlrsLevel('Sangat Mandiri (High Learner Autonomy)');
    } else if (sdlTotal >= 6) {
      setSdlrsLevel('Cukup Mandiri (Moderate Learner Autonomy)');
    } else {
      setSdlrsLevel('Butuh Bimbingan (Low Learner Autonomy)');
    }
  };

  const handleSaveProfile = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      try {
        saveLearningProfile({
          vark_scores: varkScores,
          kolb_style: kolbStyle,
          sdlrs_score: sdlrsScore,
          sdlrs_level: sdlrsLevel,
        });
        showToast("Profil belajar tersimpan di browser ini.", 'success');
        setTimeout(() => {
          window.location.href = '/skills';
        }, 1500);
      } catch {
        showToast("Gagal menyimpan profil di browser.", 'error');
        setIsLoading(false);
      }
    }, 300);
  };

  // Get properties for Kolb Description
  const getKolbDetails = (style: string) => {
    switch (style) {
      case 'Diverger':
        return {
          title: 'Diverger (Pengamat Kreatif)',
          description: 'Anda belajar paling baik melalui Pengalaman Konkrit (CE) dan Observasi Reflektif (RO). Anda memiliki imajinasi yang luas, pandai memahami orang lain, suka berdiskusi kelompok, dan melihat masalah dari berbagai sudut pandang kreatif.',
          color: '#8B5CF6'
        };
      case 'Assimilator':
        return {
          title: 'Assimilator (Pemikir Logis)',
          description: 'Anda belajar paling baik melalui Konseptualisasi Abstrak (AC) dan Observasi Reflektif (RO). Anda sangat menghargai logika, menyukai model teoritis ilmiah yang rapi, dan lebih mementingkan akurasi konsep daripada aplikasi praktis instan.',
          color: '#3B82F6'
        };
      case 'Converger':
        return {
          title: 'Converger (Pemecah Masalah Praktis)',
          description: 'Anda belajar paling baik melalui Konseptualisasi Abstrak (AC) dan Eksperimen Aktif (AE). Anda sangat menyukai pemecahan masalah secara teknis, mencari satu solusi yang paling tepat, dan langsung menerapkannya pada hal-hal praktis.',
          color: '#10B981'
        };
      case 'Accommodator':
        return {
          title: 'Accommodator (Pelaku Lapangan)',
          description: 'Anda belajar paling baik melalui Pengalaman Konkrit (CE) dan Eksperimen Aktif (AE). Anda adalah tipe pembelajar praktis yang suka bertindak berdasarkan insting, menikmati tantangan baru, beradaptasi secara instan, dan belajar dari kesalahan langsung.',
          color: '#F59E0B'
        };
      default:
        return { title: '', description: '', color: '#000000' };
    }
  };

  const currentQuestion = questions[currentStep - 1];

  return (
    <div className={styles.container}>

      {/* Toast Notification */}
      <div className={`${styles.toast} ${toast.show ? styles.toastActive : ''} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
        <div className={`${styles.toastIcon} ${toast.type === 'success' ? styles.toastIconSuccess : styles.toastIconError}`}>
          {toast.type === 'success' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </div>
        <span className={styles.toastMessage}>{toast.message}</span>
      </div>
      
      {/* Absolute back home button */}
      <Link href="/" className={styles.backButton}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Kembali ke Beranda</span>
      </Link>

      <div className={styles.cardWrapper}>

        {/* STEP 0: Welcome Assessment Page */}
        {currentStep === 0 && (
          <div className={styles.welcomeCard}>
            <div className={styles.logoBadge}>
              <Image src="/logo.png" alt="Peta Belajar Logo" width={56} height={56} />
              <h1>Diagnosis Profil Belajar</h1>
            </div>
            
            <p className={styles.welcomeSubtitle}>
              Mulai perjalanan belajar mandiri Anda secara terarah dengan diagnosis ilmiah yang diakui secara akademis.
            </p>

            {/* Visual frameworks grid */}
            <div className={styles.frameworksGrid}>
              <div className={styles.frameworkItem}>
                <div className={`${styles.fwIcon} ${styles.blueBg}`}>VARK</div>
                <h3>Metode VARK</h3>
                <p>Mendiagnosis preferensi penyerapan info (Visual, Auditori, Teks, Kinestetik).</p>
              </div>

              <div className={styles.frameworkItem}>
                <div className={`${styles.fwIcon} ${styles.greenBg}`}>KOLB</div>
                <h3>Siklus Kolb</h3>
                <p>Menganalisis cara berpikir logis dan model adaptasi pemecahan masalah.</p>
              </div>

              <div className={styles.frameworkItem}>
                <div className={`${styles.fwIcon} ${styles.orangeBg}`}>SDLRS</div>
                <h3>Skor SDLRS</h3>
                <p>Mengukur tingkat kesiapan dan kemandirian Anda dalam belajar mandiri.</p>
              </div>
            </div>

            <div className={styles.assessmentMeta}>
              <span>⏱️ Estimasi Waktu: <b>3 Menit</b></span>
              <span>📝 Jumlah Soal: <b>8 Soal Pilihan Ganda</b></span>
            </div>

            <button onClick={handleNext} className={styles.startBtn}>
              Mulai Asesmen Sekarang
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}

        {/* STEP 1 to 8: Question Cards */}
        {currentStep >= 1 && currentStep <= questions.length && (
          <div className={styles.questionCard}>
            
            {/* Header progress bar */}
            <div className={styles.progressHeader}>
              <span className={styles.stepCounter}>Soal {currentStep} dari {questions.length}</span>
              <span className={styles.sectionBadge}>
                {currentQuestion.section === 'vark' && 'Preferensi Belajar (VARK)'}
                {currentQuestion.section === 'kolb' && 'Gaya Berpikir (KOLB)'}
                {currentQuestion.section === 'sdlrs' && 'Kemandirian Belajar (SDLRS)'}
              </span>
            </div>
            
            <div className={styles.progressBarWrapper}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h2 className={styles.questionTitle}>{currentQuestion.questionText}</h2>

            {/* Options Grid */}
            <div className={styles.optionsList}>
              {currentQuestion.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(currentQuestion.id, opt.id)}
                  className={`${styles.optionCard} ${selectedAnswers[currentQuestion.id] === opt.id ? styles.optionSelected : ''}`}
                >
                  <div className={styles.checkIndicator}>
                    {selectedAnswers[currentQuestion.id] === opt.id && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className={styles.optionText}>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Navigations footer */}
            <div className={styles.cardFooter}>
              <button 
                onClick={handleBack} 
                className={styles.backBtn}
              >
                Kembali
              </button>
              
              <button 
                onClick={handleNext} 
                className={styles.nextBtn}
              >
                {currentStep === questions.length ? 'Lihat Hasil Diagnosis' : 'Lanjut'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: Detailed Scientific Assessment Results Page */}
        {currentStep === 9 && (
          <div className={styles.resultCard}>
            
            {/* Header Success Badge */}
            <div className={styles.resultHeader}>
              <div className={styles.checkSeal}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2>Asesmen Profil Belajar Selesai!</h2>
              <p>Berikut adalah profil belajar adaptif terstruktur yang dianalisis oleh AI kami:</p>
            </div>

            {/* Results breakdown container */}
            <div className={styles.resultsGrid}>
              
              {/* Box 1: Dominant VARK preferensi */}
              <div className={styles.resultBox}>
                <span className={styles.resBadge} style={{ background: '#E0E7FF', color: '#4F46E5' }}>VARK PREFERENCE</span>
                <h3>Gaya Masukan Informasi</h3>
                <h4 className={styles.dominantResult}>{dominantVark}</h4>
                
                {/* Visual VARK bar charts */}
                <div className={styles.varkChart}>
                  <div className={styles.chartBarItem}>
                    <span className={styles.barLabel}>Visual (V)</span>
                    <div className={styles.barOuter}>
                      <div className={styles.barInner} style={{ width: `${(varkScores.V / 3) * 100}%`, background: '#3B82F6' }}></div>
                    </div>
                  </div>
                  <div className={styles.chartBarItem}>
                    <span className={styles.barLabel}>Auditory (A)</span>
                    <div className={styles.barOuter}>
                      <div className={styles.barInner} style={{ width: `${(varkScores.A / 3) * 100}%`, background: '#8B5CF6' }}></div>
                    </div>
                  </div>
                  <div className={styles.chartBarItem}>
                    <span className={styles.barLabel}>Read/Write (R)</span>
                    <div className={styles.barOuter}>
                      <div className={styles.barInner} style={{ width: `${(varkScores.R / 3) * 100}%`, background: '#EC4899' }}></div>
                    </div>
                  </div>
                  <div className={styles.chartBarItem}>
                    <span className={styles.barLabel}>Kinesthetic (K)</span>
                    <div className={styles.barOuter}>
                      <div className={styles.barInner} style={{ width: `${(varkScores.K / 3) * 100}%`, background: '#10B981' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Kolb Cognitive Style */}
              <div className={styles.resultBox} style={{ borderColor: getKolbDetails(kolbStyle).color }}>
                <span className={styles.resBadge} style={{ background: '#DCFCE7', color: '#16A34A' }}>KOLB COGNITIVE STYLE</span>
                <h3>Siklus Berpikir Logis</h3>
                <h4 className={styles.dominantResult} style={{ color: getKolbDetails(kolbStyle).color }}>
                  {getKolbDetails(kolbStyle).title}
                </h4>
                <p className={styles.kolbDescText}>
                  {getKolbDetails(kolbStyle).description}
                </p>
              </div>

              {/* Box 3: SDLRS Autonomy Level */}
              <div className={styles.resultBox}>
                <span className={styles.resBadge} style={{ background: '#FEF9C3', color: '#CA8A04' }}>SDLRS READINESS</span>
                <h3>Kemandirian Belajar Mandiri</h3>
                <h4 className={styles.dominantResult}>{sdlrsLevel}</h4>
                <div className={styles.scoreGauge}>
                  <span>Skor Anda: <b>{sdlrsScore}</b> / 10</span>
                  <div className={styles.gaugeOuter}>
                    <div 
                      className={styles.gaugeInner} 
                      style={{ 
                        width: `${(sdlrsScore / 10) * 100}%`,
                        background: sdlrsScore >= 9 ? '#10B981' : sdlrsScore >= 6 ? '#F59E0B' : '#EF4444'
                      }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className={styles.resultsCTAs}>
              <button 
                onClick={handleSaveProfile} 
                className={styles.saveBtn}
                disabled={isLoading}
              >
                {isLoading ? 'Menyimpan di Browser...' : 'Simpan Profil & Buat Roadmap Sekarang'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              
              <button 
                onClick={() => setCurrentStep(0)} 
                className={styles.retakeBtn}
                disabled={isLoading}
              >
                Ulangi Diagnosis
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
