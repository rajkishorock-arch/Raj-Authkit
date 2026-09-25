# Security Policy

The security of Raj-AuthKit and the applications built with it is taken very seriously. We appreciate your efforts to responsibly disclose any vulnerabilities found in the project.

---

## Reporting a Vulnerability

**Please DO NOT report security vulnerabilities through public GitHub Issues, discussions, or pull requests.**

If you discover a security vulnerability in Raj-AuthKit:

1. **GitHub Private Vulnerability Reporting (Recommended):**
   Navigate to the repository's [Security Advisories](https://github.com/rajkishorock-arch/Raj-Authkit/security/advisories/new) tab and submit a private security advisory report.
2. Provide a detailed summary including:
   - Type of issue (e.g. session handling flaw, token leak risk, XSS vector)
   - Step-by-step instructions to reproduce the vulnerability
   - Affected components or versions
   - Potential impact
   - Suggested mitigations or patches (if available)

We will review reports promptly and collaborate with you on a responsible fix prior to public disclosure.

---

## Important Security Guidance for Consumers

### 1. Never Post Credentials Publicly
When opening GitHub issues or asking questions, **never share**:
- Your real Firebase API keys or configuration objects
- Firebase service account keys (private keys)
- User passwords or email credentials
- Firebase ID tokens, access tokens, or refresh tokens

### 2. Client-Side Firebase Configuration
In Firebase Web applications, the values in `firebaseConfig` (such as `apiKey`, `projectId`, and `appId`) are client-side project identifiers, not secret keys. They are publicly visible in browser bundles by design.

However, your application's security **must not rely on hiding client configuration**. You must protect your data and authentication flows using:
- **Firebase Authentication Settings:** Restrict authorized domains in the Firebase Console.
- **Firebase Security Rules:** Configure Firestore and Cloud Storage security rules to restrict access based on authenticated user IDs (`request.auth != null && request.auth.uid == ...`).
- **Environment Separation:** Use separate Firebase projects for local development, staging, and production.
