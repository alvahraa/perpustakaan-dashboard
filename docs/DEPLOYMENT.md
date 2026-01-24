# Deployment Guide - Prototype Dashboard

## Daftar Isi

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Production Build](#production-build)
4. [Deploy ke Vercel](#deploy-ke-vercel)
5. [Deploy ke Netlify](#deploy-ke-netlify)
6. [Deploy ke Server Sendiri](#deploy-ke-server-sendiri)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Software Requirements

- **Node.js** v16 atau lebih baru
- **npm** v8+ atau **yarn** v1.22+
- **Git** (untuk version control)

### Verifikasi Instalasi

```bash
node --version   # Harus v16+
npm --version    # Harus v8+
git --version    # Harus tersedia
```

---

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/alvahraa/prototype-dashboard.git
cd prototype-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment (Opsional)

```bash
cp .env.example .env
# Edit .env sesuai kebutuhan
```

### 4. Jalankan Development Server

```bash
npm start
```

Buka <http://localhost:3000> di browser.

---

## Production Build

### Membuat Build

```bash
npm run build
```

Hasil build akan tersimpan di folder `build/`.

### Test Build Locally

```bash
npx serve -s build
```

Buka <http://localhost:3000> untuk preview.

---

## Deploy ke Vercel

### Otomatis via GitHub

1. Login ke [vercel.com](https://vercel.com)
2. Klik **"New Project"**
3. Import repository GitHub
4. Vercel otomatis mendeteksi React app
5. Klik **"Deploy"**

### Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

---

## Deploy ke Netlify

### Otomatis via GitHub

1. Login ke [netlify.com](https://netlify.com)
2. Klik **"Add new site"** → **"Import an existing project"**
3. Connect ke GitHub repository
4. Settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Klik **"Deploy site"**

### Via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build dan deploy
npm run build
netlify deploy --prod --dir=build
```

---

## Deploy ke Server Sendiri

### Apache

1. Build aplikasi: `npm run build`
2. Upload isi folder `build/` ke document root
3. Buat file `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/prototype-dashboard/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Environment Variables

### File `.env`

```env
# Mode: 'dummy' atau 'production'
REACT_APP_DATA_MODE=dummy

# API URL untuk mode production
REACT_APP_API_URL=https://api.yourdomain.com

# Gate System API
REACT_APP_GATE_API_URL=https://gate.library.ac.id/api

# SLiMS API
REACT_APP_SLIMS_API_URL=https://slims.library.ac.id/api
```

### Vercel Environment Variables

1. Dashboard Vercel → Project → Settings → Environment Variables
2. Tambahkan variabel:
   - `REACT_APP_DATA_MODE` = `production`
   - `REACT_APP_API_URL` = `https://api.yourdomain.com`

---

## Troubleshooting

### Build Error: Out of Memory

```bash
# Tambahkan memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Blank Page setelah Deploy

- Pastikan `homepage` di `package.json` sesuai
- Untuk subdirectory: `"homepage": "https://yourdomain.com/dashboard"`
- Pastikan routing SPA dikonfigurasi (lihat Apache/Nginx config)

### API CORS Error

- Tambahkan origin di API server
- Atau gunakan proxy di development

### Cache Issues

- Clear browser cache
- Tambahkan query string: `?v=2` di URL

---

## Performance Optimization

### Untuk Production

1. Enable Gzip compression di server
2. Gunakan CDN untuk static assets
3. Implement lazy loading untuk routes
4. Optimize images (gunakan WebP)

### Lighthouse Score Target

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## Monitoring (Opsional)

### Google Analytics

Tambahkan di `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Error Tracking

Integrasikan Sentry: <https://sentry.io>

---

*Dokumentasi ini terakhir diperbarui: Januari 2026*
