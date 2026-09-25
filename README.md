# Raj-AuthKit

A lightweight, modular Firebase authentication toolkit for React applications.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI Status](https://img.shields.io/badge/CI-Passing-brightgreen.svg)](.github/workflows/ci.yml)

Raj-AuthKit simplifies user authentication and session management in React applications using Firebase Authentication. It is architected for dual usage: developers can either use the **headless authentication core** (`AuthProvider`, `useAuth`, `authService`) with complete UI freedom, or drop in **pre-built, accessible UI components** (`LoginForm`, `SignupForm`, `AuthCard`) styled with clean design tokens.

---

## Key Features

- **Dual-Mode Architecture:** Use headless authentication hooks/services or drop in ready-made UI forms.
- **Single Source of Truth:** Centralized `onAuthStateChanged` session listener distributed across the React component tree via `useAuth()`.
- **Framework-Agnostic Route Guard:** Reusable `<ProtectedRoute>` component with anti-flicker loading states and customizable unauthenticated fallbacks.
- **Accessible UI Components:** Keyboard-operable forms, password visibility toggles, loading indicators, and semantic alerts.
- **Zero Bloat:** Built purely with React and the official Firebase SDK. No Tailwind, no bulky component frameworks, no runtime overhead.
- **Dual Module Output:** Generates both ECMAScript Modules (ESM) and CommonJS (CJS) library bundles with isolated CSS (`raj-authkit/style.css`).

---

## Package Status

Raj-AuthKit is published to the npm public registry at version **0.1.0**.
Dual module builds (ESM + CommonJS) and standalone component styles are compiled and ready for React and Firebase applications.

---

## Architecture Overview

```text
┌────────────────────────────────────────────────────────┐
│               Firebase Authentication SDK              │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────▼───────────────┐
            │     src/firebase/config.js    │
            │  (initAuth / getFirebaseApp)  │
            └───────────────┬───────────────┘
                            │
            ┌───────────────▼───────────────┐
            │     src/auth/authService.js   │
            │  (signup / login / logout)    │
            └───────────────┬───────────────┘
                            │
            ┌───────────────▼───────────────┐
            │   src/auth/AuthContext.jsx    │
            │  (AuthProvider / onAuthState) │
            └───────┬───────────────┬───────┘
                    │               │
        ┌───────────▼─────┐   ┌─────▼───────────┐
        │  useAuth() Hook │   │  ProtectedRoute │
        └───────────┬─────┘   └─────────────────┘
                    │
        ┌───────────▼───────────────────────────┐
        │        UI Layer (Forms & Primitives)  │
        │   LoginForm | SignupForm | AuthCard   │
        └───────────────────────────────────────┘
```

---

## Quick Start (Package Usage)

### 1. Installation

Install `raj-authkit` and `firebase` from npm:

```bash
npm install raj-authkit firebase
```

#### Peer Dependencies
Raj-AuthKit requires:
- `react` (`>=18.0.0`)
- `react-dom` (`>=18.0.0`)
- `firebase` (`^10.0.0 || ^11.0.0 || ^12.0.0`)

### 2. Import Component Styles (Optional)

If using the pre-built UI components, import the stylesheet once at your app entry point:

```javascript
import 'raj-authkit/style.css'
```

*(If you only use the headless core, importing CSS is not required).*

### 3. Initialize Firebase & Mount AuthProvider

Configure Firebase with your project credentials using either `initAuth(config)`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initAuth, AuthProvider } from 'raj-authkit'
import App from './App.jsx'
import 'raj-authkit/style.css'

initAuth({
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef"
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
```

Or pass `config` directly to `<AuthProvider config={firebaseConfig}>`.

### 4. Consume Authentication State (`useAuth`)

```jsx
import { useAuth } from 'raj-authkit'

export function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) return <p>Checking session status...</p>
  if (!user) return <p>Please sign in.</p>

  return <p>Signed in as: <strong>{user.email}</strong></p>
}
```

### 5. Render Pre-Built Forms

```jsx
import { LoginForm, SignupForm } from 'raj-authkit'

export function AuthPage() {
  const [mode, setMode] = React.useState('login')

  return mode === 'login' ? (
    <LoginForm
      onSuccess={(userCredential) => console.log('Authenticated:', userCredential.user.email)}
      onSwitchToSignup={() => setMode('signup')}
    />
  ) : (
    <SignupForm
      onSuccess={(userCredential) => console.log('Registered:', userCredential.user.email)}
      onSwitchToLogin={() => setMode('login')}
    />
  )
}
```

### 6. Protect Private Routes (`ProtectedRoute`)

```jsx
import { ProtectedRoute } from 'raj-authkit'

export function Dashboard() {
  return (
    <ProtectedRoute fallback={<p>Access restricted. Please sign in.</p>}>
      <div>
        <h2>Protected Account Dashboard</h2>
      </div>
    </ProtectedRoute>
  )
}
```

---

## Public API Reference

| Category | Exported Symbol | Description |
| :--- | :--- | :--- |
| **Core & Auth** | `AuthProvider` | Central React Context provider for authentication state |
| | `AuthContext` | Underlying React Context instance (for custom hooks & testing) |
| | `useAuth` | Custom hook returning `{ user, loading }` |
| | `authService` | Object grouping `{ signup, login, logout, auth }` |
| | `signup` | Direct function creating user account with email/password |
| | `login` | Direct function signing in with email/password |
| | `logout` | Direct function terminating current user session |
| | `auth` | Active Firebase Auth instance (safe lazy proxy) |
| **Configuration** | `initAuth` | Primary initialization helper for consumer Firebase config |
| | `initFirebase` | Documented alias for `initAuth` |
| | `getFirebaseApp` | Retrieves underlying `FirebaseApp` instance for companion SDKs |
| **Route Security** | `ProtectedRoute` | Framework-agnostic route guard component |
| **Auth UI** | `LoginForm` | Pre-built email/password login form |
| | `SignupForm` | Pre-built email/password registration form |
| | `AuthCard` | Card container layout for authentication screens |
| **UI Primitives** | `Button` | Accessible button with loading states and variants |
| | `Input` | Accessible text/email input with label & error display |
| | `PasswordInput` | Accessible password field with visibility toggle |
| | `Alert` | Accessible feedback alert with semantic SVG icons |
| | `Spinner` | Lightweight CSS loading spinner primitive |
| **Utilities** | `getAuthErrorMessage` | Maps Firebase error codes to user-friendly messages |

---

## Local Development & Repository Setup

### Clone & Install
```bash
git clone https://github.com/rajkishorock-arch/Raj-Authkit.git
cd Raj-Authkit
npm install
```

### Configure Local Environment
```bash
cp .env.example .env
```
Fill in your Firebase development project credentials in `.env`.

### Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to browse the documentation website and live playground.

### Build Commands
```bash
# Build the documentation website
npm run build

# Build the npm library package distribution
npm run build:package
```

---

## Project Structure

```text
Raj-AuthKit/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Bug report and feature request templates
│   ├── workflows/ci.yml      # Automated GitHub Actions CI workflow
│   └── pull_request_template.md
├── dist/                     # Distribution output for package builds
├── public/                   # Static assets for demo website
├── src/
│   ├── auth/                 # AuthProvider, useAuth, authService
│   ├── components/
│   │   ├── auth/             # LoginForm, SignupForm, AuthCard, ProtectedRoute
│   │   ├── docs/             # Documentation layout components
│   │   ├── layout/           # Website navigation and header/footer
│   │   ├── sections/         # Landing page and playground sections
│   │   └── ui/               # Button, Input, PasswordInput, Alert, Spinner
│   ├── firebase/             # Firebase configuration and initAuth
│   ├── pages/                # Website and documentation route pages
│   ├── router/               # Client-side router
│   ├── styles/               # Design tokens, component styles, website styles
│   ├── utils/                # Error handling utilities
│   ├── index.js              # Public library package entry point
│   ├── App.jsx               # Root website application component
│   └── main.jsx              # Website entry point
├── CHANGELOG.md              # Version release notes
├── CONTRIBUTING.md           # Contribution guidelines
├── CODE_OF_CONDUCT.md        # Community code of conduct
├── LICENSE                   # MIT License
├── README.md                 # Public project presentation
├── SECURITY.md               # Vulnerability reporting policy
├── package.json              # Package metadata and dependencies
├── vite.config.js            # Website Vite configuration
└── vite.config.lib.js        # Library package Vite configuration
```

---

## Contributing & Community

We welcome contributions from the community! Please review the following guides before contributing:
- [Contributing Guidelines](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Changelog](CHANGELOG.md)

---

## License

This project is licensed under the [MIT License](LICENSE).
