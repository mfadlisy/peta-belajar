'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  clearLocalLearningData,
  getRoadmap,
  saveRoadmap,
  type LocalRoadmap,
  type LocalRoadmapStep,
} from '@/lib/storage/localLearning';
import styles from './dashboard.module.css';

type RoadmapStep = LocalRoadmapStep;
type Roadmap = LocalRoadmap;

const sourceItems = [
  {
    id: 1,
    type: 'Video',
    platform: 'YouTube',
    title: 'UX Design Full Course for Beginners',
    duration: '1 jam 45 menit',
    description: 'Kursus lengkap UX Design dari dasar hingga praktik.',
    iconType: 'youtube',
    iconColor: '#FF0000',
    sourceUrl: 'https://www.youtube.com/watch?v=zHAa-likXXQ'
  },
  {
    id: 2,
    type: 'Artikel',
    platform: 'Nielsen Norman Group',
    title: '10 Usability Heuristics for User Interface Design',
    duration: '10 menit baca',
    description: 'Prinsip heuristik yang membantu evaluasi kebergunaan produk digital.',
    iconType: 'nng',
    iconColor: '#F25F22',
    sourceUrl: 'https://www.nngroup.com/articles/ten-usability-heuristics/'
  },
  {
    id: 3,
    type: 'Blog',
    platform: 'UX Collective',
    title: 'What is UX Design? A Comprehensive Guide for Beginners',
    duration: '8 menit baca',
    description: 'Panduan lengkap memahami UX Design dan perannya dalam produk digital.',
    iconType: 'uxc',
    iconColor: '#00A2E8',
    sourceUrl: 'https://uxdesign.cc/what-is-ux-design-a-comprehensive-guide-for-beginners-84d95b546a1e'
  },
  {
    id: 4,
    type: 'Artikel',
    platform: 'Interaction Design Foundation',
    title: 'The Basics of User Experience Design',
    duration: '6 menit baca',
    description: 'Pengantar mendalam tentang prinsip dasar UX Design.',
    iconType: 'idf',
    iconColor: '#2563EB',
    sourceUrl: 'https://www.interaction-design.org/literature/topics/ux-design'
  },
  {
    id: 5,
    type: 'Dokumentasi',
    platform: 'Material Design',
    title: 'Material Design – Introduction',
    duration: 'Dokumentasi',
    description: 'Panduan resmi Google tentang prinsip dan komponen Material Design.',
    iconType: 'material',
    iconColor: '#2563EB',
    sourceUrl: 'https://m3.material.io/'
  }
];

const sourceFilters = ['Semua', 'Video', 'Artikel', 'Blog', 'Dokumentasi'] as const;

export default function DashboardPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Custom sidebar active tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filter and bookmark state for sources
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<'Semua' | 'Video' | 'Artikel' | 'Blog' | 'Dokumentasi'>('Semua');
  const [bookmarkedSources, setBookmarkedSources] = useState<number[]>([1, 4]);

  // Modal states for click interactions
  const [activeStepDetailModal, setActiveStepDetailModal] = useState<RoadmapStep | null>(null);
  const [showAllSourcesModal, setShowAllSourcesModal] = useState(false);
  const [showAllTopicsModal, setShowAllTopicsModal] = useState(false);

  // Report & replace state
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [replacingTopic, setReplacingTopic] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const toggleBookmark = (id: number) => {
    if (bookmarkedSources.includes(id)) {
      setBookmarkedSources(bookmarkedSources.filter(item => item !== id));
      showToast("Sumber dihapus dari simpanan", "success");
    } else {
      setBookmarkedSources([...bookmarkedSources, id]);
      showToast("Sumber disimpan ke bookmark!", "success");
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  function getDefaultRoadmap(): Roadmap {
    return {
      id: 'mock',
      title: 'UI/UX Design Fundamentals',
      description: 'Roadmap personal adaptif yang melatih visual dan kecerdasan praktis.',
      steps: [
        {
          id: 'm1',
          title: 'Pengantar UI/UX Design',
          description: 'Memahami perbedaan UI dan UX serta peran seorang desainer.',
          source_url: 'https://www.youtube.com/watch?v=1PnVor36_40',
          source_type: 'Video',
          step_order: 1,
          is_completed: true,
          learning_style_focus: 'V'
        },
        {
          id: 'm2',
          title: 'Prinsip Desain Visual',
          description: 'Elemen visual yang membentuk desain yang efektif.',
          source_url: 'https://www.youtube.com/watch?v=wz6s1wV3PQA',
          source_type: 'Video',
          step_order: 2,
          is_completed: true,
          learning_style_focus: 'V'
        },
        {
          id: 'm3',
          title: 'Warna, Tipografi, dan Grid',
          description: 'Prinsip layouting, warna kontras, serta hierarki tipografi.',
          source_url: 'https://medium.com',
          source_type: 'Artikel',
          step_order: 3,
          is_completed: true,
          learning_style_focus: 'R'
        },
        {
          id: 'm4',
          title: 'Komponen UI Dasar',
          description: 'Pengenalan tombol, input field, card, dan komponen dasar lainnya.',
          source_url: 'https://www.youtube.com',
          source_type: 'Video',
          step_order: 4,
          is_completed: true,
          learning_style_focus: 'V'
        },
        {
          id: 'm5',
          title: 'User Flow Dasar',
          description: 'Merancang alur pengguna dari masuk aplikasi hingga selesai.',
          source_url: 'https://medium.com',
          source_type: 'Artikel',
          step_order: 5,
          is_completed: true,
          learning_style_focus: 'R'
        },
        {
          id: 'm6',
          title: 'Wireframing Dasar',
          description: 'Membuat sketsa struktur untuk antarmuka pengguna.',
          source_url: 'https://developer.mozilla.org',
          source_type: 'Artikel',
          step_order: 6,
          is_completed: false,
          learning_style_focus: 'R'
        },
        {
          id: 'm7',
          title: 'Prototyping Interaktif',
          description: 'Membuat prototype yang bisa diuji pengguna.',
          source_url: 'https://www.youtube.com',
          source_type: 'Video',
          step_order: 7,
          is_completed: false,
          learning_style_focus: 'K'
        },
        {
          id: 'm8',
          title: 'User Research Dasar',
          description: 'Memahami pengguna untuk mendesain solusi yang tepat.',
          source_url: 'https://medium.com',
          source_type: 'Artikel',
          step_order: 8,
          is_completed: false,
          learning_style_focus: 'R'
        },
        {
          id: 'm9',
          title: 'UI/UX Case Study',
          description: 'Menyusun portfolio studi kasus dari awal hingga akhir.',
          source_url: 'https://medium.com',
          source_type: 'Artikel',
          step_order: 9,
          is_completed: false,
          learning_style_focus: 'R'
        }
      ]
    };
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setRoadmap(getRoadmap() || getDefaultRoadmap());
      setIsLoading(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, []);

  // Toggle step complete
  const handleToggleComplete = (stepId: string, currentStatus: boolean) => {
    if (!roadmap) return;

    // 1. Update UI optimistically
    const updatedSteps = roadmap.steps.map(step => {
      if (step.id === stepId) {
        return { ...step, is_completed: !currentStatus };
      }
      return step;
    });

    const nextRoadmap = {
      ...roadmap,
      steps: updatedSteps
    };

    setRoadmap(nextRoadmap);
    saveRoadmap(nextRoadmap);
    const newStatus = !currentStatus;
    showToast(newStatus ? "Langkah selesai! Bagus sekali 🎉" : "Langkah ditandai belum selesai.", "success");
  };

  const getProgressPercentage = () => {
    if (!roadmap || roadmap.steps.length === 0) return 0;
    const completedCount = roadmap.steps.filter(s => s.is_completed).length;
    return Math.round((completedCount / roadmap.steps.length) * 100);
  };

  // Determine active, completed, and locked steps to render identically to screenshot
  const getStepStatus = (step: RoadmapStep, index: number, steps: RoadmapStep[]) => {
    if (step.is_completed) return 'completed';
    // The first uncompleted step is 'active'
    const firstUncompletedIndex = steps.findIndex(s => !s.is_completed);
    if (index === firstUncompletedIndex) return 'active';
    if (index > firstUncompletedIndex) return 'locked';
    return 'locked';
  };

  // Find currently active step
  const getActiveStep = () => {
    if (!roadmap) return null;
    const firstUncompleted = roadmap.steps.find(s => !s.is_completed);
    return firstUncompleted || roadmap.steps[roadmap.steps.length - 1] || null;
  };

  // User Profile Properties
  const getUserName = () => {
    return 'Pembelajar';
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Membuka Dashboard Belajar Personal...</p>
      </div>
    );
  }

  const activeStepItem = getActiveStep();
  const filteredSources = selectedSourceFilter === 'Semua'
    ? sourceItems
    : sourceItems.filter(item => item.type === selectedSourceFilter);

  return (
    <div className={styles.dashboardContainer}>

      {/* Toast Notification */}
      <div className={`${styles.toast} ${toast.show ? styles.toastActive : ''} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
        <span className={styles.toastMessage}>{toast.message}</span>
      </div>

      {/* Side Navigation Menu */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Peta Belajar Logo" className={styles.logoImg} />
          <span>Peta Belajar</span>
        </div>

        <nav className={styles.navMenu}>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${styles.navLink} ${activeTab === 'dashboard' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className={styles.navText}>Beranda</span>
          </button>

          <Link href="/skills" className={styles.navLink}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M18 6H6a3 3 0 0 0 0 6h12a3 3 0 0 1 0 6H6" />
              <circle cx="18" cy="6" r="2" fill="none" stroke="currentColor" />
              <circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" />
            </svg>
            <span className={styles.navText}>Roadmap</span>
          </Link>

          <button
            onClick={() => {
              setActiveTab('materi');
              showToast("Membuka Koleksi Materi...", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'materi' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className={styles.navText}>Koleksi Materi</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('kuis');
              showToast("Peta Belajar: Kuis & Latihan akan dimuat!", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'kuis' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className={styles.navText}>Kuis & Latihan</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('catatan');
              showToast("Fitur Catatan Personal terbuka!", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'catatan' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
            </svg>
            <span className={styles.navText}>Catatan</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('progress');
              showToast("Akses grafik perkembangan Anda.", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'progress' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span className={styles.navText}>Progress</span>
          </button>

          <div className={styles.sidebarDivider}></div>

          <button
            onClick={() => {
              setActiveTab('profile');
              showToast("Membuka Profil Anda...", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'profile' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className={styles.navText}>Profil</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('pengaturan');
              showToast("Membuka Pengaturan...", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'pengaturan' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span className={styles.navText}>Pengaturan</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('bantuan');
              showToast("Membuka Bantuan...", "success");
            }}
            className={`${styles.navLink} ${activeTab === 'bantuan' ? styles.navActive : ''}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.navIcon}>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className={styles.navText}>Bantuan</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            onClick={() => {
              clearLocalLearningData();
              window.location.href = '/';
            }}
            className={styles.logoutBtn}
          >
            Reset Data Lokal
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className={styles.workspace}>

        {/* Top Header Profile Nav Bar */}
        <header className={styles.topbar}>
          <div className={styles.topNavActions}>
            {/* Profile Section */}
            <div className={styles.profileSection}>
              <div className={styles.profileAvatarIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={styles.profileMeta}>
                <span className={styles.userName}>{getUserName()}</span>
                <span className={styles.userLevel}>Pemula</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Columns split into Left/Main Panel and Right Timeline Panel */}
        <div className={styles.columnsWrapper}>

          {/* MIDDLE COLUMN (Left Panel) */}
          <main className={styles.mainPanel}>

            {/* 1. HERO BANNER CARD */}
            <section className={styles.heroCard}>
              <div className={styles.heroContent}>
                <span className={styles.heroGreeting}>Halo, {getUserName()}! 👋</span>
                <h2>Siap melanjutkan perjalanan belajarmu?</h2>
                <p>Belajar terarah, relevan, dan sesuai gaya belajarmu.</p>

                <div className={styles.resumeSubcard}>
                  <span className={styles.resumeTitle}>Lanjutkan Belajarmu</span>
                  <h3>{activeStepItem?.title || "UI/UX Design Fundamentals"}</h3>

                  <div className={styles.progressRow}>
                    <div className={styles.progressBarWrapper}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${activeStepItem ? getProgressPercentage() : 72}%` }}
                      ></div>
                    </div>
                    <span className={styles.progressPercent}>{activeStepItem ? getProgressPercentage() : 72}%</span>
                  </div>

                  <div className={styles.resumeButtons}>
                    <a
                      href={activeStepItem?.source_url || "/skills"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resumePlayBtn}
                      onClick={() => showToast(`Membuka: ${activeStepItem?.title || "Materi"}`, 'success')}
                    >
                      Lanjutkan Belajar
                    </a>
                    <button
                      className={styles.resumeDetailBtn}
                      onClick={() => activeStepItem && setActiveStepDetailModal(activeStepItem)}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>

              {/* Beautiful hiker visual */}
              <div className={styles.heroIllustration}>
                <img src="/image-dashboard.png" alt="Student hiker on winding path" className={styles.hikerImg} />
              </div>
            </section>

            {/* 2. RINGKASAN PERKEMBANGAN */}
            <section className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <div>
                  <h3>Ringkasan Perkembangan</h3>
                  <span className={styles.sectionSubtitle}>Topik: {roadmap?.title || "UI/UX Design Fundamentals"}</span>
                </div>
                <button
                  onClick={() => setShowAllTopicsModal(true)}
                  className={styles.seeAllLink}
                >
                  Lihat semua topik ❯
                </button>
              </div>

              <div className={styles.statsGrid}>
                {/* Progres Topik */}
                <div className={styles.statCard}>
                  <div className={styles.circularProgress}>
                    <svg viewBox="0 0 36 36" className={styles.circularChart}>
                      <path className={styles.circleBg}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path className={styles.circle}
                        strokeDasharray={`${roadmap ? Math.round((roadmap.steps.filter(s => s.is_completed).length / roadmap.steps.length) * 100) : 72}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className={styles.percentage}>
                        {roadmap ? Math.round((roadmap.steps.filter(s => s.is_completed).length / roadmap.steps.length) * 100) : 72}%
                      </text>
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Progres Topik</span>
                    <span className={styles.statValBig}>Selesai</span>
                    <span className={styles.statSubLabel}>
                      {roadmap ? `${roadmap.steps.filter(s => s.is_completed).length} / ${roadmap.steps.length}` : '7 / 9'} modul
                    </span>
                  </div>
                </div>

                {/* Topik Berikutnya */}
                <div className={styles.statCard}>
                  <div className={styles.iconSuitcaseWrapper}>
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Topik Berikutnya</span>
                    <span className={styles.statValBig}>
                      {activeStepItem?.title || "Selesai Semua!"}
                    </span>
                    <span className={styles.statSubLabel}>
                      {activeStepItem ? `Lanjutkan dari modul ${roadmap ? roadmap.steps.indexOf(activeStepItem) + 1 : 6}` : "Selamat belajar!"}
                    </span>
                  </div>
                </div>

                {/* Estimasi Selesai */}
                <div className={styles.statCard}>
                  <div className={styles.iconClockWrapper}>
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Estimasi Selesai</span>
                    <span className={styles.statValBigNum}>2 hari lagi</span>
                    <span className={styles.statSubLabel}>Jika belajar konsisten</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. PROGRESS MODUL */}
            <section className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h3>Progress Modul</h3>
              </div>

              <div className={styles.modulesContainerCard}>
                {roadmap?.steps.map((step, idx) => {
                  const status = getStepStatus(step, idx, roadmap.steps);
                  return (
                    <div
                      key={step.id}
                      className={`${styles.moduleItemRow} ${status !== 'locked' ? styles.clickableRow : styles.lockedRow}`}
                      onClick={() => {
                        if (status !== 'locked') {
                          setShowReportForm(false);
                          setReportReason('');
                          setReportSubmitted(false);
                          setActiveStepDetailModal(step);
                        } else {
                          showToast("Modul ini terkunci! Selesaikan modul sebelumnya terlebih dahulu.", "error");
                        }
                      }}
                    >
                      {/* Left: Number and Title/Duration */}
                      <div className={styles.moduleLeftSec}>
                        <div className={styles.moduleNumBadge}>
                          {idx + 1}
                        </div>
                        <div className={styles.moduleMetaCol}>
                          <h4 className={styles.moduleItemTitle}>{step.title}</h4>
                          <span className={styles.moduleItemDuration}>
                            {step.source_type === 'Video' ? (
                              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" className={styles.metaIcon}>
                                <path d="M23 7l-7 5 7 5V7z" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" className={styles.metaIcon}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            )}
                            {step.source_type} • {15 + idx * 3} menit
                          </span>
                        </div>
                      </div>

                      {/* Right: Status Pill/Label & Action */}
                      <div className={styles.moduleStatusCol}>
                        {status === 'completed' ? (
                          <div
                            className={styles.statusLabelSelesai}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(step.id, step.is_completed);
                            }}
                          >
                            <span>Selesai</span>
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" className={styles.checkIcon}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        ) : status === 'active' ? (
                          <div className={styles.activeStatusGroup}>
                            <span className={styles.statusTextAktif}>Sedang dipelajari</span>
                            <button
                              className={styles.btnSudahSelesai}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleComplete(step.id, step.is_completed);
                              }}
                            >
                              Sudah Selesai
                            </button>
                          </div>
                        ) : (
                          <div
                            className={styles.statusLabelTerkunci}
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast("Modul ini terkunci! Harap selesaikan unit sebelumnya.", "error");
                            }}
                          >
                            <span>Terkunci</span>
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" className={styles.lockIcon}>
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </main>

          {/* RIGHT COLUMN (Sumber Belajar Sidebar) */}
          <aside className={styles.rightSidebar}>
            <div className={styles.sumberPanel}>
              <div className={styles.sumberHeader}>
                <h3>Sumber Belajarmu</h3>
                <p>Kumpulan sumber terbaik untuk mendukung belajarmu.</p>
              </div>

              {/* Filter Tabs */}
              <div className={styles.filterTabs}>
                {sourceFilters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSourceFilter(cat)}
                    className={`${styles.filterPill} ${selectedSourceFilter === cat ? styles.filterPillActive : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sources Scroll Area */}
              <div className={styles.sumberScrollArea}>
                {filteredSources.map((item) => {
                  const isBookmarked = bookmarkedSources.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={styles.sumberCard}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest(`.${styles.bookmarkBtn}`)) {
                          return;
                        }
                        window.open(item.sourceUrl, '_blank');
                        showToast(`Membuka sumber: ${item.title}`, 'success');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Left Logo / Icon */}
                      <div className={styles.sumberIconCol}>
                        {item.iconType === 'youtube' && (
                          <div className={styles.iconYoutube}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </div>
                        )}
                        {item.iconType === 'nng' && (
                          <div className={styles.iconNNG}>
                            <span>NN/g</span>
                          </div>
                        )}
                        {item.iconType === 'uxc' && (
                          <div className={styles.iconUXC}>
                            <span>UX</span>
                          </div>
                        )}
                        {item.iconType === 'idf' && (
                          <div className={styles.iconIDF}>
                            <span>W</span>
                          </div>
                        )}
                        {item.iconType === 'material' && (
                          <div className={styles.iconMaterial}>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="16" y1="13" x2="8" y2="13" />
                              <line x1="16" y1="17" x2="8" y2="17" />
                              <polyline points="10 9 9 9 8 9" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className={styles.sumberInfoCol}>
                        <div className={styles.sumberMeta}>
                          {item.type} • {item.platform}
                        </div>
                        <h4 className={styles.sumberTitle}>{item.title}</h4>
                        <div className={styles.sumberDuration}>{item.duration}</div>
                        <p className={styles.sumberDesc}>{item.description}</p>
                      </div>

                      {/* Bookmark button */}
                      <button
                        className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarkActive : ''}`}
                        onClick={() => toggleBookmark(item.id)}
                        aria-label="Simpan sumber"
                      >
                        {isBookmarked ? (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Footer Button */}
              <div className={styles.sumberFooter}>
                <button
                  onClick={() => setShowAllSourcesModal(true)}
                  className={styles.sumberSeeAllBtn}
                >
                  Lihat semua sumber
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>

        </div>

      </div>

      {/* MODAL WINDOWS FOR USER INTERACTIONS */}
      {activeStepDetailModal && (
        <div className={styles.modalOverlay} onClick={() => { setActiveStepDetailModal(null); setShowReportForm(false); setReportSubmitted(false); }}>
          <div className={styles.modalCardRich} onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className={styles.richModalHeader}>
              <div className={styles.modalHeaderLeft}>
                <div className={styles.modalMetaLabel}>
                  <span className={styles.modalBadgeType}>{activeStepDetailModal.source_type}</span>
                  <span className={styles.modalBadgeVark}>
                    {activeStepDetailModal.learning_style_focus === 'V' ? '👁 Visual' :
                      activeStepDetailModal.learning_style_focus === 'A' ? '🎧 Auditori' :
                        activeStepDetailModal.learning_style_focus === 'R' ? '📖 Baca/Tulis' :
                          activeStepDetailModal.learning_style_focus === 'K' ? '🖐 Kinestetik' :
                            `VARK: ${activeStepDetailModal.learning_style_focus}`}
                  </span>
                  <span className={`${styles.modalBadgeStatus} ${activeStepDetailModal.is_completed ? styles.badgeDone : styles.badgeActive}`}>
                    {activeStepDetailModal.is_completed ? '✓ Selesai' : '▶ Aktif'}
                  </span>
                </div>
                <h3>{activeStepDetailModal.title}</h3>
              </div>
              <button className={styles.closeModalBtn} onClick={() => { setActiveStepDetailModal(null); setShowReportForm(false); setReportSubmitted(false); }}>×</button>
            </div>

            {/* Modal Scrollable Body */}
            <div className={styles.richModalBody}>

              {/* SECTION 1 — Materi ini tentang apa? */}
              <div className={styles.detailSection}>
                <div className={styles.detailSectionIcon}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                </div>
                <div className={styles.detailSectionContent}>
                  <h4>Materi ini tentang apa?</h4>
                  <p>{activeStepDetailModal.description}</p>
                </div>
              </div>

              {/* SECTION 2 — Yang akan dibahas */}
              <div className={styles.detailSection}>
                <div className={styles.detailSectionIcon} style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                </div>
                <div className={styles.detailSectionContent}>
                  <h4>Yang akan kamu pelajari</h4>
                  <ul className={styles.topicBulletList}>
                    {activeStepDetailModal.source_type === 'Video' ? (
                      <>
                        <li>Konsep inti dari {activeStepDetailModal.title}</li>
                        <li>Demonstrasi langkah demi langkah secara visual</li>
                        <li>Contoh penerapan nyata dalam konteks desain</li>
                      </>
                    ) : (
                      <>
                        <li>Definisi dan konteks dari {activeStepDetailModal.title}</li>
                        <li>Framework dan pendekatan yang relevan</li>
                        <li>Studi kasus dan best practices industri</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* SECTION 3 — Kenapa harus belajar ini */}
              <div className={styles.detailSection}>
                <div className={styles.detailSectionIcon} style={{ background: '#FFF7ED', color: '#EA580C' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </div>
                <div className={styles.detailSectionContent}>
                  <h4>Kenapa kamu perlu mempelajari ini?</h4>
                  <p className={styles.whyText}>
                    Materi ini dipilih AI secara personal berdasarkan profil belajarmu (gaya <strong>{activeStepDetailModal.learning_style_focus === 'V' ? 'Visual' : activeStepDetailModal.learning_style_focus === 'R' ? 'Baca/Tulis' : activeStepDetailModal.learning_style_focus === 'K' ? 'Kinestetik' : 'Auditori'}</strong>). Menguasai <em>{activeStepDetailModal.title}</em> adalah fondasi penting sebelum melanjutkan ke modul berikutnya dalam roadmap UI/UX Design-mu.
                  </p>
                </div>
              </div>

              {/* SECTION 4 — Info cepat */}
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}>
                  <span className={styles.infoLabel}>Tipe Sumber</span>
                  <span className={styles.infoValue}>{activeStepDetailModal.source_type}</span>
                </div>
                <div className={styles.modalInfoItem}>
                  <span className={styles.infoLabel}>Estimasi Waktu</span>
                  <span className={styles.infoValue}>~20 menit</span>
                </div>
                <div className={styles.modalInfoItem}>
                  <span className={styles.infoLabel}>Gaya Belajar</span>
                  <span className={styles.infoValue}>{activeStepDetailModal.learning_style_focus}</span>
                </div>
                <div className={styles.modalInfoItem}>
                  <span className={styles.infoLabel}>Status</span>
                  <span className={styles.infoValue}>{activeStepDetailModal.is_completed ? 'Selesai ✓' : 'Belum Selesai'}</span>
                </div>
              </div>

              {/* SECTION 5 — Laporkan Masalah */}
              <div className={styles.reportBox}>
                {!showReportForm && !reportSubmitted && (
                  <button
                    className={styles.reportTriggerBtn}
                    onClick={() => setShowReportForm(true)}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    Sumber bermasalah atau tidak sesuai?
                  </button>
                )}

                {showReportForm && !reportSubmitted && (
                  <div className={styles.reportForm}>
                    <p className={styles.reportTitle}>
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" style={{ marginRight: '6px' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                      Laporkan Masalah Sumber
                    </p>
                    <select
                      className={styles.reportSelect}
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                    >
                      <option value="">Pilih alasan masalah...</option>
                      <option value="link_rusak">🔗 Link tidak bisa dibuka / rusak</option>
                      <option value="konten_tidak_sesuai">❌ Konten tidak sesuai dengan judul</option>
                      <option value="terlalu_sulit">📈 Terlalu sulit untuk level saya saat ini</option>
                      <option value="terlalu_mudah">📉 Terlalu mudah / sudah saya ketahui</option>
                      <option value="bahasa_asing">🌐 Konten dalam bahasa yang tidak saya kuasai</option>
                      <option value="lainnya">💬 Alasan lainnya</option>
                    </select>
                    <div className={styles.reportActions}>
                      <button
                        className={styles.reportCancelBtn}
                        onClick={() => { setShowReportForm(false); setReportReason(''); }}
                      >
                        Batal
                      </button>
                      <button
                        className={`${styles.reportSubmitBtn} ${!reportReason ? styles.reportSubmitDisabled : ''}`}
                        disabled={!reportReason}
                        onClick={() => {
                          if (!reportReason) return;
                          setReportSubmitted(true);
                          setShowReportForm(false);
                          showToast('Laporan terkirim! AI sedang mencari sumber pengganti.', 'success');
                        }}
                      >
                        Kirim Laporan
                      </button>
                    </div>
                  </div>
                )}

                {reportSubmitted && (
                  <div className={styles.reportSuccess}>
                    <div className={styles.reportSuccessIcon}>✓</div>
                    <div>
                      <p className={styles.reportSuccessTitle}>Laporan diterima!</p>
                      <p className={styles.reportSuccessDesc}>Terima kasih. AI akan merekomendasikan sumber yang lebih sesuai.</p>
                    </div>
                    <button
                      className={styles.replaceTopicBtn}
                      onClick={() => {
                        setReplacingTopic(true);
                        setTimeout(() => {
                          setReplacingTopic(false);
                          setReportSubmitted(false);
                          showToast(`Topik "${activeStepDetailModal.title}" telah diganti dengan sumber baru!`, 'success');
                          setActiveStepDetailModal(null);
                        }, 1800);
                      }}
                    >
                      {replacingTopic ? (
                        <span className={styles.replacingSpinner}>⟳ Mengganti...</span>
                      ) : (
                        '🔄 Ganti Topik Sekarang'
                      )}
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className={styles.richModalFooter}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => { setActiveStepDetailModal(null); setShowReportForm(false); setReportSubmitted(false); }}
              >
                Tutup
              </button>
              <a
                href={activeStepDetailModal.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalActionBtn}
                onClick={() => {
                  showToast(`Membuka: ${activeStepDetailModal.title}`, 'success');
                  setActiveStepDetailModal(null);
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginRight: '6px' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Mulai Belajar
              </a>
            </div>

          </div>
        </div>
      )}

      {showAllSourcesModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAllSourcesModal(false)}>
          <div className={styles.modalCardLarge} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Semua Sumber Belajar</h3>
                <p className={styles.modalSub}>Daftar lengkap rekomendasi bahan referensi pilihan</p>
              </div>
              <button className={styles.closeModalBtn} onClick={() => setShowAllSourcesModal(false)}>×</button>
            </div>
            <div className={styles.modalBodyScroll}>
              <div className={styles.modalSourcesGrid}>
                {sourceItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalSourceLinkCard}
                    onClick={() => {
                      showToast(`Membuka: ${item.title}`, 'success');
                      setShowAllSourcesModal(false);
                    }}
                  >
                    <div className={styles.modalSourceLeft}>
                      <span className={styles.modalSourceType}>{item.type} • {item.platform}</span>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <span className={styles.modalSourceGo}>Mulai ↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setShowAllSourcesModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllTopicsModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAllTopicsModal(false)}>
          <div className={styles.modalCardLarge} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Semua Unit & Topik Belajar</h3>
                <p className={styles.modalSub}>Siklus kurikulum adaptif: {roadmap?.title}</p>
              </div>
              <button className={styles.closeModalBtn} onClick={() => setShowAllTopicsModal(false)}>×</button>
            </div>
            <div className={styles.modalBodyScroll}>
              <div className={styles.modalTopicsList}>
                {roadmap?.steps.map((step, index) => (
                  <div key={step.id} className={styles.modalTopicRow}>
                    <span className={styles.topicIndex}>{index + 1}</span>
                    <div className={styles.topicMain}>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                    <span className={`${styles.topicStatusPill} ${step.is_completed ? styles.statusSelesai : styles.statusPending}`}>
                      {step.is_completed ? "Selesai" : "Belum Selesai"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.modalCancelBtn}
                onClick={() => setShowAllTopicsModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
