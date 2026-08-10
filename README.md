# AI Travel

AI Travel is a web application designed to help users plan their trips. Users can sign in, chat with a simulated travel assistant, explore flight and hotel recommendations, and compare flight classes and hotel prices.

> This is a frontend project created for learning and demonstration purposes. The chatbot and access token are currently simulated in the browser, while flight, hotel, and destination data are retrieved from MockAPI.

## Key Features

* Sign in, sign up, forgot password, OTP verification, and onboarding flows.
* Route protection based on authentication status.
* Multiple chat sessions with conversation history automatically saved to `localStorage`.
* Flight, hotel, destination, and itinerary recommendations.
* Flight class selection and detailed flight cost breakdown.
* Hotel listings with an option to enable or disable price comparison.
* Light and dark themes.
* Component catalog and documentation with Storybook.
* Unit and component testing with Vitest and React Testing Library.

## Tech Stack

| Category         | Technology                                                 |
| ---------------- | ---------------------------------------------------------- |
| UI               | React 19, TypeScript, Tailwind CSS                         |
| Build            | Vite 8                                                     |
| Routing          | React Router 7                                             |
| Forms            | React Hook Form                                            |
| HTTP             | Axios                                                      |
| Testing          | Vitest, React Testing Library, Playwright browser provider |
| UI Documentation | Storybook 10                                               |

## Requirements

* A Node.js version compatible with Vite 8 (the latest LTS version is recommended).
* npm.
* An Internet connection to retrieve data from MockAPI.

## Installation and Development

```bash
npm install
npm run dev
```

Vite will display the local development URL in the terminal, typically `http://localhost:5173`.

A demo account is currently available in the mock data:

```text
Email: user@gmaol.com
Password: 123
```

Note: The email address intentionally uses `gmaol` because it matches the current mock data.

## Available Scripts

| Command                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Start the development server                        |
| `npm run build`           | Run type checking and create a production build     |
| `npm run preview`         | Preview the production build locally                |
| `npm run lint`            | Run ESLint checks                                   |
| `npm run typecheck`       | Run TypeScript type checking without emitting files |
| `npm run test`            | Run Vitest in watch mode                            |
| `npm run test:run`        | Run the entire test suite once                      |
| `npm run coverage`        | Run tests and generate a coverage report            |
| `npm run storybook`       | Start Storybook on port `6006`                      |
| `npm run build-storybook` | Build a static Storybook site                       |

## Routes

| URL                | Page                   | Access              |
| ------------------ | ---------------------- | ------------------- |
| `/login`           | Login                  | Guests only         |
| `/register`        | Register               | Guests only         |
| `/forgot-password` | Forgot Password        | Guests only         |
| `/verify-otp`      | OTP Verification       | Guests only         |
| `/reset-password`  | Reset Password         | Guests only         |
| `/onboarding`      | Initial Setup          | Authenticated users |
| `/dashboard`       | Chat                   | Authenticated users |
| `/chats`           | Chat                   | Authenticated users |
| `/chats/fares`     | Flight Class Selection | Authenticated users |
| `/chats/hotels`    | Hotel Selection        | Authenticated users |

Invalid URLs are redirected to `/login`. `GuestRoute` redirects authenticated users away from guest-only pages, while `ProtectedRoute` prevents unauthenticated users from accessing protected pages.

## Project Structure

```text
.
├── .storybook/          # Storybook configuration
├── public/              # Static assets
├── src/
│   ├── assets/          # Application images and assets
│   ├── components/      # Shared and domain-specific components
│   ├── constants/       # Constants, including API URLs
│   ├── context/         # AuthProvider and ThemeProvider
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route-level pages
│   ├── routes/guards/   # ProtectedRoute and GuestRoute
│   ├── services/        # Axios client and API services
│   ├── styles/          # CSS/Tailwind entry point
│   ├── test/            # Shared test setup
│   ├── types/           # TypeScript domain types
│   └── utils/           # Utility functions
├── vite.config.ts
├── vitest.config.ts
└── tailwind.config.js
```

See `docs/ARCHITECTURE.md` for more information about the application's data flow and development conventions.

## API and Configuration

The base URLs are currently declared directly in `src/constants/api.ts`:

* `FLIGHT`: Flight and hotel data.
* `AUTH`: User data used for demo authentication.
* `TRAVEL`: Destination and itinerary data.

The Axios client has a 10-second timeout and automatically attaches the following authorization header when an `accessToken` exists in `localStorage`:

```text
Authorization: Bearer <token>
```

The project currently does not read API URLs from environment variables. For production deployment, the URLs should be moved to `VITE_*` environment variables, and password matching should not be performed on the frontend.

## Checks Before Submitting Changes

Run the following commands before submitting changes:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
npm run build-storybook
```

When adding or modifying a component, update its corresponding `.test.tsx` and `.stories.tsx` files located alongside the component.

## Deployment

The production build is generated in the `dist/` directory:

```bash
npm run build
```

The `vercel.json` file is configured to rewrite requests to `index.html`, allowing React Router routes to work correctly when accessed directly on Vercel.

## Security Notes

* Authentication is currently implemented for demonstration purposes only. The frontend retrieves the user list and compares email addresses and passwords directly.
* Access tokens are simulated and stored in `localStorage`.
* The current authentication mechanism must not be used with real user accounts or sensitive data.
* In a production environment, authentication should be handled by a backend service, passwords must be securely hashed, and tokens should have appropriate expiration and refresh mechanisms.
