import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const troubleshootingHeadings = [
  { id: 'missing-env', title: 'Missing Firebase Environment Variables' },
  { id: 'invalid-api-key', title: 'FirebaseError: auth/invalid-api-key' },
  { id: 'invalid-credential', title: 'FirebaseError: auth/invalid-credential' },
  { id: 'env-prefix', title: 'Environment Variables Not Loading in Vite' },
  { id: 'protected-fallback', title: 'Protected Route Briefly Shows Fallback' }
]

export function TroubleshootingContent() {
  return (
    <article className="rak-docs-article">
      <h1>Troubleshooting</h1>
      <p className="rak-docs-lead">
        Diagnostic solutions for common setup issues and runtime errors in Raj-AuthKit.
      </p>

      <section id="missing-env">
        <h2>Missing Firebase Environment Variables</h2>
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

      <section id="invalid-api-key">
        <h2>FirebaseError: auth/invalid-api-key</h2>
        <p><strong>Symptom:</strong> The browser console errors when executing signup or login with <code>FirebaseError: Firebase: Error (auth/invalid-api-key)</code>.</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Check that <code>VITE_FIREBASE_API_KEY</code> does not contain quotation marks or trailing whitespace.</li>
          <li>Ensure your Firebase Web API key is enabled for Identity Toolkit API in Google Cloud Console.</li>
          <li>Verify you copied the Web API Key, not an Admin SDK service account key.</li>
        </ul>
      </section>

      <section id="invalid-credential">
        <h2>FirebaseError: auth/invalid-credential</h2>
        <p><strong>Symptom:</strong> Sign-in fails with <code>auth/invalid-credential</code>.</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Firebase modern SDK returns this generic code for both non-existent emails and incorrect passwords to prevent account enumeration.</li>
          <li>Ensure the email/password combination was registered first via the Signup form.</li>
          <li>Verify Email/Password authentication is enabled under Firebase Console &gt; Authentication &gt; Sign-in method.</li>
        </ul>
      </section>

      <section id="env-prefix">
        <h2>Environment Variables Not Loading in Vite</h2>
        <p><strong>Symptom:</strong> <code>import.meta.env</code> keys evaluate to <code>undefined</code>.</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Vite requires client variables to be explicitly prefixed with <code>VITE_</code>. Variables lacking this prefix will not be exposed to the browser.</li>
          <li>Ensure <code>.env</code> is located in the root project folder, not inside <code>src/</code>.</li>
        </ul>
      </section>

      <section id="protected-fallback">
        <h2>Protected Route Briefly Shows Fallback</h2>
        <p><strong>Symptom:</strong> The login screen momentarily flashes before rendering protected dashboard views on page reload.</p>
        <p><strong>Solution:</strong></p>
        <p>
          Always check <code>loading</code> before evaluating <code>user</code> in custom guards, or use the pre-built <code>&lt;ProtectedRoute&gt;</code> component which handles this lifecycle state automatically.
        </p>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/security" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Security</span>
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
