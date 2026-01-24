---
description: Development setup and common commands for prototype-dashboard
---

# Development Setup - Prototype Dashboard

## Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn

## Initial Setup

// turbo

1. Install dependencies:

```bash
npm install
```

## Running the Application

// turbo
2. Start development server:

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## Code Quality

// turbo
3. Run ESLint:

```bash
npm run lint
```

// turbo
4. Format code dengan Prettier:

```bash
npm run format
```

## Build for Production

1. Create production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/          # Reusable components
│   ├── Common/         # Shared UI components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── Layout/         # Sidebar, Header
│   ├── Loans/          # Loans analysis components
│   ├── Recommendations/ # Recommendation components
│   └── Visitors/       # Visitor analysis components
├── data/               # Mock data
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
└── utils/              # Utility functions
```

## Tech Stack

- React 18
- Framer Motion (animations)
- TailwindCSS (styling)
- Recharts (data visualization)
- Lucide React (icons)
