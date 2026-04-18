# Zomato with Reels Clone

A modern, full-stack food discovery and delivery application that merges traditional food ordering with a TikTok/Instagram Reels-style scrolling video feed. This repository contains both the frontend (React + Vite) and the backend (Node.js + Express + MongoDB) for the platform.

---

## 📂 Main Folder Structure

The root directory acts as a monorepo-style container for the core components of the project:

```text
/Zomato Project
│
├── backend/       # Node.js + Express API backend
├── frontend/      # React + Vite frontend web application
├── vdeos/         # Directory containing sample HD/vertical mp4 videos for the Reels feed
├── .git/          # Git repository data
└── .gitignore     # Global git ignore rules
```

---

## 🖥 Frontend Documentation

The frontend is a lightweight, mobile-first web application built with **React**, **Vite**, and **React Router**. It focuses heavily on presenting a video-driven interface (reels) overlaid with food discovery actions.

### Technologies & Libraries
- **Core:** React 19, Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **HTTP Client:** Axios
- **Styling:** Standard CSS with themed variables (`App.css`, `theme.css`)

### Frontend Directory Structure (`frontend/src/`)
```text
/frontend/src/
├── App.jsx             # Main application orchestrator
├── main.jsx            # React root injection point
├── assets/             # Static images, icons, and fonts
├── components/         # Reusable UI components (e.g., BottomNav)
├── pages/              # View-level page components
│   ├── auth/           # Registration and Login views (User & Food Partner)
│   ├── food-partner/   # Partner dashboards (CreateFood, Profile)
│   └── general/        # Standard views (Home feed, Saved items)
├── routes/             # Routing configuration
│   └── AppRoutes.jsx   # Defines client-side paths mapped to pages
└── styles/             # Global CSS and theme specific styling
```

### Route Index
- **Auth Paths:**
  - `/register` - Choose Account Type
  - `/user/register` & `/user/login` - Standard User Auth
  - `/food-partner/register` & `/food-partner/login` - Food Partner Auth
- **Core Paths:**
  - `/` - Home Page / Reels Feed (Includes BottomNav)
  - `/saved` - Saved recipes/reels (Includes BottomNav)
- **Partner Functions:**
  - `/create-food` - Upload new food/reel items
  - `/food-partner/:id` - Dynamic partner profile pages

---

## ⚙️ Backend Documentation

The backend is a REST-like API built using **Node.js, Express, and MongoDB**, providing endpoints for user authentication, partner management, and food content aggregation.

### Technologies & Libraries
- **Framework:** Express.js (v5)
- **Database Model:** Mongoose (MongoDB)
- **Security:** bcryptjs (hashing), jsonwebtoken (JWT auth)
- **File Parsing & Storage:** multer (form-data processing), ImageKit (media CDN delivery for images/reels)
- **Utilities:** cors, dotenv, cookie-parser, uuid

### Backend Directory Structure (`backend/src/`)
```text
/backend/src/
├── app.js               # Express application setup, middleware, and route mounting
├── server.js            # Node HTTP server entry point (requires app.js)
├── db/                  # Database connections
│   └── db.js            # Mongoose connection logic
├── controllers/         # Business logic functions mapped to routes
│   ├── auth.controller.js
│   ├── food.controller.js
│   └── food-partner.controller.js
├── middlewares/         # Request interceptors (e.g., JWT guard, Multer configs, error handling)
├── models/              # Mongoose database schemas
│   ├── user.model.js
│   ├── foodpartner.model.js
│   ├── food.model.js
│   ├── likes.model.js
│   └── save.model.js
├── routes/              # Express API endpoint definitions
│   ├── auth.routes.js
│   ├── food.routes.js
│   └── food-partner.routes.js
└── services/            # Additional external integrations or complex generic logic
```

### Core Data Models
1. **User / FoodPartner:** Manages authentication, identity, and profile metadata.
2. **Food:** Represents a consumable menu item, typically linked to a short-form video/reel via ImageKit URLs.
3. **Likes & Saves:** Tracks interactions between users and food items for customized feeds and analytics.

---

## 🚀 Getting Started

### Starting the Backend
1. Open a terminal and navigate to the `backend` folder: `cd backend`
2. Ensure you have populated `.env` based on `.env.example`.
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

### Starting the Frontend
1. Open up a separate terminal and navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the Vite development server: `npm run dev`
4. The frontend will be hosted typically at `http://localhost:5173`.
