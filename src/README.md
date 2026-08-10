# Source Directory

The application source code is organized by responsibility and feature domain.

## Directory Structure

- `assets`: Images and other static assets imported by React components.
- `components/common`: Reusable UI components shared across features.
- `components/features`: Components that belong to a specific business feature.
- `components/layouts`: Shared route and page layouts, including the authentication and dashboard layouts.
- `constants`: Application-wide constants.
- `context`: React contexts and providers for authentication and theme state.
- `hooks`: Reusable React state and behavior, such as asynchronous data loading, chat sessions, favorites, and form state.
- `pages`: Route-level components grouped by Authentication and Dashboard domains.
- `routes/guards`: Guest and protected route access control.
- `services`: API clients and domain-specific request functions.
- `styles`: Global styles and Tailwind CSS layers.
- `test`: Shared test setup.
- `types`: Shared TypeScript models and component contracts.
- `utils`: Reusable framework-independent helper functions.

## Application Structure

`App.tsx` defines the route hierarchy and wraps the application with the theme and authentication providers.

- Guest routes use `GuestRoute` and the shared authentication layout.
- Protected routes use `ProtectedRoute`.
- Dashboard routes use `DashboardLayout`, which renders the sidebar once and displays the active page through React Router's `Outlet`.

Authentication pages share `AuthPageLayout` for their loading state, header, and optional footer. Dashboard pages contain only their page-specific content because the navigation shell is provided by `DashboardLayout`.

## Data Flow

Dependencies should generally flow in this direction:

```text
pages and feature components
  -> reusable components and hooks
  -> services
  -> types and utilities
```

Shared components must not import route-level pages. Services should contain API communication only and must not contain UI logic.

The chat recommendation widgets are rendered lazily when they approach the viewport. Asynchronous requests ignore stale results after their component is unmounted or a newer request starts.

## Services

Domain services expose collection and detail operations where applicable:

- `fareService`: `getFlights()` and `getFlightById(id)`.
- `hotelService`: `getHotels()` and `getHotelById(id)`.
- `travelService`: Place and itinerary requests.
- `authService`: Authentication requests.
- `httpClient`: Shared HTTP client behavior.

Components should call services through reusable hooks such as `useAsyncData` when loading, error, and stale-request handling are required.

## Testing Conventions

- Unit tests are placed next to components or in the relevant `__test__` directory.
- Component tests use the `.test.tsx` suffix.
- Hook and service tests use `.test.ts` unless JSX is required.
- External services must be mocked; tests must not call real APIs.
- Route-dependent components should mock React Router or render with a router context.

Run the main checks with:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

For a broader architectural overview, see [Project Architecture](../docs/ARCHITECTURE.md).
