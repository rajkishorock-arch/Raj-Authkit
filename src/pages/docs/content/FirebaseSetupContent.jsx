import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const firebaseHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'environment-variables', title: 'Environment Variables' },
  { id: 'usage', title: 'Usage' },
  { id: 'validation', title: 'Automatic Environment Validation' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function FirebaseSetupContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / GETTING STARTED</span>
        <h1>Firebase Setup</h1>
        <p className="rak-docs-lead">
          Configuring Firebase Authentication environment parameters in Vite without exposing secrets.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          Vite automatically exposes environment variables prefixed with <code>VITE_</code> to client bundles via <code>import.meta.env</code>. This setup guide outlines the required Firebase Web App configuration keys and explains the built-in startup validation.
        </p>
      </section>

      {/* 2. Environment Variables */}
      <section id="environment-variables" className="rak-docs-section">
        <h2>Environment Variables</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Variable Name</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>VITE_FIREBASE_API_KEY</code></td>
                <td>Yes</td>
                <td>Your Firebase Web API key (e.g. <code>AIzaSyA...</code>).</td>
              </tr>
              <tr>
                <td><code>VITE_FIREBASE_AUTH_DOMAIN</code></td>
                <td>Yes</td>
                <td>Firebase auth domain (e.g. <code>project-id.firebaseapp.com</code>).</td>
              </tr>
              <tr>
                <td><code>VITE_FIREBASE_PROJECT_ID</code></td>
                <td>Yes</td>
                <td>Unique Google Cloud / Firebase project identifier.</td>
              </tr>
              <tr>
                <td><code>VITE_FIREBASE_APP_ID</code></td>
                <td>Yes</td>
                <td>Unique Firebase Web client application identifier.</td>
              </tr>
              <tr>
                <td><code>VITE_FIREBASE_STORAGE_BUCKET</code></td>
                <td>Optional</td>
                <td>Cloud Storage bucket URL (e.g. <code>project-id.appspot.com</code>).</td>
              </tr>
              <tr>
                <td><code>VITE_FIREBASE_MESSAGING_SENDER_ID</code></td>
                <td>Optional</td>
                <td>Cloud Messaging numeric sender ID.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <p>
          A template file is provided at the root of the repository as <code>.env.example</code>. To configure your local environment, copy the template to <code>.env</code> in the project root:
        </p>
        <CodeBlock
          language="bash"
          code={`# Create local environment file from example template
cp .env.example .env`}
        />
        <p>Populate <code>.env</code> with your Firebase project credentials from the Firebase Console:</p>
        <CodeBlock
          language="env"
          filename=".env"
          code={`# ==============================================================================
# Raj-AuthKit Firebase Configuration Template
# Populate these with your Firebase Web App values from Firebase Console
# ==============================================================================

VITE_FIREBASE_API_KEY=AIzaSyA_placeholder_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890`}
        />
      </section>

      {/* 4. Automatic Environment Validation */}
      <section id="validation" className="rak-docs-section">
        <h2>Automatic Environment Validation</h2>
        <p>
          During development, <code>src/firebase/config.js</code> automatically checks for the presence of the required environment variables:
        </p>
        <CodeBlock
          language="javascript"
          filename="src/firebase/config.js"
          code={`const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID'
]

const missingKeys = requiredKeys.filter((key) => !import.meta.env[key])

if (missingKeys.length > 0) {
  console.warn(
    \`[Raj-AuthKit] Missing required Firebase environment variables:\\n\` +
      missingKeys.map((key) => \`  - \${key}\`).join('\\n') +
      \`\\nPlease copy .env.example to .env and configure your Firebase credentials.\`
  )
}`}
        />
      </section>

      {/* 5. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="warning" title="Security Best Practice: Never Commit Credentials">
          <strong>Never commit your <code>.env</code> file to version control.</strong> Verify that <code>.env</code> is listed in your <code>.gitignore</code> file before staging git commits. While Firebase Web API keys are client-facing identifiers, keeping local configuration separate prevents unintentional credential leakage.
        </Callout>
      </section>

      {/* 6. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/quick-start">Quick Start</Link> — 5-step implementation walkthrough</li>
          <li><Link href="/docs/troubleshooting">Troubleshooting Guide</Link> — Diagnosing missing environment variable warnings</li>
          <li><Link href="/docs/security">Security Principles</Link> — Architecture patterns and security standards</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/getting-started" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Installation</span>
        </Link>
        <Link href="/docs/quick-start" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Quick Start →</span>
        </Link>
      </div>
    </article>
  )
}

export default FirebaseSetupContent
