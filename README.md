# 🚀 CryptoDash – Secure Crypto Price Tracker Dashboard

A production-grade **Crypto Price Tracker Dashboard** built with **Next.js App Router**, **React Query**, **Tailwind CSS**, and a **Flask backend** featuring **JWT authentication + TOTP-based 2FA**. The project demonstrates **frontend engineering depth, security awareness, scalable architecture, and real-time data handling**.

---

## 📌 Project Overview

CryptoDash provides authenticated users with real-time cryptocurrency market data powered by the **CoinGecko API**, presented through a clean, responsive, and accessible UI.

### Key Goals

* Secure authentication with JWT + 2FA
* Real-time crypto price tracking
* High-performance UI with modern React patterns
* Clean architecture (frontend + backend separation)
* Production-ready security practices

---

## 🧱 Tech Stack

### Frontend

* **Next.js 13+ (App Router)**
* **React 18+**
* **TypeScript**
* **Tailwind CSS** (UI styling)
* **TanStack React Query** (data fetching & caching)
* **Axios** (HTTP client)
* **next-themes** (dark/light mode)

### Backend

* **Flask (Python)**
* **JWT Authentication**
* **TOTP-based 2FA** (`pyotp`)
* **Passlib (bcrypt)** for password hashing
* **CORS & Rate Limiting**

### External APIs

* **CoinGecko Public API** (market data)

---

## 🗂️ Project Structure

### Frontend (Next.js)

```
crypto-dashboard/
├── app/
│   ├── layout.tsx        # Root layout (Server Component)
│   ├── page.tsx          # Landing page
│   ├── login/            # Authentication pages
│   ├── dashboard/        # Protected dashboard
│   └── coin/[id]/        # Coin detail page
├── components/
│   ├── common/           # Header, loaders, UI elements
│   ├── providers/        # ThemeProvider, QueryProvider
│   └── CoinsTable.tsx    # Market table
├── services/
│   ├── api.ts            # Axios (Flask backend)
│   └── coingecko.ts      # CoinGecko API wrapper
├── styles/
│   └── globals.css
└── tailwind.config.ts
```

### Backend (Flask)

```
backend/
├── app.py                # Flask app entry
├── auth.py               # Auth & OTP logic
├── config.py             # Environment config
└── requirements.txt
```

---

## 🔐 Authentication Flow

### 1️⃣ Login

* User submits **email + password**
* Backend validates credentials
* If valid → requires **2FA OTP verification**

### 2️⃣ 2FA (TOTP)

* User enters 6-digit OTP
* Backend validates using TOTP secret
* On success → **JWT token issued**

### 3️⃣ Session Handling

* JWT stored on client
* Protected routes validated via `/me` endpoint
* Auto logout on token expiry

---

## 🛡️ Security Features

* Password hashing with **bcrypt**
* JWT-based route protection
* TOTP-based Two-Factor Authentication
* Input validation & sanitization
* Secure error messages (no sensitive leaks)
* CORS configuration
* Environment-based secrets
* Protected frontend routes

---

## 📊 Dashboard Features

### Market Table

* Top 100 coins by market cap
* Real-time auto-refresh (30s)
* Search by name or symbol
* Sort by:

  * Price
  * Market Cap
  * 24h Change
* Responsive table layout
* Price change highlighting

### Performance

* React Query caching
* Background refetching
* Optimistic UI updates

---

## 📈 Coin Detail Page

* Detailed coin information
* 7-day price history chart
* Market statistics
* Responsive chart rendering

API Endpoints used:

* `/coins/{id}`
* `/coins/{id}/market_chart?vs_currency=usd&days=7`

---

## 🎨 UI / UX Highlights

* Responsive layout (mobile → desktop)
* Dark / Light mode toggle
* Skeleton loaders
* Smooth transitions
* Hover & active states
* Subtle animations (hero image float)
* Accessible components

---

## ⚙️ Data Fetching Strategy

* **React Query** for all API calls
* Automatic caching & retries
* Background refetching
* Centralized Axios configuration

```ts
useQuery({
  queryKey: ['top-coins'],
  queryFn: fetchTopCoins,
  refetchInterval: 30000,
})
```

---

## 🚀 Running the Project

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Frontend: `http://localhost:3000`
Backend: `http://127.0.0.1:5000`

---

## 🧪 Error Handling

* Network failures
* API rate limits
* Invalid login / OTP
* Invalid coin IDs
* Graceful fallback UI
* Friendly error messages

---

## 🧠 Architecture Highlights

* Clear separation of concerns
* Server vs Client components respected
* Scalable provider pattern
* Production-safe SSR handling
* Secure-by-design approach

---

## 🔮 Future Enhancements

* WebSocket-based live prices
* Watchlist & favorites
* Pagination / virtualization
* Role-based access control
* Redis caching (backend)
* CI/CD pipeline

---

## 🧑‍💻 Author

**Naveen Kumar** – Front-end developer...

---
