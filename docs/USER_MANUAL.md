# Panduan Pengguna - Prototype Dashboard

## Daftar Isi

1. [Pendahuluan](#pendahuluan)
2. [Akses Sistem](#akses-sistem)
3. [Dashboard Overview](#dashboard-overview)
4. [Analisis Kunjungan](#analisis-kunjungan)
5. [Analisis Peminjaman](#analisis-peminjaman)
6. [Sistem Rekomendasi](#sistem-rekomendasi)
7. [Fitur Tambahan](#fitur-tambahan)
8. [FAQ](#faq)

---

## Pendahuluan

Prototype Dashboard adalah sistem analytics modern untuk monitoring perpustakaan. Dashboard ini menyediakan:

- Visualisasi data kunjungan real-time
- Analisis peminjaman buku
- Sistem rekomendasi berbasis algoritma
- Laporan interaktif

### Kebutuhan Sistem

- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet (untuk mode production)
- Resolusi layar minimal 1280x720

---

## Akses Sistem

### Login

1. Buka aplikasi di browser
2. Masukkan **Username** dan **Password**
3. Klik tombol **"Masuk ke Dashboard"**

> **Catatan**: Untuk demo, gunakan username dan password apapun.

### Logout

1. Klik nama pengguna di sidebar (kiri bawah)
2. Pilih **"Keluar"**

---

## Dashboard Overview

Halaman utama menampilkan ringkasan performa perpustakaan.

### KPI Cards (Kartu Metrik)

Di bagian atas terdapat 4 kartu metrik:

- **Total Pengunjung** - Jumlah pengunjung hari ini
- **Total Peminjaman** - Jumlah peminjaman aktif
- **Buku Tersedia** - Jumlah buku yang bisa dipinjam
- **Keterlambatan** - Jumlah buku terlambat dikembalikan

### Trend Kunjungan

- Grafik garis menunjukkan trend 7 hari terakhir
- Hover pada titik untuk melihat detail
- Klik ikon refresh untuk mengulang animasi

### Peminjaman per Kategori

- Bar chart horizontal menunjukkan kategori populer
- Warna berbeda untuk setiap kategori

### Buku Terpopuler

- Grid menampilkan 5 buku paling banyak dipinjam
- Klik untuk melihat detail

---

## Analisis Kunjungan

Navigasi: **Sidebar → Kunjungan**

### Tab Overview

- **Peak Hours Heatmap** - Jam tersibuk perpustakaan
- **Statistics Cards** - Total visitor, rata-rata, dll

### Tab Visitor Logs

- Tabel lengkap data pengunjung
- Fitur **Search** untuk mencari NIM/Nama
- Fitur **Export** ke Excel

### Tab Demographics

- **Pie Chart** distribusi per fakultas
- Persentase dan jumlah per fakultas

---

## Analisis Peminjaman

Navigasi: **Sidebar → Peminjaman**

### Tab Analytics

- **Late Returns Stats** - Statistik keterlambatan
- **Loan Trend Chart** - Trend peminjaman bulanan
- **Category Chart** - Kategori paling populer

### Tab Top Books

- Grid 10 buku terpopuler bulan ini
- Toggle view: Grid atau Table

### Tab Loan History

- Riwayat lengkap peminjaman
- Filter by status (Active/Returned/Late)
- Export ke Excel

---

## Sistem Rekomendasi

Navigasi: **Sidebar → Rekomendasi** (via Search / Ctrl+K)

### Tab Trending

- Buku trending minggu ini
- Ranking berdasarkan frekuensi peminjaman

### Tab For You

- Rekomendasi personal berdasarkan riwayat
- Algoritma: Content-Based Filtering

### Tab Discover

- "Pengguna yang meminjam ini juga meminjam..."
- Algoritma: Collaborative Filtering

---

## Fitur Tambahan

### Command Palette

- Tekan **Ctrl + K** untuk membuka
- Navigasi cepat ke semua halaman
- Toggle Dark Mode

### Dark Mode

1. Tekan **Ctrl + K**
2. Pilih **"Toggle Dark Mode"**
3. Atau via Command Palette pilih **"Use System Theme"**

### System Console (Admin)

- Tekan **Ctrl + Shift + X**
- Console tersembunyi untuk diagnostik
- Hanya untuk administrator

### Export Data

- Tersedia di tabel Visitor Logs dan Loan History
- Klik tombol **"Export"**
- File Excel akan terdownload

---

## FAQ

### Q: Bagaimana cara refresh data?

A: Klik tombol "Refresh" di pojok kanan atas setiap halaman.

### Q: Apakah data real-time?

A: Saat ini masih menggunakan data dummy. Untuk data real-time, perlu integrasi dengan Gate System dan SLiMS.

### Q: Browser apa yang didukung?

A: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### Q: Bagaimana cara mengganti ke mode production?

A: Lihat dokumentasi DEPLOYMENT.md

---

## Kontak Support

Jika mengalami kendala, hubungi:

- **Developer**: Alvah Rabbany
- **Email**: [contact email]
- **Repository**: <https://github.com/alvahraa/prototype-dashboard>

---

*Dokumentasi ini terakhir diperbarui: Januari 2026*
