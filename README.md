# Prototype Dashboard - Library Analytics System

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

**Sistem dashboard analytics modern untuk monitoring perpustakaan dengan visualisasi data real-time.**

[Fitur](#fitur-utama) • [Instalasi](#instalasi) • [Struktur](#struktur-project)

</div>

---

> ⚠️ **CATATAN PENTING:**  
> Sistem ini masih berupa **PROTOTYPE** dan menggunakan **data dummy** untuk demonstrasi.  
> Belum diuji coba dengan database real (Gate System / SLiMS).  
> Diperlukan integrasi dan pengujian lebih lanjut sebelum digunakan di lingkungan produksi.

---

## Fitur Utama

### 1. Dashboard Overview
- **KPI Cards**: Menampilkan 4 metrik utama (total buku, pengunjung hari ini, peminjaman aktif, pengunjung di perpustakaan)
- **Trend Chart**: Grafik line chart kunjungan harian
- **Category Chart**: Bar chart peminjaman per kategori buku
- **Top Books**: 5 buku terpopuler bulan ini

### 2. Analisis Kunjungan
- **Peak Hours Heatmap**: Visualisasi jam sibuk perpustakaan
- **Faculty Distribution**: Pie chart distribusi pengunjung per fakultas
- **Visitor Table**: Tabel pengunjung dengan fitur search, sort, dan filter
- **Live Duration**: Durasi kunjungan real-time untuk pengunjung aktif

### 3. Analisis Peminjaman
- **Top 10 Books**: Grid buku terpopuler dengan ranking badges
- **Category Popularity**: Horizontal bar chart kategori
- **Loan Trend**: Area chart trend peminjaman 6 bulan
- **Late Returns**: Progress bar statistik keterlambatan

### 4. Motion Design System

Dashboard menggunakan **Framer Motion** untuk animasi profesional dan smooth:

#### Sidebar Navigation
- **Staggered Entry**: Menu items muncul satu per satu dengan efek slide-in
- **layoutId Transition**: Active menu pill bergerak smooth antar menu item
- **Micro-interactions**: Hover lift dan tap feedback pada semua tombol

#### Chart Animations (Recharts)
- **Line Chart**: Animasi "pencil sketch" - garis digambar dari kiri ke kanan (2 detik)
- **Bar Chart**: Animasi grow - bar tumbuh dari bawah ke atas (1.5 detik)
- **Glassmorphism Tooltips**: Tooltip dengan efek backdrop-blur dan transparansi

#### Login Page
- **Mesh Gradient Background**: Animated organic blob shapes
- **Glassmorphism Card**: Backdrop blur dengan semi-transparent background
- **Input Micro-interactions**: Scale up dan glow effect saat focus

### 5. System Console (Stealth Mode)

Dashboard dilengkapi dengan **System Console** - terminal emulator untuk administrasi sistem.

**Akses:** Tekan `Ctrl + Shift + X` (tersembunyi dari UI normal)

**Commands yang tersedia:**

| Command | Fungsi |
|---------|--------|
| `help` | Menampilkan daftar command yang tersedia |
| `clear` | Membersihkan layar terminal |
| `whoami` | Menampilkan user aktif (admin privileged access) |
| `status` | Menampilkan status sistem (uptime, connection, database) |
| `select * from visitors` | Query data pengunjung (JSON format, 5 rows) |
| `select * from books` | Query data buku (JSON format, 5 rows) |
| `run diagnostics` | Menjalankan simulasi diagnostic check multi-step |
| `calc <expression>` | Kalkulator matematika |

### 6. Command Palette (Spotlight Search)

**Trigger:** `Ctrl + K` atau klik Search di header

**Fitur:**
- Quick navigation ke semua halaman
- Toggle Dark Mode
- Use System Theme
- Fuzzy search
- Keyboard navigation (Arrow Up/Down, Enter, Esc)

### 7. Dark Mode (Professional)

**Toggle:** Via Command Palette (`Ctrl + K`) → "Switch to Dark Mode"

**Fitur:**
- **Persistent**: Preferensi disimpan di localStorage
- **System Sync**: Default mengikuti OS preference
- **Typography Hierarchy**: Menggunakan off-white (slate-50/200/300) untuk menghindari eye strain
- **High-End Aesthetic**: Inspired by Linear, Vercel, GitHub Dimmed

### 8. Smart Export System (Excel)

Sistem export data ke format Excel (.xlsx) profesional.

| Widget | Data yang di-export |
|--------|---------------------|
| Visitor Table | Data pengunjung yang terfilter (nama, NIM, fakultas, jam) |
| Top Books Grid | Top 10 buku (rank, judul, penulis, kategori, total pinjam) |
| Loan History | Riwayat peminjaman (ID, buku, peminjam, tanggal, status) |

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library dengan Hooks | 18.x |
| **Tailwind CSS** | Utility-first Styling | 3.x |
| **Recharts** | Data Visualization | 2.x |
| **Framer Motion** | Animation Library | Latest |
| **Lucide React** | Modern Icons | Latest |
| **date-fns** | Date Manipulation | 3.x |
| **xlsx** | Excel Export | Latest |

---

## Instalasi

### Prerequisites
- Node.js 16+
- npm atau yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/alvahraa/prototype-dashboard.git

# Masuk ke direktori
cd prototype-dashboard

# Install dependencies
npm install

# Jalankan development server
npm start
```

Buka http://localhost:3000 di browser.

---

## Struktur Project

```
prototype-dashboard/
├── public/
│   ├── images/
│   │   ├── demo/          # Screenshot untuk dokumentasi
│   │   └── assets/        # Logo dan icon
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Common/        # Loading, Error, DatePicker, CommandPalette
│   │   ├── Dashboard/     # KPICards, TrendChart, CategoryChart
│   │   ├── Layout/        # Sidebar, Header
│   │   ├── Loans/         # TopBooksGrid, LoanTrendChart
│   │   └── Visitors/      # PeakHours, FacultyPie, VisitorTable
│   │
│   ├── data/
│   │   └── generateDummyData.js  # Data dummy untuk demo
│   │
│   ├── hooks/
│   │   └── useDataFetch.js       # Custom hooks
│   │
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── VisitorsPage.jsx
│   │   ├── LoansPage.jsx
│   │   ├── ConsolePage.jsx
│   │   └── LoginPage.jsx
│   │
│   ├── services/
│   │   ├── api.js               # API configuration
│   │   ├── visitorService.js    # Visitor CRUD
│   │   ├── loanService.js       # Loan CRUD
│   │   └── bookService.js       # Book CRUD
│   │
│   ├── utils/
│   │   └── analytics.js         # Analytic functions
│   │
│   ├── App.js
│   └── index.css
│
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open Command Palette |
| `Ctrl + Shift + X` | Open System Console (Stealth Mode) |
| `↑ ↓` | Navigate in Command Palette |
| `Enter` | Select in Command Palette |
| `Esc` | Close modals |

---

## Mode Data

Dashboard mendukung 2 mode:

| Mode | Keterangan |
|------|------------|
| `dummy` | Menggunakan data dummy (1000 visitors, 200 books, 2000 loans) |
| `production` | Terhubung ke Gate System & SLiMS API |

Default mode adalah `dummy` untuk development dan demo.

---

## Author

**Alvah Rabbany** - *Proyek Magang - Prototype Dashboard Analytics Perpustakaan*

---

<div align="center">

**Prototype Dashboard untuk Monitoring Perpustakaan Modern**

</div>
