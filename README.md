# Raj-AuthKit

Raj-AuthKit is an open-source project intended to become a reusable, lightweight Firebase authentication toolkit for React applications.

## About Raj-AuthKit
Raj-AuthKit is designed to simplify user authentication and user profile management in React applications using Firebase Authentication and Firestore. It will eventually be distributed as a reusable package on npm and maintained as a public open-source repository on GitHub.

## Current Development Status
- **Current Step:** Step 8 — Package Architecture & Distribution Readiness
- **Open Source:** Yes (MIT Licensed)
- **Package Architecture:** Dual ESM (`dist/raj-authkit.js`) and CommonJS (`dist/raj-authkit.cjs`) library builds with standalone component stylesheet (`dist/style.css`).
- **npm Status:** **Pending registry release** (package is marked `"private": true` until the dedicated npm publishing step). Do not attempt to install from the public npm registry yet.
- **Library Build Command:** `npm run build:package`
- **Website Build Command:** `npm run build`

## Environment Variables Configuration

Copy `.env.example` to `.env` and fill in your Firebase project credentials from the Firebase Console:

```bash
cp .env.example .env
```

Variables required:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Technology Stack
- **Framework:** React
- **Build Tool:** Vite
- **Language:** JavaScript
- **Package Manager:** npm

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Running Locally

Start the Vite development server:

```bash
npm run dev
```

```bash
npm run build
```

Build library package for distribution:

```bash
npm run build:package
```

## Package Usage (npm)

> **Note:** The package is currently in preparation for npm distribution (`"private": true`) and has not yet been published to the registry. The examples below demonstrate how consumers will use the library once published.

### 1. Installation

```bash
npm install raj-authkit firebase
```

#### Peer Dependencies
Raj-AuthKit requires the following peer dependencies in the consumer project:
- `react` (`>=18.0.0`)
- `react-dom` (`>=18.0.0`)
- `firebase` (`^10.0.0 || ^11.0.0 || ^12.0.0`)

### 2. Import Styles (Optional for UI Components)

If using the pre-built UI components, import the CSS stylesheet once at the entry point of your application:

```javascript
import 'raj-authkit/style.css'
```

### 3. Initialize Firebase & Wrap with AuthProvider

You can initialize Firebase by either:
- Passing your config to `initAuth(config)`:

```jsx
import { initAuth, AuthProvider } from 'raj-authkit'

initAuth({
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
})

export default function App() {
  return (
    <AuthProvider>
      <YourAppContent />
    </AuthProvider>
  )
}
```

- Or passing `config` directly to `<AuthProvider config={firebaseConfig}>`:

```jsx
import { AuthProvider } from 'raj-authkit'

export default function App() {
  return (
    <AuthProvider config={firebaseConfig}>
      <YourAppContent />
    </AuthProvider>
  )
}
```

### 4. Headless Auth Hook (`useAuth`)

```jsx
import { useAuth } from 'raj-authkit'

function UserProfile() {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading session...</p>
  if (!user) return <p>Please log in.</p>

  return <p>Signed in as: {user.email}</p>
}
```

### 5. Pre-Built Authentication Forms

```jsx
import { LoginForm, SignupForm } from 'raj-authkit'

function AuthPage() {
  return (
    <LoginForm
      onSuccess={(userCredential) => console.log('Logged in:', userCredential.user.email)}
      onSwitchToSignup={() => console.log('Navigate to signup')}
    />
  )
}
```

### 6. Protected Route Guard

```jsx
import { ProtectedRoute } from 'raj-authkit'

function DashboardPage() {
  return (
    <ProtectedRoute fallback={<p>Access restricted. Please log in.</p>}>
      <DashboardContent />
    </ProtectedRoute>
  )
}
```

### 7. Public API Reference

| Category | Exports |
| :--- | :--- |
| **Core** | `AuthProvider`, `AuthContext`, `useAuth`, `authService`, `signup`, `login`, `logout`, `auth`, `initAuth`, `initFirebase` |
| **Route Guard** | `ProtectedRoute` |
| **Auth UI** | `LoginForm`, `SignupForm`, `AuthCard` |
| **UI Primitives** | `Button`, `Input`, `PasswordInput`, `Alert`, `Spinner` |
| **Utilities** | `getAuthErrorMessage` |

## Project Structure

```
Raj-AuthKit/
│
├── src/
│   ├── components/      # UI components (buttons, forms, modals)
│   ├── auth/            # Auth context, providers, and state
│   ├── firebase/        # Firebase configuration and client init
│   ├── hooks/           # Custom React hooks (e.g., useAuth)
│   ├── utils/           # Helper functions and validators
│   ├── App.jsx          # Root component
│   ├── index.css        # Base styles
│   └── main.jsx         # App entry point
│
├── public/              # Static assets
├── .gitignore           # Git ignore rules
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
└── vite.config.js       # Vite configuration
```

## Roadmap

- [x] **Step 1: Project Foundation** (React + Vite setup, basic structure)
- [x] **Step 2: Firebase Setup & Configuration** (Firebase SDK setup, environment variables)
- [x] **Step 3: Authentication Service Foundation** (signup, login, logout auth service)
- [x] **Step 4: Core Auth Context & Provider** (Auth state listener, context, useAuth)
- [x] **Step 5: Professional UI Foundation** (Button, Input, PasswordInput, Alert, Spinner, AuthCard)
- [x] **Step 6: Email & Password Authentication UI** (Login & Signup forms, integration)
- [x] **Step 7: Protected Routes & Auth Guard** (Framework-independent ProtectedRoute guard)
- [ ] **Step 8: Social Authentication** (Google sign-in provider)
- [ ] **Step 9: Password Management & Verification** (Password reset, email verification)
- [ ] **Step 10: Firestore User Profile Integration** (User documents, roles)
- [ ] **Step 11: Package Distribution** (Prepare and bundle for npm distribution)

## License

This project is licensed under the [MIT License](LICENSE).

