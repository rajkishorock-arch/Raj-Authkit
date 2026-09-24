import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const troubleshootingHeadings = [
  { id: 'missing-env', title: 'Missing Environment Variables' },
  { id: 'invalid-api-key', title: 'FirebaseError: auth/invalid-api-key' },
  { id: 'invalid-credential', title: 'FirebaseError: auth/invalid-credential' },
  { id: 'env-prefix', title: 'Environment Variables Not Loading' },
  { id: 'protected-fallback', title: 'Protected Route Shows Fallback' }
]

export function TroubleshootingContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Support</span>
        <h1>Troubleshooting Guide</h1>
        <p className="rak-docs-lead">
          Diagnostic checklists and remediation steps for common configuration errors and runtime issues.
        </p>
      </header>

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

      <section id="invalid-api-key" className="rak-docs-section">
        <h2>FirebaseError: auth/invalid-api-key</h2>
        <p><strong>Symptom:</strong> The browser console errors when executing signup or login with <code>FirebaseError: Firebase: Error (auth/invalid-api-key)</code>.</p>
        <Callout type="warning" title="API Key Verification">
          Ensure your Firebase Web API key does not contain quotation marks or accidental whitespace, and that Identity Toolkit API is active in Google Cloud Console.
        </Callout>
      </section>

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

      <section id="env-prefix" className="rak-docs-section">
        <h2>Environment Variables Not Loading</h2>
        <p><strong>Symptom:</strong> <code>import.meta.env</code> keys evaluate to <code>undefined</code>.</p>
        <p><strong>Remediation:</strong></p>
        <ul>
          <li>Vite requires client variables to be explicitly prefixed with <code>VITE_</code>. Variables lacking this prefix will not be exposed to the browser.</li>
          <li>Ensure <code>.env</code> is located in the root project folder, not inside <code>src/</code>.</li>
        </ul>
      </section>

      <section id="protected-fallback" className="rak-docs-section">
        <h2>Protected Route Shows Fallback</h2>
        <p><strong>Symptom:</strong> The login screen momentarily flashes before rendering protected dashboard views on page reload.</p>
        <p><strong>Remediation:</strong></p>
        <p>
          Always check <code>loading</code> before evaluating <code>user</code> in custom guards, or use the pre-built <code>&lt;ProtectedRoute&gt;</code> component which handles this lifecycle state automatically.
        </p>
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
