# 🤖 AGENT.md – AI Coding Assistant Guidelines

This document defines the project-specific architecture, coding standards, testing requirements, and development workflow for AI coding assistants (Cursor, Windsurf, GitHub Copilot, ChatGPT, Claude Code, etc.) working in this repository.

> **Important**
>
> AI assistants should always follow the rules in this document before generating, modifying, or refactoring any code.

---

# 📌 1. Project Overview

## Application

Travel Booking Web Application for Flights and Hotels.

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### State Management & API

* React Hooks
* Axios
* LocalStorage

### Testing

* Vitest
* React Testing Library (RTL)

### UI Documentation

* Storybook (v8+)

---

# 🏗️ 2. Coding Standards & Architecture

## A. TypeScript

* Always write type-safe code.
* Do **not** use `any`.
* Define reusable interfaces and types in the `types/` directory whenever appropriate.
* Handle errors safely by checking:

```ts
if (err instanceof AxiosError) { ... }

if (err instanceof Error) { ... }
```

* Use optional chaining (`?.`) and appropriate fallback values (`||` or `??`) when accessing nested API properties.

---

## B. React Components

### Component Pattern

* Prefer Functional Components.
* Explicitly define props using `interface` or `type`.
* Do not use `React.FC`.
* Export components using named exports whenever possible.
* Keep components focused on a single responsibility.
* Extract reusable logic into custom hooks when appropriate.

### Async UI States

Every page or component that fetches data must support all three states:

1. **Loading**

   * Display a loading spinner or skeleton.

2. **Error**

   * Display an error message.
   * Provide a **Retry** button using:

```ts
window.location.reload()
```

3. **Success**

   * Render the requested data.

---

## C. LocalStorage

When users select a hotel or flight:

* Save the selected item to `localStorage`.
* On subsequent visits, prioritize displaying the previously selected item at the top of the list.
* Keep storage keys consistent across the application.

---

## D. Styling

Use Tailwind CSS utility classes.

Requirements:

* Preserve responsive layouts (`sm`, `md`, `lg`, etc.).
* Maintain consistency with the existing design system.
* Ensure compatibility across desktop and mobile devices.
* Avoid unnecessary inline styles.

---

# 🧪 3. Testing Standards

All unit tests should:

* Be placed beside the component.
* Use the `.test.tsx` naming convention.

---

## A. Mocking Strategy

### Mock API Services

Always mock API services using:

```ts
vi.mock(...)
```

Examples:

* fareService
* hotelService

---

### Mock Router / Auth / Theme

Always mock:

* react-router-dom
* useAuth
* useTheme

This prevents missing context errors during rendering.

---

### Mock window.location.reload()

**Do not** overwrite or delete `window.location`.

Always use:

```ts
const reloadSpy = vi
  .spyOn(window.location, 'reload')
  .mockImplementation(() => {})

// Run test

expect(reloadSpy).toHaveBeenCalledTimes(1)

reloadSpy.mockRestore()
```

---

### Mock API Data

When mock data does not contain every optional property, use safe casting:

```ts
mockData as unknown as FareData[]

mockData as unknown as HotelData[]
```

---

## B. Required Test Coverage

Every Page component (e.g. `SelectFarePage`, `SelectHotelPage`) must include at least the following test cases.

### 1. Loading State

Verify the loading spinner or loading UI is displayed while the API request is pending.

### 2. Success State

Verify the component renders the expected API data correctly.

Examples:

* Flight name
* Hotel name
* Price
* Destination

### 3. User Interaction

Verify user interactions such as:

* Selecting a hotel
* Changing fare class
* Clicking checkboxes
* Selecting flights

### 4. Error State

Verify the error UI is displayed when the API request fails.

### 5. Retry Action

Verify clicking **Retry** calls:

```ts
window.location.reload()
```

---

# 📚 4. Storybook Standards

All Storybook files should:

* Be located beside the component.
* Use the `.stories.tsx` naming convention.

---

## A. Story Structure

Use **CSF 3** (`Meta` + `StoryObj`).

Example:

```ts
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Component>
```

Use a clear title hierarchy, for example:

* Pages/SelectFarePage
* Pages/SelectHotelPage
* Components/Common/Button
* Components/Layout/Header

---

## B. Mocking

### API

Use MSW (`msw-storybook-addon`) or `parameters.msw` to mock API requests.

Never call real APIs inside Storybook.

---

### Callback Props

Use `fn()` from `@storybook/test`.

Example:

```ts
import { fn } from '@storybook/test'

args: {
    onBackToChat: fn(),
    onStartNewChat: fn(),
}
```

---

## C. Required Stories

Every async component should include:

* Default
* Loading
* Error
* Empty (if applicable)
* Mobile View (when responsive)

Stories should:

* Be deterministic
* Not depend on real APIs
* Focus on UI behavior only

---

# 🚀 5. Development Commands

After generating or modifying code, AI assistants should ensure the project passes the following checks.

## Unit Tests

```bash
npm run test
```

Run a specific test:

```bash
npx vitest run src/pages/SelectHotel/SelectHotelPage.test.tsx
```

---

## Type Checking

```bash
npm run typecheck
```

or

```bash
npx tsc --noEmit
```

---

## Lint

```bash
npm run lint
```

---

## Storybook

```bash
npm run storybook
```

---

## Production Build

```bash
npm run build
```

---

# 🤖 6. Cursor AI Instructions

Before generating code, Cursor should:

* Read related files before making changes.
* Reuse existing components whenever possible.
* Follow the existing architecture.
* Keep changes minimal and focused.
* Avoid unnecessary refactoring.
* Preserve existing functionality.
* Do not introduce new dependencies unless explicitly requested.
* Update unit tests when component behavior changes.
* Update Storybook stories when UI changes.
* Generate production-ready code.

---

# 🎯 7. Prompting Guide

To receive the best AI-generated code, provide:

* Target component (`Component.tsx`)
* Related services
* Related types/interfaces
* Existing tests (if applicable)
* Existing Storybook stories (if applicable)
* Expected behavior
* Exact error logs from the terminal or browser console

---

# ✅ 8. Completion Checklist

Before considering a task complete, ensure:

* TypeScript compiles successfully.
* ESLint passes.
* Unit tests pass.
* Storybook builds successfully.
* No unused imports or variables remain.
* No unnecessary `console.log` statements exist.
* Responsive layouts are preserved.
* Existing functionality is not broken.
* Newly created reusable components include both unit tests and Storybook stories.
