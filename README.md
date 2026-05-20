# JobVault — Job Application Tracker Frontend

> A modern, production-ready React SaaS frontend for tracking job applications with analytics, status management, and a beautiful dark-mode UI.

![JobVault](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite)

---

## 🚀 Features

- **Authentication** — JWT-based login/register with auto token refresh
- **Dashboard** — Live stats cards, 3 Recharts analytics charts, recent applications
- **Applications CRUD** — Full create/view/edit/delete with search, filter, and pagination
- **Statistics Page** — Deep-dive analytics with progress bars and charts
- **Settings** — Profile update, dark mode toggle, password change
- **Dark Mode** — Full dark/light mode with system preference detection
- **Responsive** — Mobile-first layout with collapsible sidebar
- **Toast Notifications** — Success/error/warning/info toasts
- **Skeleton Loaders** — Smooth loading states across all pages
- **Drag & Drop Resume Upload** — Modern file upload with visual feedback
- **Protected Routes** — Unauthenticated users redirected to login

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| React Router DOM | 7 | Client-side routing |
| Axios | 1.x | HTTP client with interceptors |
| React Hook Form | 7 | Form management & validation |
| Recharts | 3 | Analytics charts |

---

## 📁 Project Structure

```
src/
├── api/                    # (reserved for future use)
├── assets/                 # Static assets
├── components/
│   ├── common/             # Button, Card, Input, Select, Modal, StatusBadge,
│   │                       # Pagination, EmptyState, Spinner, Skeleton, ToastContainer
│   ├── forms/              # ApplicationForm, FileUpload
│   ├── layout/             # AppLayout, Sidebar, Navbar
│   └── charts/             # MonthlyChart, PlatformChart, StatusChart
├── context/
│   ├── AuthContext.jsx     # Authentication state + JWT management
│   ├── ThemeContext.jsx    # Dark/light mode
│   └── ToastContext.jsx    # Toast notification system
├── hooks/
│   ├── useApplications.js  # Fetch applications list
│   ├── useDashboard.js     # Fetch all dashboard data in parallel
│   └── usePagination.js    # Pagination logic
├── pages/
│   ├── auth/               # LoginPage, RegisterPage
│   ├── dashboard/          # DashboardPage
│   ├── applications/       # ApplicationsPage, AddApplicationPage,
│   │                       # EditApplicationPage, ApplicationDetailsPage
│   ├── StatisticsPage.jsx
│   ├── SettingsPage.jsx
│   └── NotFoundPage.jsx
├── routes/
│   ├── ProtectedRoute.jsx  # Requires auth
│   └── GuestRoute.jsx      # Redirects if already logged in
├── services/
│   ├── api.js              # Axios instance + interceptors
│   ├── authService.js      # Auth API calls
│   ├── applicationService.js # Application CRUD
│   └── dashboardService.js # Dashboard analytics
└── utils/
    ├── constants.js        # Status, platform options, colors
    └── helpers.js          # Date formatting, error parsing, etc.
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Configure Backend URL

The API base URL is set in `src/services/api.js`:

```js
const BASE_URL = 'https://imdash1906.pythonanywhere.com/api';
```

Change this to your own backend URL if needed.

### Run Development Server

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🔌 API Endpoints Used

### Authentication
| Method | Endpoint |
|---|---|
| POST | `/auth/login/` |
| POST | `/auth/register/` |
| POST | `/auth/logout/` |
| POST | `/auth/token/refresh/` |
| GET | `/auth/profile/` |
| PATCH | `/auth/profile/` |
| POST | `/auth/change-password/` |

### Applications
| Method | Endpoint |
|---|---|
| GET | `/applications/` |
| POST | `/applications/` |
| GET | `/applications/{id}/` |
| PATCH | `/applications/{id}/` |
| PUT | `/applications/{id}/` |
| DELETE | `/applications/{id}/` |

### Dashboard
| Method | Endpoint |
|---|---|
| GET | `/dashboard/stats/` |
| GET | `/dashboard/monthly/` |
| GET | `/dashboard/platform/` |
| GET | `/dashboard/status/` |

---

## 🔐 Auth Flow

1. **Login** → stores `access_token` + `refresh_token` in `localStorage`
2. **Every request** → `Authorization: Bearer <access_token>` via Axios interceptor
3. **401 response** → automatically refreshes token using `refresh_token`
4. **Refresh fails** → clears tokens, redirects to `/login`
5. **Page reload** → re-validates token by calling `/auth/profile/`

---

## 🎨 Design System

- **Colors**: Indigo/Purple accent (`indigo-500`, `indigo-600`, `purple-500`)
- **Font**: Inter (Google Fonts)
- **Radius**: `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- **Cards**: Glassmorphism with `backdrop-blur`, subtle borders
- **Animations**: `fadeIn`, `slideUp`, `bounceIn` keyframe animations
- **Dark mode**: `dark:` Tailwind variants, persisted to `localStorage`

---

## 📊 Application Statuses

| Status | Color |
|---|---|
| Applied | Blue |
| Screening | Yellow |
| Interview | Purple |
| Technical | Indigo |
| Offer | Green |
| Rejected | Red |
| Withdrawn | Gray |

---

## 📱 Responsive Breakpoints

- **Mobile** (< 640px): Single column, collapsible sidebar overlay
- **Tablet** (640–1024px): Two-column grids, sidebar hidden
- **Desktop** (> 1024px): Full sidebar, 3–4 column dashboards

---

## 📄 License

MIT — Built for job seekers. Good luck! 🚀
