# 🌊 RiverWatch — Pantau Sungai Indonesia

**RiverWatch** adalah platform web berbasis komunitas untuk memantau, melaporkan, dan meningkatkan kesadaran tentang kondisi sungai-sungai di seluruh Indonesia. Website ini dibangun menggunakan HTML, CSS, dan JavaScript murni (vanilla), tanpa framework backend — cocok dijalankan langsung di browser tanpa perlu server khusus.

---

## 👤 Tentang Proyek

| Info | Detail |
|---|---|
| Nama Proyek | RiverWatch — Pantau Sungai Indonesia |
| Pembuat | I Komang Hendra Ardi Pratama |
| Versi | System v2.0 // 2026 |
| Bahasa | Indonesia |
| Teknologi | HTML5, CSS3, JavaScript (Vanilla) |

---

## 📁 Struktur Folder

```
WEBDESAIN_BERSATU_KITA_TEGUH_IKOMANGHENDRAARDIPRATAMA/
│
├── index.html              # Halaman utama / Beranda
├── map.html                # Peta sungai interaktif
├── dashboard.html          # Dashboard pemantauan data
├── report.html             # Form laporan kondisi sungai
├── education.html          # Pusat edukasi lingkungan
├── community.html          # Halaman komunitas & leaderboard
│
├── components/
│   ├── common/
│   │   └── login.html      # Halaman registrasi / login
│   └── layout/
│       ├── navbar.html     # Komponen navigasi atas
│       └── footer.html     # Komponen footer
│
├── css/
│   ├── style.css           # Styling halaman utama
│   ├── map.css             # Styling halaman peta
│   ├── dashboard.css       # Styling dashboard & sidebar
│   ├── report.css          # Styling form laporan
│   ├── education.css       # Styling halaman edukasi
│   ├── community.css       # Styling halaman komunitas
│   └── components/
│       ├── global.css      # Variabel & reset global
│       ├── navbar.css      # Styling navbar
│       ├── footer.css      # Styling footer
│       ├── splashscreen.css
│       ├── infinitescrol.css
│       └── mobilenavbar.css
│
├── js/
│   ├── main.js             # Logic utama halaman beranda
│   ├── map.js              # Logic peta Leaflet
│   ├── dashboard.js        # Logic chart & statistik dashboard
│   ├── report.js           # Logic form laporan multi-step
│   ├── education.js        # Logic konten edukasi & quiz
│   ├── community.js        # Logic leaderboard & event
│   ├── fakedata.js         # Data simulasi (laporan, counter, feed)
│   ├── script.js           # Typing animation & counter hero
│   ├── splashscreen.js     # Animasi splash screen pembuka
│   ├── loadNavbar.js       # Loader navbar dinamis
│   └── footer.js           # Loader footer dinamis
│
└── assets/
    ├── icons/              # Ikon-ikon UI (trophy, map, riverwatch, dll)
    └── images/             # Foto sungai, logo mitra, galeri before-after
```

---

## 🚀 Cara Menjalankan Website

Website ini adalah proyek statis murni, jadi tidak butuh instalasi apapun. Ada dua cara untuk membukanya:

### Cara 1 — Langsung buka file (paling mudah)

1. Extract file `.zip` yang ada
2. Masuk ke folder hasil extract
3. Klik dua kali file `index.html`
4. Website akan terbuka di browser kamu

> **Catatan:** Beberapa fitur seperti navbar dan footer mungkin tidak muncul jika dibuka langsung via `file://` karena browser memblokir request `fetch()` lokal. Gunakan Cara 2 untuk hasil terbaik.

### Cara 2 — Pakai Live Server (direkomendasikan)

Kalau kamu punya **VS Code**, ini cara paling gampang:

1. Install extension **Live Server** dari marketplace VS Code
2. Buka folder proyek di VS Code
3. Klik kanan pada `index.html` → pilih **"Open with Live Server"**
4. Website otomatis terbuka di `http://127.0.0.1:5500`

### Cara 3 — Pakai Python (kalau sudah ada Python)

Buka terminal di dalam folder proyek, lalu jalankan:

```bash
# Python 3
python -m http.server 8080
```

Kemudian buka browser dan akses: `http://localhost:8080`

---

## 📄 Halaman-Halaman Website

### 1. Beranda (`index.html`)

Halaman pertama yang dilihat pengunjung. Di sini ada:

- **Splash screen** animasi teks "MONITORING INDONESIA RIVERWATCH" yang muncul saat pertama kali membuka website
- **Hero section** dengan background gelombang animasi 3D (Vanta.js)
- **Counter statistik** yang menampilkan jumlah laporan masuk, sungai dipantau, relawan aktif, dan total sampah terlaporkan
- **Live Feed** — daftar laporan terbaru dari berbagai sungai yang ter-update otomatis
- **Mini peta interaktif** dengan filter status (Semua / Kritis / Baik)
- **Grafik tren kualitas air** vs tingkat pencemaran
- **Kartu artikel edukasi** terbaru
- **Banner ajakan** bergabung sebagai relawan
- **Logo mitra** yang berjalan otomatis (KLHK, LIPI, UI, WWF, WALHI, BRIN)

---

### 2. Peta Sungai (`map.html`)

Halaman peta interaktif seluruh sungai Indonesia menggunakan **Leaflet.js**.

- Marker berwarna menunjukkan status sungai: merah (kritis), kuning (sedang), hijau (baik)
- Klik marker → muncul popup berisi nama sungai, lokasi, status kualitas air, dan deskripsi singkat
- Ada kolom **pencarian** sungai atau kota
- Filter berdasarkan status: Semua, Kritis, Sedang, Baik
- Counter jumlah sungai per kategori ditampilkan di header

---

### 3. Dashboard (`dashboard.html`)

Tampilan panel data dengan **sidebar navigasi** di sebelah kiri.

- Menampilkan ringkasan statistik nasional (jumlah sungai, laporan, relawan)
- Grafik dan chart kondisi air secara visual
- Jam real-time yang berjalan di sidebar
- Bisa diakses langsung dari navbar atau dari halaman laporan

---

### 4. Lapor Sungai (`report.html`)

Form pelaporan kondisi sungai dengan alur **4 langkah** (multi-step form):

- **Step 1 — Lokasi:** Pilih atau masukkan nama sungai dan lokasi kejadian
- **Step 2 — Kondisi Air:** Pilih kondisi (kritis/sedang/baik) dan deskripsikan masalah yang ditemukan
- **Step 3 — Foto:** Upload foto kondisi sungai sebagai bukti laporan
- **Step 4 — Konfirmasi:** Review semua data sebelum dikirim

Progress bar di atas form menunjukkan posisi kamu saat ini. Laporan bisa disubmit setelah semua langkah diisi.

---

### 5. Edukasi (`education.html`)

Pusat konten pembelajaran lingkungan, terdiri dari beberapa seksi:

- **Galeri Dampak** — foto-foto kondisi nyata sungai yang tercemar
- **Before & After** — perbandingan visual sungai sebelum dan sesudah pembersihan
- **Kalkulator Dampak** — hitung dampak lingkungan dari aktivitas sehari-hari
- **Artikel** — tulisan informatif tentang pencemaran air, teknologi hijau, dan tips menjaga lingkungan
- **Quiz** — tes pengetahuan tentang sungai dan lingkungan
- **Sertifikat** — bisa didapatkan setelah menyelesaikan modul edukasi

---

### 6. Komunitas (`community.html`)

Halaman untuk melihat dan berinteraksi dengan sesama relawan.

- **Leaderboard** — peringkat relawan paling aktif berdasarkan jumlah laporan dan kontribusi
- **Event Terdekat** — daftar kegiatan bersih sungai yang akan datang
- Statistik menampilkan jumlah relawan aktif saat ini (6.291 relawan)

---

### 7. Login / Daftar (`components/common/login.html`)

Halaman registrasi dengan desain glassmorphism di atas background animasi bola bumi 3D.

- Form untuk membuat akun baru sebagai relawan RiverWatch
- Akses dari tombol "Daftar Gratis Sekarang" di beranda

---

## 🔄 Alur Kerja Website

Berikut gambaran bagaimana seorang pengguna biasanya menggunakan RiverWatch dari awal sampai akhir:

```
Buka Website
     │
     ▼
[Splash Screen]
Animasi teks pembuka muncul ~2 detik
     │
     ▼
[Beranda / index.html]
Lihat statistik, live feed laporan,
peta mini, dan artikel edukasi
     │
     ├──────────────────────────────────────┐
     │                                      │
     ▼                                      ▼
[Peta Sungai / map.html]           [Edukasi / education.html]
Cari & klik sungai terdekat        Baca artikel, coba quiz,
Lihat status kualitas airnya       lihat galeri before-after
     │                                      │
     ▼                                      ▼
[Temukan masalah?]                 [Selesai belajar?]
     │                                      │
     ▼                                      ▼
[Lapor Sungai / report.html]       [Komunitas / community.html]
Isi 4 langkah laporan:             Lihat leaderboard,
Lokasi → Kondisi → Foto → Kirim    ikut event bersih sungai
     │
     ▼
[Dashboard / dashboard.html]
Pantau data dan tren
kualitas air secara nasional
     │
     ▼
[Daftar Jadi Relawan / login.html]
Buat akun untuk berkontribusi
lebih aktif di komunitas
```

---

## 🛠️ Library & Dependensi Eksternal

Semua library diambil via CDN, tidak perlu instalasi manual:

| Library | Kegunaan |
|---|---|
| Bootstrap 5.3.2 | Layout grid & komponen UI |
| Bootstrap Icons 1.11.3 | Ikon-ikon di seluruh halaman |
| Phosphor Icons 2.1.1 | Ikon tambahan |
| Leaflet.js 1.9.4 | Peta interaktif |
| Chart.js 4.4.2 | Grafik tren kualitas air |
| Vanta.js (Waves) | Animasi gelombang 3D di hero |
| Three.js r134 | Engine 3D untuk Vanta & globe login |
| AOS 2.3.1 | Animasi scroll (fade-in, zoom) |
| Google Fonts (Outfit + Space Mono) | Tipografi |

---

## ⚠️ Catatan Penting

- **Data yang ditampilkan saat ini adalah data simulasi** (fake data) yang ada di file `js/fakedata.js`. Untuk produksi, perlu disambungkan ke API dan database nyata.
- Website belum memiliki backend — form laporan belum benar-benar mengirim data ke server.
- Fitur login/registrasi masih sebatas tampilan (UI-only), belum terhubung ke sistem autentikasi.
- Website sudah responsif untuk tampilan mobile, dengan hamburger menu di layar kecil.

---

## 📬 Kontak

Proyek ini dibuat untuk keperluan kompetisi Web Design oleh:

**I Komang Hendra Ardi Pratama**
