# AI Travel

A React-based travel planning assistant UI with an AI-powered chat interface, flight/hotel recommendations, itinerary planning, and fare comparison.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 3 |
| Routing | React Router v7 |
| State | Zustand |
| Icons | Lucide React |
| HTTP | Axios |
| Validation | Zod |
| Testing | Vitest + Playwright + Storybook |

## Getting Started

```bash
npm install
npm run dev        # Start dev server
npm run build      # TypeScript check + production build
npm run preview    # Preview production build
```

## Project Structure

```
src/
├── pages/              # Route-level pages (Login, Chat, SelectFare, etc.)
├── components/
│   ├── auth/           # Auth layout, route guards (GuestRoute, ProtectedRoute)
│   ├── chat/           # Chat interface (Topbar, Sidebar, MessageList, etc.)
│   ├── fare/           # Fare selection & price details
│   └── ui/             # Reusable primitives (Button, InputField, Card, etc.)
├── hooks/              # Custom hooks (useAuth, useFormState, useClickOutside)
├── context/            # AuthProvider & AuthContext
├── services/           # API service layer (travel, fare, hotel, itinerary)
├── types/              # TypeScript interfaces
├── utils/              # Helper utilities (authHelpers)
├── assets/             # Images & icons
└── styles/             # Tailwind base + custom CSS utilities
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run storybook` | Start Storybook (dev) |
| `npm run build-storybook` | Build Storybook |

## Routes

| Path | Component | Access |
|---|---|---|
| `/login` | Login | Guest only |
| `/register` | Register | Guest only |
| `/forgot-password` | ForgotPassword | Guest only |
| `/verify-otp` | VerifyOTP | Guest only |
| `/reset-password` | ResetPassword | Guest only |
| `/onboarding` | Onboarding | Guest only |
| `/chats` | ChatPage | Protected |
| `/dashboard` | ChatPage | Protected |


email: user@gmaol.com
password: 123
