import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const firebaseHeadings = [
  { id: 'env-vars', title: 'Environment Variables' },
  { id: 'env-example', title: 'Template Configuration (.env.example)' },
  { id: 'validation', title: 'Automatic Configuration Validation' },
  { id: 'security-warning', title: 'Security Best Practice' }
]

export function FirebaseSetupContent() {
  return (
    <article className="rak-docs-article">
      <h1>Firebase Setup</h1>
      <p className="rak-docs-lead">
        Configuring Firebase Authentication environment parameters in Vite.
      </p>

      <section id="env-vars">
        <h2>Environment Variables</h2>
        <p>
          Vite automatically exposes environment variables prefixed with <code>VITE_</code> to client bundles via <code>import.meta.env</code>. Raj-AuthKit requires the following Firebase Web App configuration parameters:
        </p>
        <ul>
          <li><code>VITE_FIREBASE_API_KEY</code>: Your Firebase Web API key.</li>
          <li><code>VITE_FIREBASE_AUTH_DOMAIN</code>: Auth domain (e.g. <code>your-app.firebaseapp.com</code>).</li>
          <li><code>VITE_FIREBASE_PROJECT_ID</code>: Unique Firebase project identifier.</li>
          <li><code>VITE_FIREBASE_STORAGE_BUCKET</code>: Cloud Storage bucket URL.</li>
          <li><code>VITE_FIREBASE_MESSAGING_SENDER_ID</code>: Cloud Messaging numeric sender ID.</li>
          <li><code>VITE_FIREBASE_APP_ID</code>: Unique Firebase Web client application identifier.</li>
        </ul>
      </section>

      <section id="env-example">
        <h2>Template Configuration (.env.example)</h2>
        <p>
          A template file is provided at the root of the repository as <code>.env.example</code>. To configure your local environment, copy the template to <code>.env</code> in the project root:
        </p>
        <CodeBlock
          language="bash"
          code={`# Create local environment file from example template
cp .env.example .env`}
        />
        <p>Populate <code>.env</code> with your Firebase project credentials:</p>
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

      <section id="validation">
        <h2>Automatic Configuration Validation</h2>
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

      <section id="security-warning">
        <h2>Security Best Practice</h2>
        <div className="rak-callout rak-callout-warning">
          <div className="rak-callout-title">Important Security Warning</div>
          <p>
            <strong>Never commit your <code>.env</code> file to version control.</strong> Verify that <code>.env</code> is included in your <code>.gitignore</code> file before staging git commits. While Firebase Web API keys are client-facing identifiers, keeping local configuration separate prevents unintentional credential leakage.
          </p>
        </div>
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
