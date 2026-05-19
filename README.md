# DCE Projects — Construction Marketplace

> India's premier MERN-stack marketplace for hiring construction labour, engineers, and renting tools & heavy machinery.

![DCE Projects](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=400&fit=crop&auto=format)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| HTTP Client | Axios with JWT interceptor |
| Toast | React Hot Toast |
| Icons | Lucide React |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| Deployment | Railway (API) + Vercel (Frontend) |

---

## Project Structure

```
DC_Project/
├── buildpro-client/          # React + Vite frontend
│   ├── src/
│   │   ├── api/              # Axios instance
│   │   ├── components/       # Navbar, Footer, ServiceCard, ProductCard
│   │   ├── context/          # AuthContext (JWT decode + login/logout)
│   │   ├── pages/            # Home, Login, Register, Services, Products,
│   │   │                     # ServiceDetail, ProductDetail, Dashboard,
│   │   │                     # About, Contact
│   │   └── routes/           # AppRoutes (protected route wrapper)
│   └── .env                  # VITE_API_URL
│
└── buildpro-server/          # Express backend
    ├── models/               # User, Service, Product, Booking
    ├── routes/               # auth, services, products, bookings
    ├── middleware/            # authMiddleware (JWT verify)
    ├── seed.js               # Database seeding script
    └── server.js             # Express app entry
```

---

## Setup Instructions

### 1. Clone & Prerequisites
```bash
# Node.js 18+ required
# MongoDB Atlas account required
```

### 2. Backend Setup

```bash
cd buildpro-server
cp .env.example .env
# Edit .env → fill in MONGO_URI and JWT_SECRET
npm install
```

**.env values to fill:**
```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/buildpro
JWT_SECRET=your_long_random_secret_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

```bash
# Seed the database (run once)
npm run seed

# Start the server
npm run dev   # development (auto-restart)
npm start     # production
```

### 3. Frontend Setup

```bash
cd buildpro-client
npm install --legacy-peer-deps
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## API Reference

### Auth
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | `/api/auth/register` | ❌ | `{ name, email, password, phone, role }` |
| POST | `/api/auth/login` | ❌ | `{ email, password }` |

### Services
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/services` | ❌ | List all services. Query: `?type=labour&available=true` |
| GET | `/api/services/:id` | ❌ | Get service by ID |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | List all products. Query: `?category=tool&available=true` |
| GET | `/api/products/:id` | ❌ | Get product by ID |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | ✅ | Create booking. Body: `{ itemId, itemType, startDate, endDate }` |
| GET | `/api/bookings/my` | ✅ | Get current user's bookings |
| PATCH | `/api/bookings/:id/cancel` | ✅ | Cancel a booking |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0A0A0A` | Page background |
| `--bg-surface` | `#111111` | Cards / panels |
| `--bg-elevated` | `#1A1A1A` | Hover states, modals |
| `--accent-primary` | `#C8F135` | CTAs, highlights, active states |
| `--accent-secondary` | `#FF5C2B` | Warnings, secondary badges |
| `--text-primary` | `#F2F2F2` | Headings |
| `--text-secondary` | `#888888` | Labels, muted copy |
| `--border` | `#2A2A2A` | 1px borders |

**Typography:** Inter (Google Fonts) — weights 400/500/600/700/800

---

## Production Deployment

### Backend → Railway
1. Push `buildpro-server` to GitHub
2. New Railway project → Deploy from GitHub
3. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (Vercel URL)

### Frontend → Vercel
1. Push `buildpro-client` to GitHub
2. New Vercel project → Import repo
3. Add env var: `VITE_API_URL=https://your-railway-app.railway.app/api`
4. Update Railway's `CLIENT_URL` to match your Vercel URL
