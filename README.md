# Raj-AuthKit

Raj-AuthKit is an open-source project intended to become a reusable, lightweight Firebase authentication toolkit for React applications.

## About Raj-AuthKit
Raj-AuthKit is designed to simplify user authentication and user profile management in React applications using Firebase Authentication and Firestore. It will eventually be distributed as a reusable package on npm and maintained as a public open-source repository on GitHub.

## Current Development Status
- **Current Step:** Step 5 — Professional UI Foundation
- **Open Source:** Yes (MIT Licensed)
- **UI Foundation:** Created reusable, accessible presentation components in `src/components/ui/` (`Button`, `Input`, `PasswordInput`, `Alert`, `Spinner`), layout container `src/components/auth/AuthCard.jsx`, and central design tokens in `src/styles/theme.css`.
- **Pending Future Steps:** Concrete authentication flows/forms (`LoginForm`, `SignupForm`), social auth, and user profiles are **not implemented yet** and are scheduled for upcoming steps.
- **npm Status:** The project is **not published to npm yet** (package publishing will happen in a future step).
- The base project structure with React, Vite, and JavaScript is cleanly initialized.

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

Build for production:

```bash
npm run build
```

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
- [ ] **Step 6: Email & Password Authentication UI** (Login & Signup forms, integration)
- [ ] **Step 7: Social Authentication** (Google sign-in provider)
- [ ] **Step 8: Password Management & Verification** (Password reset, email verification)
- [ ] **Step 9: Firestore User Profile Integration** (User documents, roles)
- [ ] **Step 10: Protected Routes & Package Distribution** (Route guards, npm bundling)

## License

This project is licensed under the [MIT License](LICENSE).

