import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const signupHeadings = [
  { id: 'purpose', title: 'Purpose & Overview' },
  { id: 'method-signature', title: 'API Signature' },
  { id: 'example', title: 'Implementation Example' },
  { id: 'behavior', title: 'Lifecycle & Behavior' },
  { id: 'error-codes', title: 'Error Codes & Diagnostics' },
  { id: 'prebuilt-form', title: 'Prebuilt SignupForm' }
]

export function SignupContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Authentication API</span>
        <h1>signup()</h1>
        <p className="rak-docs-lead">
          Creates a new user account in Firebase Authentication using email and password credentials, initializing reactive state automatically.
        </p>
      </header>

      {/* 1. Purpose */}
      <section id="purpose" className="rak-docs-section">
        <h2>Purpose & Overview</h2>
        <p>
          The <code>signup()</code> method provides a clean, headless bridge to the Firebase modular SDK. It securely submits new user registration credentials over TLS, provisions the user record in your Firebase project directory, and triggers an immediate token handshake.
        </p>
        <Callout type="info" title="Automatic Session Initialization">
          Upon successful account creation, Firebase immediately signs the user in. You do not need to issue a secondary <code>login()</code> call.
        </Callout>
      </section>

      {/* 2. API Signature */}
      <section id="method-signature" className="rak-docs-section">
        <h2>API Signature</h2>
        <CodeBlock
          language="typescript"
          filename="src/auth/authService.js"
          code={`signup(email: string, password: string): Promise<UserCredential>`}
        />
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>email</code></td>
                <td><code>string</code></td>
                <td>Standard email format (e.g. <code>user@domain.com</code>).</td>
              </tr>
              <tr>
                <td><code>password</code></td>
                <td><code>string</code></td>
                <td>Must meet Firebase minimum requirement of 6 characters.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Implementation Example */}
      <section id="example" className="rak-docs-section">
        <h2>Implementation Example</h2>
        <p>Calling <code>signup()</code> directly inside a custom registration handler:</p>
        <CodeBlock
          language="javascript"
          filename="handleRegistration.js"
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

      {/* 4. Behavior */}
      <section id="behavior" className="rak-docs-section">
        <h2>Lifecycle & Behavior</h2>
        <ol>
          <li>Client invokes <code>signup(email, password)</code>.</li>
          <li>Firebase Authentication validates password length and checks directory for existing email.</li>
          <li>New user profile is provisioned with a unique UID.</li>
          <li>Firebase triggers <code>onAuthStateChanged</code>, hydrating <code>AuthContext</code> with the fresh user instance.</li>
          <li>Any active <code>&lt;ProtectedRoute&gt;</code> views render protected application dashboards automatically.</li>
        </ol>
      </section>

      {/* 5. Error Codes & Diagnostics */}
      <section id="error-codes" className="rak-docs-section">
        <h2>Error Codes & Diagnostics</h2>
        <p>
          Errors thrown by <code>signup()</code> preserve native Firebase error properties for robust diagnostics:
        </p>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Firebase Error Code</th>
                <th>Recommended User Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>auth/email-already-in-use</code></td>
                <td>An account with this email address already exists.</td>
              </tr>
              <tr>
                <td><code>auth/invalid-email</code></td>
                <td>Please enter a valid email address.</td>
              </tr>
              <tr>
                <td><code>auth/weak-password</code></td>
                <td>Password should be at least 6 characters.</td>
              </tr>
              <tr>
                <td><code>auth/network-request-failed</code></td>
                <td>Network error. Please check your internet connection.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Prebuilt SignupForm */}
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
