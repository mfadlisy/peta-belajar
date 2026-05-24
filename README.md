# Peta Belajar

Peta Belajar adalah aplikasi Next.js local-first untuk membuat profil belajar, memilih skill, menyusun roadmap, dan melacak progress belajar langsung di browser pengguna.

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
