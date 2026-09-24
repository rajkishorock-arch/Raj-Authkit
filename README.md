# Raj-AuthKit

Raj-AuthKit is an open-source project intended to become a reusable, lightweight Firebase authentication toolkit for React applications.

## About Raj-AuthKit
Raj-AuthKit is designed to simplify user authentication and user profile management in React applications using Firebase Authentication and Firestore. It will eventually be distributed as a reusable package on npm and maintained as a public open-source repository on GitHub.

## Current Development Status
- **Current Step:** Step 1 — Foundation
- **Open Source:** Yes (MIT Licensed)
- **Firebase Status:** Firebase Authentication is **not implemented yet** (scheduled for upcoming development steps).
- **npm Status:** The project is **not published to npm yet** (package publishing will happen in a future step).
- The base project structure with React, Vite, and JavaScript is cleanly initialized.

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
- [ ] **Step 2: Firebase Setup & Configuration** (Firebase SDK setup, environment variables)
- [ ] **Step 3: Core Auth Context & Provider** (Auth state listener, context creation)
- [ ] **Step 4: Email & Password Authentication** (Sign up, Sign in, Sign out)
- [ ] **Step 5: Social Authentication** (Google sign-in provider)
- [ ] **Step 6: Password Management & Verification** (Password reset, email verification)
- [ ] **Step 7: Firestore User Profile Integration** (User documents, roles)
- [ ] **Step 8: UI Components & Protected Routes** (Ready-to-use auth components, guards)
- [ ] **Step 9: Package Distribution** (Prepare and bundle for npm distribution)

## License

This project is licensed under the [MIT License](LICENSE).

