'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLearningProfile, saveRoadmap, type LearningProfile } from '@/lib/localLearning';
import styles from './skills.module.css';

interface GeneratedStep {
  title: string;
  description: string;
  source_url: string;
  source_type: string;
  step_order: number;
  learning_style_focus: string;
}

// Popular skills list
const PRESET_SKILLS = [
  {
    id: 'frontend',
    title: 'Frontend Web Development',
    subtitle: 'HTML, CSS, JavaScript, React & Next.js',
    icon: '💻',
    color: '#3B82F6',
    description: 'Rancang website yang interaktif, responsif, dan menakjubkan secara visual.'
  },
  {
    id: 'datascience',
    title: 'Python Data Science',
    subtitle: 'Numpy, Pandas, Visualisasi & Machine Learning',
    icon: '📊',
    color: '#10B981',
    description: 'Analisis data mentah dan ubah menjadi insight bisnis strategis dengan AI.'
  },
  {
    id: 'uiux',
    title: 'UI/UX Product Design',
    subtitle: 'Figma, Wireframing, Prototyping & User Research',
    icon: '🎨',
    color: '#8B5CF6',
    description: 'Buat desain aplikasi yang intuitif, ramah pengguna, dan estetik.'
  },
  {
    id: 'promptai',
    title: 'AI & Prompt Engineering',
    subtitle: 'LLM, Prompt Patterns, Vector DB & RAG',
    icon: '🤖',
    color: '#F59E0B',
    description: 'Kuasai rekayasa prompt dan integrasikan kecerdasan buatan dalam aplikasi.'
  },
  {
    id: 'mobiledev',
    title: 'Mobile App Development',
    subtitle: 'Flutter, React Native & Mobile UX',
    icon: '📱',
    color: '#EF4444',
    description: 'Bangun aplikasi lintas platform yang cepat untuk Android & iOS.'
  },
  {
    id: 'digitalmarketing',
    title: 'Digital Marketing & SEO',
    subtitle: 'Copywriting, Analytics & Content Strategy',
    icon: '🚀',
    color: '#EC4899',
    description: 'Kuasai strategi pertumbuhan trafik, optimasi mesin pencari, dan iklan.'
  }
];

interface CuratedTemplateStep {
  title: string;
  desc: string;
  sources: Record<'V' | 'A' | 'R' | 'K', string>;
  duration: string;
  type: string;
}

// Curated Roadmap Database (Adaptive templates mapped by VARK / Kolb / SDLRS)
const CURATED_TEMPLATES: Record<string, CuratedTemplateStep[]> = {
  frontend: [
    {
      title: 'Dasar HTML5 & Styling CSS3 Modern',
      desc: 'Pahami semantik struktur web dan rahasia desain responsif dengan Flexbox/CSS Grid.',
      sources: {
        V: 'https://www.youtube.com/watch?v=1PnVor36_40', // Visual: Video Tutorial
        A: 'https://www.youtube.com/watch?v=l1W2bRU-tU0', // Auditory: Podcast/Webinar
        R: 'https://developer.mozilla.org/id/docs/Learn/Getting_started_with_the_web', // Read/Write: MDN Docs
        K: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' // Kinesthetic: Hands-on Sandbox
      },
      duration: '4 Jam',
      type: 'Fundamental'
    },
    {
      title: 'JavaScript ES6+ & Manipulasi DOM',
      desc: 'Berikan kehidupan pada halaman statis Anda dengan logika interaktif dan event listener.',
      sources: {
        V: 'https://www.youtube.com/watch?v=wz6s1wV3PQA',
        A: 'https://www.youtube.com/watch?v=2md4XTOJtCs',
        R: 'https://javascript.info/',
        K: 'https://codepen.io/'
      },
      duration: '6 Jam',
      type: 'Logika Pemrograman'
    },
    {
      title: 'Komponen React.js & State Management',
      desc: 'Pelajari konsep virtual DOM, reusable components, hooks (useState, useEffect), dan props.',
      sources: {
        V: 'https://www.youtube.com/watch?v=hQAHJsMCw0s',
        A: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
        R: 'https://react.dev/learn',
        K: 'https://codesandbox.io/s/react-new'
      },
      duration: '8 Jam',
      type: 'Framework'
    },
    {
      title: 'Next.js 14 App Router & Deployment',
      desc: 'Optimalkan SEO, Server Components, API Routes, dan deploy projek React Anda ke Vercel.',
      sources: {
        V: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
        A: 'https://www.youtube.com/watch?v=TJ35b5Z2e5Q',
        R: 'https://nextjs.org/docs',
        K: 'https://vercel.com/'
      },
      duration: '10 Jam',
      type: 'Advanced & Production'
    }
  ],
  datascience: [
    {
      title: 'Dasar Pemrograman Python & Lingkungan Jupyter',
      desc: 'Pelajari sintaks dasar Python, tipe data, perulangan, dan setup Jupyter Notebook.',
      sources: {
        V: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        A: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
        R: 'https://docs.python.org/id/3/tutorial/index.html',
        K: 'https://replit.com/languages/python3'
      },
      duration: '5 Jam',
      type: 'Fundamental'
    },
    {
      title: 'Analisis Data Eksploratif dengan Pandas & Numpy',
      desc: 'Metode manipulasi dataset besar, data cleaning, menangani missing values, dan indexing data.',
      sources: {
        V: 'https://www.youtube.com/watch?v=GPVsHOtAn64',
        A: 'https://www.youtube.com/watch?v=vmEHCJofslg',
        R: 'https://pandas.pydata.org/docs/user_guide/index.html',
        K: 'https://colab.research.google.com/'
      },
      duration: '7 Jam',
      type: 'Data Wrangling'
    },
    {
      title: 'Visualisasi Data dengan Matplotlib & Seaborn',
      desc: 'Ubah angka baris spreadsheet menjadi plot visual, histogram, dan kustomisasi bagan analitis.',
      sources: {
        V: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
        A: 'https://www.youtube.com/watch?v=q7Bo_J8x_dw',
        R: 'https://seaborn.pydata.org/tutorial.html',
        K: 'https://kaggle.com/'
      },
      duration: '6 Jam',
      type: 'Visualisasi'
    },
    {
      title: 'Pengantar Machine Learning dengan Scikit-Learn',
      desc: 'Bangun model regresi linier, klasifikasi pohon keputusan, dan evaluasi akurasi model data.',
      sources: {
        V: 'https://www.youtube.com/watch?v=M9Itm95JzL0',
        A: 'https://www.youtube.com/watch?v=Gv9_4yM814A',
        R: 'https://scikit-learn.org/stable/user_guide.html',
        K: 'https://colab.research.google.com/notebooks/intro.ipynb'
      },
      duration: '10 Jam',
      type: 'Machine Learning'
    }
  ],
  uiux: [
    {
      title: 'Prinsip Dasar UI/UX & Design Thinking',
      desc: 'Pahami riset pengguna, empati, problem statement, ideasi, dan hukum-hukum UI/UX dasar.',
      sources: {
        V: 'https://www.youtube.com/watch?v=5CxXyG4S7S8',
        A: 'https://www.youtube.com/watch?v=c9aCgU78a50',
        R: 'https://www.nngroup.com/articles/design-thinking/',
        K: 'https://mural.co/'
      },
      duration: '4 Jam',
      type: 'Teori & Mindset'
    },
    {
      title: 'Wireframing & Arsitektur Informasi',
      desc: 'Belajar menstrukturkan konten aplikasi menggunakan sketsa kasar hitam-putih sebelum visualisasi.',
      sources: {
        V: 'https://www.youtube.com/watch?v=MYD2y09h188',
        A: 'https://www.youtube.com/watch?v=r0XJ2_Z2ZpE',
        R: 'https://www.uxpin.com/studio/blog/wireframing-guide/',
        K: 'https://figma.com/'
      },
      duration: '5 Jam',
      type: 'Struktur Desain'
    },
    {
      title: 'Desain Visual Resolusi Tinggi (Hi-Fi) di Figma',
      desc: 'Terapkan palet warna, tipografi, grid system, dan komponen interaktif bergaya modern.',
      sources: {
        V: 'https://www.youtube.com/watch?v=FTFaQW1ZgQs',
        A: 'https://www.youtube.com/watch?v=3qgH2fUvQWk',
        R: 'https://help.figma.com/hc/en-us/categories/360002051613-Figma-design',
        K: 'https://figma.com/'
      },
      duration: '8 Jam',
      type: 'Visual & Tools'
    },
    {
      title: 'User Testing & Prototyping Interaktif',
      desc: 'Hubungkan frame desain Anda dengan animasi transisi yang mulus dan lakukan uji coba ke pengguna.',
      sources: {
        V: 'https://www.youtube.com/watch?v=E2O6stc6wB4',
        A: 'https://www.youtube.com/watch?v=L9d7a22mZ9U',
        R: 'https://uxplanet.org/ux-prototyping-ultimate-guide-c57930800d9b',
        K: 'https://figma.com/'
      },
      duration: '7 Jam',
      type: 'Evaluasi & Iterasi'
    }
  ]
};

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [customSkill, setCustomSkill] = useState<string>('');
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  
  // Loading Terminal states
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);

  // Toast State
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProfile(getLearningProfile());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(skillId);
    setCustomSkill('');
  };

  const handleGenerateRoadmap = async () => {
    let skillTitle = '';
    let skillId = selectedSkill;

    if (customSkill.trim()) {
      skillTitle = customSkill.trim();
      skillId = 'custom';
    } else if (selectedSkill) {
      const preset = PRESET_SKILLS.find(s => s.id === selectedSkill);
      skillTitle = preset ? preset.title : selectedSkill;
    } else {
      showToast("Silakan pilih keahlian atau tulis kustom terlebih dahulu!", "error");
      return;
    }

    setIsGenerating(true);
    setGenStep(1);

    // Dynamic Loading Sequence (1.2 seconds per step for highly realistic AI generation feel)
    setTimeout(() => {
      setGenStep(2);
      setTimeout(() => {
        setGenStep(3);
        setTimeout(async () => {
          await generateAndSaveRoadmapData(skillId, skillTitle);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const generateAndSaveRoadmapData = async (skillId: string, skillTitle: string) => {
    // 1. Calculate Dominant VARK preference for source selection
    let dominantVarkKey: 'V' | 'A' | 'R' | 'K' = 'V';
    if (profile) {
      const { V, A, R, K } = profile.vark_scores;
      const maxVal = Math.max(V, A, R, K);
      if (V === maxVal) dominantVarkKey = 'V';
      else if (A === maxVal) dominantVarkKey = 'A';
      else if (R === maxVal) dominantVarkKey = 'R';
      else if (K === maxVal) dominantVarkKey = 'K';
    }

    // 2. Fetch or generate raw steps
    let rawSteps: GeneratedStep[] = [];
    if (skillId !== 'custom' && CURATED_TEMPLATES[skillId]) {
      rawSteps = CURATED_TEMPLATES[skillId].map((step, idx) => ({
        title: step.title,
        description: step.desc,
        source_url: step.sources[dominantVarkKey] || step.sources['V'],
        source_type: dominantVarkKey === 'V' ? 'Video' : dominantVarkKey === 'A' ? 'Video' : dominantVarkKey === 'R' ? 'Documentation' : 'Project',
        step_order: idx + 1,
        learning_style_focus: dominantVarkKey
      }));
    } else {
      // Generate highly high-fidelity Custom Roadmap steps based on VARK focus!
      rawSteps = [
        {
          title: `Pengenalan Dasar ${skillTitle}`,
          description: `Kuasi konsep fundamental awal, instalasi tools utama, dan arsitektur dasar dari ${skillTitle}.`,
          source_url: dominantVarkKey === 'V' ? 'https://www.youtube.com/' : 'https://medium.com/',
          source_type: dominantVarkKey === 'V' ? 'Video' : 'Article',
          step_order: 1,
          learning_style_focus: dominantVarkKey
        },
        {
          title: `Logika Praktik & Konsep Inti ${skillTitle}`,
          description: `Belajar sintaksis, struktur data, atau pola arsitektur penting untuk memecahkan studi kasus modular.`,
          source_url: dominantVarkKey === 'K' ? 'https://github.com/' : 'https://wikipedia.org/',
          source_type: dominantVarkKey === 'K' ? 'Project' : 'Documentation',
          step_order: 2,
          learning_style_focus: dominantVarkKey
        },
        {
          title: `Projek Mandiri & Implementasi Lapangan`,
          description: `Bangun sebuah aplikasi portofolio berskala kecil menengah dari awal dan terapkan prinsip adaptasi Kolb ${profile?.kolb_style || 'Converger'}.`,
          source_url: 'https://github.com/',
          source_type: 'Project',
          step_order: 3,
          learning_style_focus: dominantVarkKey
        }
      ];
    }

    // 3. Save roadmap
    const roadmapTitle = `Peta Belajar: ${skillTitle}`;
    const roadmapDesc = `Jalur belajar personal terstruktur yang disesuaikan dengan Gaya Belajar ${dominantVarkKey === 'V' ? 'Visual' : dominantVarkKey === 'A' ? 'Auditori' : dominantVarkKey === 'R' ? 'Tekstual' : 'Kinestetik'} Anda, Tipe Berpikir ${profile?.kolb_style || 'Converger'}, dan Kesiapan Mandiri (Skor SDLRS: ${profile?.sdlrs_score || '7'}/10).`;

    saveToLocalStorage(roadmapTitle, roadmapDesc, rawSteps);
    showToast("Peta belajar berhasil dibuat dan tersimpan di browser!", "success");

    // Redirect to Interactive Dashboard!
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  const saveToLocalStorage = (title: string, desc: string, steps: GeneratedStep[]) => {
    saveRoadmap({
      id: `local-${Date.now()}`,
      title,
      description: desc,
      steps: steps.map((step, index) => ({
        ...step,
        id: `step-${Date.now()}-${index + 1}`,
        is_completed: false,
      })),
    });
  };

  return (
    <div className={styles.container}>
      
      {/* Toast */}
      <div className={`${styles.toast} ${toast.show ? styles.toastActive : ''} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
        <span className={styles.toastMessage}>{toast.message}</span>
      </div>

      {/* Floating Home Link */}
      <Link href="/" className={styles.backHome}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Beranda</span>
      </Link>

      <div className={styles.cardWrapper}>

        {!isGenerating ? (
          <div className={styles.normalState}>
            <div className={styles.header}>
              <div className={styles.badge}>Langkah 2: Pilih Keahlian</div>
              <h1>Apa yang ingin kamu pelajari hari ini?</h1>
              <p>
                Pilih keahlian di bawah ini atau tuliskan secara spesifik. AI kami akan mengurasi materi belajar adaptif yang paling pas dengan gaya belajarmu.
              </p>
            </div>

            {/* Grid selector */}
            <div className={styles.skillsGrid}>
              {PRESET_SKILLS.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => handleSkillSelect(skill.id)}
                  className={`${styles.skillCard} ${selectedSkill === skill.id ? styles.skillSelected : ''}`}
                  style={{ '--accent-color': skill.color } as React.CSSProperties}
                >
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <div className={styles.skillContent}>
                    <h3>{skill.title}</h3>
                    <span className={styles.skillSubtitle}>{skill.subtitle}</span>
                    <p className={styles.skillDesc}>{skill.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Input block */}
            <div className={styles.customSkillSection}>
              <div className={styles.divider}>
                <span>ATAU TULIS SECARA KUSTOM</span>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Contoh: Belajar Golang Web API, Belajar Saham untuk Pemula, dll..."
                  value={customSkill}
                  onChange={(e) => {
                    setCustomSkill(e.target.value);
                    setSelectedSkill('');
                  }}
                  className={styles.customInput}
                />
              </div>
            </div>

            {/* Footer action button */}
            <div className={styles.footerAction}>
              <button onClick={handleGenerateRoadmap} className={styles.generateBtn}>
                Buat Peta Belajar AI Saya
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* GENERATING ROADMAP LOADING SEQUENCE */
          <div className={styles.generatingState}>
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>
            </div>
            
            <h2>Merespons Profil Belajarmu...</h2>
            <p className={styles.genSubtitle}>
              Kecerdasan Buatan kami sedang menganalisis database sumber belajar terbaik yang pas untukmu.
            </p>

            {/* Console Log Terminal */}
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.dotRed}></div>
                <div className={styles.dotYellow}></div>
                <div className={styles.dotGreen}></div>
                <span className={styles.terminalTitle}>ai-roadmap-generator.sh</span>
              </div>
              
              <div className={styles.terminalBody}>
                <div className={`${styles.logRow} ${genStep >= 1 ? styles.logActive : ''}`}>
                  <span className={styles.logGreen}>[OK]</span> Membaca hasil gaya belajar {profile?.vark_scores ? `Vark(V:${profile.vark_scores.V}, A:${profile.vark_scores.A}, R:${profile.vark_scores.R}, K:${profile.vark_scores.K})` : 'VARK'} dan Kolb ({profile?.kolb_style || 'Converger'}).
                </div>
                
                <div className={`${styles.logRow} ${genStep >= 2 ? styles.logActive : ''}`}>
                  <span className={styles.logBlue}>[CURATING]</span> Menyaring {customSkill ? `"${customSkill}"` : 'Keahlian Terpilih'} dari sumber belajar video, artikel tertulis, dan sandbox praktis...
                </div>

                <div className={`${styles.logRow} ${genStep >= 3 ? styles.logActive : ''}`}>
                  <span className={styles.logOrange}>[SAVING]</span> Merumuskan tips kognitif sesuai kesiapan mandiri SDLRS ({profile?.sdlrs_score || 7}/10) dan menyimpan roadmap di browser.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
