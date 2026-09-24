import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const troubleshootingHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'missing-env', title: 'Missing Environment Variables' },
  { id: 'invalid-api-key', title: 'FirebaseError: auth/invalid-api-key' },
  { id: 'invalid-credential', title: 'FirebaseError: auth/invalid-credential' },
  { id: 'env-prefix', title: 'Environment Variables Not Loading' },
  { id: 'protected-fallback', title: 'Protected Route Shows Fallback' },
  { id: 'diagnostic-table', title: 'Diagnostic Checklist' },
  { id: 'related', title: 'Related' }
]

export function TroubleshootingContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / TROUBLESHOOTING</span>
        <h1>Troubleshooting Guide</h1>
        <p className="rak-docs-lead">
          Diagnostic checklists and remediation steps for common configuration errors and runtime issues.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          This troubleshooting reference catalogs common errors encountered when configuring Firebase, loading environment variables, or setting up route guards in modern React environments.
        </p>
      </section>

      {/* 2. Missing Environment Variables */}
      <section id="missing-env" className="rak-docs-section">
        <h2>Missing Environment Variables</h2>
        <p><strong>Symptom:</strong> Development console displays the warning:</p>
        <CodeBlock
          language="text"
          code={`[Raj-AuthKit] Missing required Firebase environment variables:
  - VITE_FIREBASE_API_KEY
  - VITE_FIREBASE_AUTH_DOMAIN
  - VITE_FIREBASE_PROJECT_ID
  - VITE_FIREBASE_APP_ID
Please copy .env.example to .env and configure your Firebase credentials.`}
        />
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Ensure a file named <code>.env</code> exists in the root directory (alongside <code>package.json</code>).</li>
          <li>Verify all required variables have valid, non-empty values from your Firebase Console.</li>
          <li>Restart the Vite dev server with <code>npm run dev</code> (Vite caches environment variables on process startup).</li>
        </ol>
      </section>

      {/* 3. FirebaseError: auth/invalid-api-key */}
      <section id="invalid-api-key" className="rak-docs-section">
        <h2>FirebaseError: auth/invalid-api-key</h2>
        <p><strong>Symptom:</strong> The browser console errors when executing signup or login with <code>FirebaseError: Firebase: Error (auth/invalid-api-key)</code>.</p>
        <Callout type="warning" title="API Key Verification">
          Ensure your Firebase Web API key does not contain quotation marks or accidental whitespace, and that Identity Toolkit API is active in Google Cloud Console.
        </Callout>
      </section>

      {/* 4. FirebaseError: auth/invalid-credential */}
      <section id="invalid-credential" className="rak-docs-section">
        <h2>FirebaseError: auth/invalid-credential</h2>
        <p><strong>Symptom:</strong> Sign-in fails with <code>auth/invalid-credential</code>.</p>
        <p><strong>Remediation:</strong></p>
        <ul>
          <li>Firebase modern SDK returns this generic code for both non-existent emails and incorrect passwords to prevent account enumeration.</li>
          <li>Ensure the email/password combination was registered first via the Signup form.</li>
          <li>Verify Email/Password authentication is enabled under Firebase Console &gt; Authentication &gt; Sign-in method.</li>
        </ul>
      </section>

      {/* 5. Environment Variables Not Loading */}
      <section id="env-prefix" className="rak-docs-section">
        <h2>Environment Variables Not Loading</h2>
        <p><strong>Symptom:</strong> <code>import.meta.env</code> keys evaluate to <code>undefined</code>.</p>
        <p><strong>Remediation:</strong></p>
        <ul>
          <li>Vite requires client variables to be explicitly prefixed with <code>VITE_</code>. Variables lacking this prefix will not be exposed to the browser.</li>
          <li>Ensure <code>.env</code> is located in the root project folder, not inside <code>src/</code>.</li>
        </ul>
      </section>

      {/* 6. Protected Route Shows Fallback */}
      <section id="protected-fallback" className="rak-docs-section">
        <h2>Protected Route Shows Fallback</h2>
        <p><strong>Symptom:</strong> The login screen momentarily flashes before rendering protected dashboard views on page reload.</p>
        <p><strong>Remediation:</strong></p>
        <p>
          Always check <code>loading</code> before evaluating <code>user</code> in custom guards, or use the pre-built <code>&lt;ProtectedRoute&gt;</code> component which handles this lifecycle state automatically.
        </p>
      </section>

      {/* 7. Diagnostic Checklist */}
      <section id="diagnostic-table" className="rak-docs-section">
        <h2>Diagnostic Checklist</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Primary Cause</th>
                <th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Missing Firebase variables</td>
                <td><code>.env</code> not created in project root</td>
                <td>Run <code>cp .env.example .env</code> and fill in credentials</td>
              </tr>
              <tr>
                <td><code>auth/invalid-api-key</code></td>
                <td>Trailing space or quotes in key</td>
                <td>Inspect <code>VITE_FIREBASE_API_KEY</code> for accidental quotes</td>
              </tr>
              <tr>
                <td><code>auth/invalid-credential</code></td>
                <td>User does not exist or wrong password</td>
                <td>Register account via <code>signup()</code> first</td>
              </tr>
              <tr>
                <td>Auth flashing on reload</td>
                <td>Guard doesn't check <code>loading</code> flag</td>
                <td>Use <code>&lt;ProtectedRoute&gt;</code> which waits for session verification</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/firebase">Firebase Setup</Link> — Environment configuration instructions</li>
          <li><Link href="/docs/security">Security Principles</Link> — Credential security guidelines</li>
          <li><Link href="/docs/quick-start">Quick Start</Link> — Standard implementation workflow</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/security" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Security Principles</span>
        </Link>
        <Link href="/docs" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Return to Start</span>
          <span className="rak-docs-pager-title">Introduction →</span>
        </Link>
      </div>
    </article>
  )
}

export default TroubleshootingContent
