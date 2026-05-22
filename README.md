# 🚗 ZippyCar - Frontend Client

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

> **Modern, responsive car rental frontend** with Google authentication, vehicle browsing, booking system, and user dashboard.

![ZippyCar Demo](https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=400&fit=crop)

---

## ✨ Features

### 🔐 Authentication
- Email/Password login & registration
- Google OAuth 2.0 single sign-on
- JWT token management with axios interceptors
- Protected routes & persistent login

### 🚘 Vehicle Management
- Browse all available cars with pagination
- Search by model name
- Filter by vehicle type (Sedan, SUV, Hatchback, Luxury, Sports)
- Sort by price (Low to High / High to Low)
- View detailed car information with images

### 📅 Booking System
- Select pickup & return dates
- Automatic duration & total price calculation
- Instant booking confirmation
- View all bookings in personal dashboard

### 👤 User Dashboard
- **My Bookings** - Track all rental history
- **My Added Cars** - Manage your listed vehicles
- **Add New Car** - List your own car for rent
- **Edit/Delete** - Modify or remove your listings

### 🎨 UI/UX Highlights
- Glassmorphism design with gradient backgrounds
- Smooth animations using Framer Motion
- Fully responsive (Mobile, Tablet, Desktop)
- Dark theme with amber accent colors
- Toast notifications for user feedback
- Loading states & skeleton screens

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 16 (App Router) | React framework with SSR |
| **UI Library** | React 19 | Component-based UI |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Animations** | Framer Motion | Smooth transitions |
| **HTTP Client** | Axios | API calls with interceptors |
| **Auth** | @react-oauth/google | Google OAuth integration |
| **Icons** | Lucide React + React Icons | Modern icon sets |
| **Notifications** | React Toastify | Toast messages |
| **Marquee** | React Fast Marquee | News ticker animation |

---

## 📁 Project Structure
ZippyCar-client/
├── src/
│ ├── app/
│ │ ├── (auth)/ # Authentication routes
│ │ │ ├── login/page.jsx # Login page
│ │ │ └── register/page.jsx# Registration with image upload
│ │ ├── about/page.jsx # About page
│ │ ├── cars/
│ │ │ ├── [id]/page.jsx # Car details page
│ │ │ └── page.jsx # All cars listing
│ │ ├── add-car/page.jsx # Add new car form
│ │ ├── my-added-cars/page.jsx # User's listed cars
│ │ ├── my-bookings/page.jsx # User's bookings
│ │ ├── layout.js # Root layout with providers
│ │ ├── page.js # Homepage
│ │ └── not-found.jsx # 404 page
│ ├── Components/
│ │ ├── Navbar.jsx # Navigation with auth state
│ │ ├── Footer.jsx # Footer with links
│ │ ├── Hero.jsx # Hero section
│ │ ├── BookingFilter.jsx # Search & filter form
│ │ ├── FeaturedCars.jsx # Homepage car showcase
│ │ ├── HowItWorks.jsx # 3-step guide
│ │ ├── WhyChooseUs.jsx # Features section
│ │ ├── Testimonials.jsx # Customer reviews
│ │ ├── NewsTicker.jsx # Latest updates ticker
│ │ ├── GoogleLogin.jsx # Google OAuth button
│ │ └── CarLogo/ # Logo component
│ ├── context/
│ │ └── AuthContext.jsx # Global auth state
│ ├── api/
│ │ └── axiosInstance.js # Axios configuration
│ └── ...
├── public/ # Static assets
├── .env.local # Environment variables
├── next.config.mjs # Next.js config
├── package.json
└── README.md


---

## 🚀 Installation

### Prerequisites
- Node.js 20+ 
- Backend server running (see [ZippyCar-server](../ZippyCar-server) for API documentation   and setup instructions )

### Step 1: Clone & Install

```bash
git clone https://github.com/s546863s/ZippyCar-client.git
cd ZippyCar-client
npm install
Step 2: Environment Setup
Create .env.local file:

env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
Step 3: Run Development Server
bash
npm run dev
Open http://localhost:3000

Step 4: Build for Production
bash
npm run build
npm start
🔧 Available Scripts
Command	Description
npm run dev	Start dev server on port 3000
npm run build	Create production build
npm run start	Start production server
npm run lint	Run ESLint checks
npm run vercel-build	Vercel deployment build
🎯 Key Components Explained
AuthContext.jsx
Manages global authentication state

Persists login across page refreshes

Provides user, loading, logout to entire app

axiosInstance.js
Base URL configuration

Request interceptor (adds JWT token)

Response interceptor (handles 401 errors)

GoogleLogin.jsx
One-tap Google Sign-In integration

Loading spinner during authentication

FedCM disabled for popup mode

Automatic user creation in backend

Navbar.jsx
Dynamic links based on auth state

User dropdown menu

Mobile responsive hamburger menu

📱 Responsive Design
Breakpoint	Target	Features
< 640px	Mobile	Stacked layout, hamburger menu
640px - 1024px	Tablet	2-column grid, adjusted spacing
> 1024px	Desktop	Full layout, 3-4 column grid
🔌 Backend Integration
This frontend expects the backend API at NEXT_PUBLIC_API_URL with these endpoints:

Endpoint	Method	Purpose
/api/auth/login	POST	Email login
/api/auth/register	POST	User registration
/api/auth/google-login	POST	Google OAuth
/api/auth/me	GET	Get current user
/api/auth/logout	POST	Logout
/api/cars	GET	Fetch all cars
/api/cars/:id	GET	Fetch single car
/api/cars/add	POST	Add new car
/api/cars/:id	PATCH	Update car
/api/cars/:id	DELETE	Delete car
/api/bookings/add	POST	Create booking
/api/bookings/my-bookings	GET	User bookings
🎨 Styling Guide
Color Palette
Color	Hex	Usage
Primary Dark	#090d16	Background
Surface	#111827	Cards, modals
Accent	#f59e0b	Buttons, highlights
Text Primary	#ffffff	Headings
Text Secondary	#94a3b8	Body text
Typography
Font Family: Geist (Next.js default)

Headings: 3xl/4xl/5xl with bold weight

Body: sm/base with regular weight

🚢 Deployment (Vercel)
Method 1: Vercel CLI
bash
npm i -g vercel
vercel --prod
Method 2: GitHub + Vercel Dashboard
Push code to GitHub

Import project at vercel.com

Add environment variables:

Name	Value
NEXT_PUBLIC_API_URL	https://your-backend.vercel.app/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID	Your Google Client ID
Deploy

Google OAuth Configuration
Add to Authorized JavaScript origins:

http://localhost:3000

https://your-frontend.vercel.app

🧪 Testing
bash
# Linting
npm run lint

# Build test
npm run build
📊 Performance Optimizations
✅ Image optimization with Next.js next/image

✅ Code splitting with dynamic imports

✅ Lazy loading for below-fold components

✅ Memoized components with useCallback/useMemo

✅ Axios interceptors for token management

🤝 Contributing
Fork the project

Create feature branch (git checkout -b feature/amazing)

Commit changes (git commit -m 'Add amazing feature')

Push (git push origin feature/amazing)

Open Pull Request

📄 License
MIT License - see LICENSE file

👨‍💻 Author
Abdus Salam

GitHub: @abdus-salam

Email: abdussalam6111997@gmail.com