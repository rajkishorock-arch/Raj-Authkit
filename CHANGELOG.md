# Changelog

All notable changes to the **Raj-AuthKit** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-09-25

### Added
- **Headless Authentication Core:**
  - `AuthProvider` React Context provider coordinating Firebase Authentication state via `onAuthStateChanged`.
  - `useAuth()` custom React hook providing reactive `{ user, loading }` state across the application tree.
  - `authService` module and individual functions (`signup`, `login`, `logout`) wrapping Firebase Authentication email/password flows.
  - Lazy proxy discovery for the `auth` instance, avoiding unhandled exceptions when imported prior to Firebase initialization.
  - `initAuth(config)` and `initFirebase(config)` initialization helpers supporting consumer-provided Firebase configuration.
  - `getFirebaseApp()` helper retrieving the active `FirebaseApp` instance for companion Firebase SDKs.
- **Route Security:**
  - `ProtectedRoute` component guarding protected application routes with anti-flicker loading states, fallback renders, and authenticated slot distribution.
- **Authentication UI Components:**
  - `LoginForm` with client-side email format validation, error mapping, and toggle links.
  - `SignupForm` with password length validation and password confirmation matching.
  - `AuthCard` structured container layout for auth screens (header, title, description, content, footer).
- **Design System UI Primitives:**
  - `Button` component with loading spinner states, variants (`primary`, `secondary`, `outline`), and disabled handling.
  - `Input` accessible text/email input with label, required marks, helper text, and error announcements.
  - `PasswordInput` accessible password input with keyboard-operable eye toggle.
  - `Alert` feedback component with semantic SVG icons for `error`, `success`, and `info` types.
  - `Spinner` accessible CSS loading indicator with screen-reader text.
- **Error Diagnostics:**
  - `getAuthErrorMessage()` mapping Firebase Authentication error codes to user-friendly messages.
- **Package Architecture & Distribution:**
  - Dual library build generating both ECMAScript Modules (`dist/raj-authkit.js`) and CommonJS (`dist/raj-authkit.cjs`).
  - Standalone compiled stylesheet (`dist/style.css`) exposing design tokens and component classes without website or documentation dependencies.
  - Package exports map routing `raj-authkit` and `raj-authkit/style.css`.
  - Externalization of peer dependencies (`react`, `react-dom`, `firebase`).
- **Developer Documentation & Website:**
  - Comprehensive documentation covering installation, Firebase setup, quick start, API reference, system architecture, security guidelines, and troubleshooting.
  - Interactive live component playground and auth state test suite.
