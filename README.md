# DevLaunch Jobs
<p align="center">
  <img src="https://skillicons.dev/icons?i=react,tailwind,js,html,css,vite" />
</p>

![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)

![GitHub stars](https://img.shields.io/github/stars/Hard1stf/DevLaunch-Jobs?style=for-the-badge)

![GitHub forks](https://img.shields.io/github/forks/Hard1stf/DevLaunch-Jobs?style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/Hard1stf/DevLaunch-Jobs?style=for-the-badge)

A responsive job portal built with React, Vite, and Tailwind CSS that enables users to discover developer jobs, search by keywords, filter opportunities by job type, and save jobs for later using persistent browser storage.
![DevLaunch Jobs Banner](./README-assets/Banner.png)

🔗 Live Demo: https://dev-launch-jobs.vercel.app/

---

## Overview

DevLaunch Jobs is a frontend job portal designed to provide a clean and intuitive job browsing experience. Users can explore developer opportunities, search across multiple job attributes, filter listings by employment type, view detailed job descriptions, and bookmark jobs for future reference.

The project focuses on reusable React components, responsive UI design, and modern frontend development practices.

Users can:

* Browse available jobs
* Search by role, company, location, or skills
* Filter by job type
* Save jobs for later
* View detailed job descriptions
* Access the application seamlessly across desktop and mobile devices

---

## Features

### Job Browsing

- Browse developer job listings
- Dynamic job detail pages
- Responsive card-based layout

### Search & Filter

- Search by role, company, location, or skills
- Filter jobs by Internship or Full-time

### Saved Jobs

- Save and remove bookmarked jobs
- Persistent Local Storage
- Saved timestamp tracking

### User Experience

- Responsive layouts
- Skeleton loading states
- Toast notifications
- Empty state screens
- Active navigation
- Mobile bottom navigation

### Accessibility

- Semantic HTML structure
- Keyboard-friendly interactive elements
---

## Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS

### State Management

- React Hooks
- Custom `useLocalStorage` Hook

### Libraries

- React Icons
- React Hot Toast

### Build Tools

- Vite
- ESLint

### Deployment

- Vercel

---

## Project Structure

```text
src
├── assets
│   ├── hero.png
│   ├── NotFound-404.png
│   ├── react.svg
│   └── vite.svg
├── components
│   ├── Filters
│   │   └── Filters.jsx
│   ├── Hero
│   │   └── Hero.jsx
│   ├── JobCard
│   │   └── JobCard.jsx
│   ├── JobGrid
│   │   └── JobGrid.jsx
│   ├── Navbar
│   │   ├── Navbar.jsx
│   │   └── MobileBottomNav.jsx
│   ├── SearchBar
│   │   └── SearchBar.jsx
│   ├── UI
│   │   ├── Button.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── SkeletonGrid.jsx
│   ├── footer
│   │   └── Footer.jsx
│   └── layout
│       └── Layout.jsx
├── data
│   └── jobs.js
├── hooks
│   ├── useJobs.js
│   └── useLocalStorage.js
├── pages
│   ├── Home.jsx
│   ├── JobDetails.jsx
│   ├── SavedJobs.jsx
│   └── NotFound.jsx
├── services
│   └── jobService.js
├── utils
│   ├── filterJobs.js
│   └── toastMessages.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Screenshots

### Home Page

![Home Page](./README-assets/HomePage-2.png)

### Job Details

![Job Details](./README-assets/JobDetailsPage.png)

### Saved Jobs

![Saved Jobs](./README-assets/SavedJosPage.png)

### Mobile View

![Mobile View](./README-assets/Mobile-collage.png)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Hard1stf/DevLaunch-Jobs.git
```

Navigate into the project:

```bash
cd DevLaunch-Jobs
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---
## Future Improvements

- Integrate a real jobs API
- Backend authentication
- User accounts
- Advanced search and filtering
- Pagination
- Dark mode
- Unit testing
- Infinite scrolling

---

## Learning Outcomes

Through this project, I gained practical experience with:

- Building reusable React components
- Client-side routing with React Router
- Managing persistent state using a custom `useLocalStorage` hook
- Designing responsive interfaces with Tailwind CSS
- Organizing projects using a modular folder structure
- Enhancing user experience with skeleton loaders and toast notifications

---

## Challenges

Some of the key challenges while building this project included:

- Designing reusable UI components to avoid duplication.
- Persisting bookmarked jobs across browser sessions.
- Creating a responsive experience for both desktop and mobile users.
- Managing search and filtering while keeping the code modular and maintainable.

---

## Why I Built This

I built DevLaunch Jobs to strengthen my React fundamentals by creating a realistic frontend application that combines routing, reusable components, persistent state, and responsive UI design into a complete user experience.

---
## Author

**Hardik Vijeta**

- GitHub: https://github.com/Hard1stf
- Live Demo: https://dev-launch-jobs.vercel.app/
- Repository: https://github.com/Hard1stf/DevLaunch-Jobs