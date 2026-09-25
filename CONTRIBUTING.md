# Contributing to Raj-AuthKit

Thank you for your interest in contributing to Raj-AuthKit! We welcome contributions that help improve this modular authentication toolkit for the React and Firebase community.

---

## Getting Started

### 1. Fork & Clone
Fork the repository on GitHub, then clone your fork locally:

```bash
git clone https://github.com/<your-username>/Raj-Authkit.git
cd Raj-Authkit
```

### 2. Install Dependencies
Install the required project dependencies:

```bash
npm install
```

### 3. Local Development Setup
To test authentication flows locally, configure your Firebase credentials:

```bash
cp .env.example .env
```

Fill in your development Firebase project credentials in `.env` (these are strictly ignored by Git and will never be committed).

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to interact with the documentation, component showcase, and authentication playground.

---

## Development Workflow

### Building the Project

Always ensure both the website and library package builds succeed before opening a pull request:

```bash
# Build the website and documentation
npm run build

# Build the npm library package distribution
npm run build:package
```

### Contribution Guidelines

To keep Raj-AuthKit lightweight, secure, and maintainable, please follow these principles:

1. **Keep Changes Focused:** Submit small, targeted pull requests addressing a single bug fix or feature.
2. **Zero Bloat:** Do not introduce UI frameworks, heavy utility libraries, or unnecessary dependencies. Raj-AuthKit relies strictly on Vanilla React, Vite, and the Firebase SDK.
3. **Never Commit Secrets:** Ensure `.env`, Firebase credentials, API keys, or private tokens are never committed.
4. **Preserve Authentication Integrity:** Do not alter core authentication behaviors unless fixing a verified bug or extending documented capabilities.
5. **Update Documentation:** If you add or modify a public API, update the corresponding documentation files under `src/pages/docs/content/` and `README.md`.
6. **Follow Modern React Patterns:** Use functional components, React Hooks, accessible HTML markup, and semantic CSS variables.

---

## Submitting a Pull Request

1. Create a descriptive feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes using conventional commit messages (e.g., `feat: ...`, `fix: ...`, `docs: ...`):
   ```bash
   git commit -m "feat: add support for custom error callback"
   ```
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `main` branch of `rajkishorock-arch/Raj-Authkit`.
5. Complete the checklist in the PR template.

Thank you for helping make Raj-AuthKit better!
