import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className="container">

        <div className={styles.heroTop}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <img src="/icons-ai.svg" alt="AI Icon" width={20} height={20} />Roadmap Belajar Adaptif Berbasis AI
            </div>

            <h1 className={styles.title}>
              Belajar Lebih Terarah,<br />
              Capai Tujuan Cepat.
            </h1>

            <p className={styles.description}>
              Peta Belajar membantu kamu menemukan jalur dan sumber belajar yang personal,terstruktur dan adaptif sesuai gaya belajar dan tujuanmu.
            </p>

            <Link href="/assessment" className={styles.btnContainer} style={{ textDecoration: 'none' }}>
              <span className={styles.btnText}>Buat Roadmap belajar sekarang!</span>
              <div className={styles.btnAction}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>

            <div className={styles.caption}>
              <img src="/icon-info.svg" alt="Info Icon" width={20} height={20} />
              <p>Peta belajar baru saja diluncurkan, Yuk jadi salah satu orang pertama yang mencoba!</p>
            </div>
          </div>

          <div className={styles.imageBox}>
            <Image
              src="/hero-image.png"
              alt="Ilustrasi Hero Peta Belajar"
              width={700}
              height={700}
              className={styles.heroImage}
              priority
            />

            {/* Floating Card 1: Materi Belajar Pilihan */}
            <div className={`${styles.floatingCard} ${styles.cardMateri}`}>
              <div className={`${styles.cardIcon} ${styles.purple}`}>
                <img src="/icon-materi.svg" alt="Materi" width={24} height={24} />
              </div>
              <div className={styles.cardText}>
                <h4>Materi Belajar Pilihan</h4>
                <p>Sumber belajar telah terkurasi</p>
              </div>
            </div>

            {/* Floating Card 2: Capai Tujuanmu */}
            <div className={`${styles.floatingCard} ${styles.cardTujuan}`}>
              <div className={`${styles.cardIcon} ${styles.orange}`}>
                <img src="/icon-goal.svg" alt="Goal" width={24} height={24} />
              </div>
              <div className={styles.cardText}>
                <h4>Capai Tujuanmu</h4>
                <p>Segera miliki skill impianmu</p>
              </div>
            </div>

            {/* Floating Card 3: Adaptif & Dinamis */}
            <div className={`${styles.floatingCard} ${styles.cardAdaptif}`}>
              <div className={`${styles.cardIcon} ${styles.blue}`}>
                <img src="/icon-adaptif.svg" alt="Adaptif" width={24} height={24} />
              </div>
              <div className={styles.cardText}>
                <h4>Adaptif &amp; Dinamis</h4>
                <p>Update sesuai progressmu</p>
              </div>
            </div>

            {/* Floating Card 4: Menyesuaikan Tipe Belajar (VARK) */}
            <div className={`${styles.floatingCard} ${styles.cardVARK}`}>
              <div className={styles.cardText}>
                <h4>Menyesuaikan Tipe Belajar</h4>
              </div>
              <div className={styles.varkIcons}>
                <div className={`${styles.varkIcon} ${styles.varkBlue}`}>
                  <img src="/icon-task.svg" alt="Task" width={20} height={20} />
                </div>
                <div className={`${styles.varkIcon} ${styles.varkGreen}`}>
                  <img src="/icon-pencil.svg" alt="Pencil" width={20} height={20} />
                </div>
                <div className={`${styles.varkIcon} ${styles.varkYellow}`}>
                  <img src="/icon-eye.svg" alt="Eye" width={20} height={20} />
                </div>
                <div className={`${styles.varkIcon} ${styles.varkPurple}`}>
                  <img src="/icon-sound.svg" alt="Sound" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
