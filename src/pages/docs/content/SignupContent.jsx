import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const signupHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'usage', title: 'Usage' },
  { id: 'parameters', title: 'Parameters' },
  { id: 'return-value', title: 'Return Value' },
  { id: 'example', title: 'Example' },
  { id: 'error-codes', title: 'Error Codes' },
  { id: 'prebuilt-form', title: 'Prebuilt SignupForm' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function SignupContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / AUTHENTICATION</span>
        <h1>signup()</h1>
        <p className="rak-docs-lead">
          Creates a new user account in Firebase Authentication using email and password credentials, initializing reactive state automatically.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          The <code>signup()</code> method securely registers a new user in your Firebase project directory over TLS. It validates password length, provisions the user profile with a unique UID, and triggers an immediate token handshake that signs the user in without requiring a separate login step.
        </p>
      </section>

      {/* 2. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <CodeBlock
          language="javascript"
          filename="handleRegistration.js"
          code={`import { signup } from './auth/authService.js'

const userCredential = await signup('newuser@example.com', 'SecureP@ssw0rd')
console.log('Created user UID:', userCredential.user.uid)`}
        />
      </section>

      {/* 3. Parameters */}
      <section id="parameters" className="rak-docs-section">
        <h2>Parameters</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>email</code></td>
                <td><code>string</code></td>
                <td>Yes</td>
                <td>Valid email address format (e.g. <code>user@example.com</code>).</td>
              </tr>
              <tr>
                <td><code>password</code></td>
                <td><code>string</code></td>
                <td>Yes</td>
                <td>Password string satisfying Firebase minimum requirement of 6 characters.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Return Value */}
      <section id="return-value" className="rak-docs-section">
        <h2>Return Value</h2>
        <p>
          Returns a <code>Promise&lt;UserCredential&gt;</code> that resolves with the provisioned Firebase user credential.
        </p>
      </section>

      {/* 5. Example */}
      <section id="example" className="rak-docs-section">
        <h2>Example</h2>
        <p>A complete account registration handler with error mapping:</p>
        <CodeBlock
          language="javascript"
          filename="registerController.js"
          code={`import { signup } from './auth/authService.js'

async function handleRegister(email, password) {
  try {
    const userCredential = await signup(email, password)
    // User session is automatically broadcast through AuthContext
    return userCredential.user
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email address is already registered.')
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password must be at least 6 characters.')
    }
    throw new Error('Registration could not be completed. Please try again.')
  }
}`}
        />
      </section>

      {/* 6. Error Codes */}
      <section id="error-codes" className="rak-docs-section">
        <h2>Error Codes</h2>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Firebase Error Code</th>
                <th>Cause & Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>auth/email-already-in-use</code></td>
                <td>An account with this email address already exists. Direct user to Login.</td>
              </tr>
              <tr>
                <td><code>auth/invalid-email</code></td>
                <td>The email address string does not conform to standard format.</td>
              </tr>
              <tr>
                <td><code>auth/weak-password</code></td>
                <td>Password does not meet the minimum requirement of 6 characters.</td>
              </tr>
              <tr>
                <td><code>auth/network-request-failed</code></td>
                <td>Client could not reach Firebase authentication servers.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Prebuilt SignupForm */}
      <section id="prebuilt-form" className="rak-docs-section">
        <h2>Prebuilt SignupForm</h2>
        <p>
          If you prefer not to write form state and error banners manually, import the pre-built, accessible <code>&lt;SignupForm /&gt;</code>:
        </p>
        <CodeBlock
          language="jsx"
          code={`import { SignupForm } from './components/auth/SignupForm.jsx'

export function RegisterModal({ onSwitchToLogin }) {
  return <SignupForm onSwitchToLogin={onSwitchToLogin} />
}`}
        />
      </section>

      {/* 8. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="info" title="Automatic Session Initialization">
          Upon successful account creation, Firebase immediately signs the user in. You do not need to issue a secondary <code>login()</code> call.
        </Callout>
      </section>

      {/* 9. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/login">login()</Link> — Authenticate existing user accounts</li>
          <li><Link href="/docs/logout">logout()</Link> — Terminate user sessions and clear tokens</li>
          <li><Link href="/docs/use-auth">useAuth()</Link> — React hook for accessing reactive auth state</li>
          <li><Link href="/docs/protected-route">ProtectedRoute</Link> — Guard private views against unauthenticated access</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/quick-start" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Quick Start</span>
        </Link>
        <Link href="/docs/login" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">login() API →</span>
        </Link>
      </div>
    </article>
  )
}

export default SignupContent
