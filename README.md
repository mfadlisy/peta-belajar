# Peta Belajar

Peta Belajar adalah aplikasi Next.js local-first untuk membuat profil belajar, memilih skill, menyusun roadmap, dan melacak progress belajar langsung di browser pengguna.

## Struktur Workspace

```text
.
├── docs/                       # Dokumentasi tambahan proyek
├── public/                     # Aset statis yang langsung disajikan browser
├── src/
│   ├── app/                    # Route Next.js App Router
│   │   ├── assessment/         # Diagnosis profil belajar
│   │   ├── dashboard/          # Dashboard dan progress belajar
│   │   ├── skills/             # Pemilihan skill dan generator roadmap
│   │   ├── globals.css         # Style global
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── landing/            # Section khusus landing page
│   │   └── layout/             # Navbar, footer, dan shell UI reusable
│   └── lib/
│       └── storage/            # Helper localStorage dan tipe data lokal
├── AGENTS.md                   # Instruksi kerja untuk coding agent
├── CLAUDE.md                   # Entry point Claude
├── DESIGN.md                   # Prinsip desain dan arsitektur UI
└── GEMINI.md                   # Entry point Gemini
```

## Mode Data

Aplikasi ini tidak membutuhkan login, database, Supabase, atau API key untuk peluncuran pertama. Semua data personal disimpan di `localStorage` browser pengguna:

- `peta_belajar_profile`
- `peta_belajar_roadmap`

Konsekuensinya, data tidak tersinkron antar perangkat dan akan hilang jika pengguna menghapus data browser.

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build

```bash
npm run build
```

## Panduan Maintenance

- Baca `DESIGN.md` sebelum mengubah UI, warna, layout, atau flow pengguna.
- Baca `AGENTS.md` sebelum melakukan perubahan besar dengan bantuan AI.
- Simpan route publik hanya di `src/app`.
- Simpan komponen reusable di `src/components`.
- Simpan helper data/browser di `src/lib`.
