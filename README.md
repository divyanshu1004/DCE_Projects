# DCE Projects — MEP & Automation Engineering Organization

> A premium MERN-stack platform showcasing engineering services and products. Founded in 2021 in Haldwani, Uttarakhand, DCE Projects is a full-spectrum MEP and automation engineering organization delivering Industrial Automation, HVAC, Solar, Chiller Plants, PLC/SCADA, and Turnkey Projects across India with uncompromising quality.

![DCE Projects](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop&auto=format)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 8 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| Routing | React Router v6 |
| HTTP Client | Axios with JWT interceptor |
| Toast | React Hot Toast |
| Icons | Lucide React |
| Typography | DM Serif Display + Inter (Google Fonts) |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT + bcrypt |
| Deployment | Railway (API) + Vercel (Frontend) |

---

## Project Structure

```
DC_Project/
├── dce-client/               # React + Vite frontend
│   ├── src/
│   │   ├── api/              # Axios instance
│   │   ├── components/       # Navbar, Footer, ProductCard, CartDrawer
│   │   ├── context/          # AuthContext, CartContext
│   │   ├── data/             # Fallback product data
│   │   ├── pages/            # Home, Login, Register, Products,
│   │   │                     # ProductDetail, Services, ServiceDetail,
│   │   │                     # About, Contact, Dashboard,
│   │   │                     # Checkout, OrderSuccess
│   │   └── routes/           # AppRoutes (protected route wrapper)
│   └── .env                  # VITE_API_URL
│
└── dce-server/               # Express backend
    ├── models/               # User, Service, Product, Booking, Order
    ├── routes/               # auth, services, products, bookings, orders
    ├── middleware/            # authMiddleware (JWT verify)
    ├── seed.js               # Database seeding script (MEP products)
    └── server.js             # Express app entry point
```

---

## Setup Instructions

### 1. Prerequisites
```bash
# Node.js 18+ required
# MongoDB Atlas account required
```

### 2. Backend Setup

```bash
cd dce-server
cp .env.example .env
# Edit .env → fill in MONGO_URI and JWT_SECRET
npm install
```

**.env values to fill:**
```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dce_projects
JWT_SECRET=your_long_random_secret_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

```bash
# Seed the database with sample MEP products (run once)
npm run seed

# Start the server
npm run dev   # development (auto-restart with --watch)
npm start     # production
```

### 3. Frontend Setup

```bash
cd dce-client
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

Set your frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

### Auth
| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | `/api/auth/register` | ❌ | `{ name, email, password, role }` |
| POST | `/api/auth/login` | ❌ | `{ email, password }` |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | List all products. Query: `?category=electrical&available=true` |
| GET | `/api/products/:id` | ❌ | Get product by ID |
| POST | `/api/products` | ✅ Admin | Create a new product |

### Services
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/services` | ❌ | List all services |
| GET | `/api/services/:id` | ❌ | Get service by ID |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | ✅ | Place an order |
| GET | `/api/orders/my` | ✅ | Get current user's orders |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | ✅ | Create a service booking |
| GET | `/api/bookings/my` | ✅ | Get current user's bookings |
| PATCH | `/api/bookings/:id/cancel` | ✅ | Cancel a booking |

---

## Product Categories

| Category | Examples |
|----------|---------|
| **Electrical** | MCBs, RCCBs, Distribution Boards, Cables, Energy Meters |
| **Mechanical / HVAC** | Split ACs, Ceiling Fans, AHUs, Duct Fans, GI Ductware |
| **Plumbing** | CPVC Pipes, Ball Valves, Pumps, Water Heaters, Fittings |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | `#008ab8` | Buttons, CTAs, highlights |
| Text Primary | `#111111` | Headings, body |
| Text Secondary | `#666666` | Labels, muted copy |
| Background | `#FFFFFF` | Page background |
| Surface | `#F9F9F9` | Cards, panels |
| Border | `#CCCCCC` | Dividers, card borders |
| Accent Orange | `#ff7f00` | Marquee subtext |

**Typography:**
- Headings — DM Serif Display (Google Fonts)
- Body — Inter (Google Fonts) — weights 400/500/600/700

---

## Production Deployment

### Backend → Railway
1. Push `dce-server` to GitHub
2. New Railway project → Deploy from GitHub repo
3. Set Root Directory to `dce-server`
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL)

### Frontend → Vercel
1. Push this repo to GitHub
2. New Vercel project → Import repo
3. Set **Root Directory** to `dce-client`
4. Add env var: `VITE_API_URL=https://your-railway-app.railway.app/api`
5. Update Railway's `CLIENT_URL` to match your Vercel domain

---

## Contact

**DCE Projects**  
Haldwani, Uttarakhand, India  
📧 services.dce@gmail.com
