# CS8-Kemjar-SQL-Injection

Case Study Modul 8: SQL Injection Challenge untuk praktikum Keamanan Jaringan (Kemjar) Netlab DTE FTUI.

## Arsitektur

- **Backend**: Node.js & Express 5 (port 3000)
  - `app.js`: Entry point
  - `db.js`: PostgreSQL connection pool (`pg` lokal / Neon serverless)
  - `routes/`: `userRoutes.js`, `flagRoutes.js`
  - `controllers/`: `userController.js`, `flagController.js`
  - `models/`: `userModels.js` (memuat celah SQLi), `flagModels.js` (validasi flag)
- **Frontend**: React 19 + Vite + Tailwind CSS (port 5173) di folder `frontend-kemjar8/`

## Database Setup

1. Siapkan database PostgreSQL (lokal atau Neon).
2. Buat file `.env` di root direktori:
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=development
   ```
3. Jalankan script `insert.sql` pada database:
   - Membuat tabel `users` dan `flags`.
   - Mengisi data 92 mahasiswa praktikan.
   - Mengisi data flag unik untuk setiap mahasiswa.
4. Kunci jawaban dan mapping flag tersedia di `kunci_jawaban_flags.csv`.

## Menjalankan Aplikasi

### Backend
```bash
npm install
npm run start
```

### Frontend
```bash
cd frontend-kemjar8
npm install
npm run dev
```
