# Portfolio

A personal portfolio website built with **React** and **Vite**.

## Overview

This project showcases:
- A landing page with animated hero content
- A projects page with category-based filtering
- A contact page
- Client-side routing with `react-router-dom`
- Dark mode toggle with preference persistence in `localStorage`

## Tech Stack

- React
- Vite
- React Router
- Framer Motion
- ESLint

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/    # Reusable UI components (Navbar, Hero, ProjectCard)
  data/          # Static project data
  pages/         # Route-level pages (Home, Projects, Contact)
  styles/        # Component/page styles
  App.jsx        # App routes and global state
  main.jsx       # App entry point
```
