import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const loginHeadings = [
  { id: 'purpose', title: 'Purpose & Overview' },
  { id: 'method-signature', title: 'API Signature' },
  { id: 'example', title: 'Implementation Example' },
  { id: 'behavior', title: 'Lifecycle & Behavior' },
  { id: 'error-codes', title: 'Error Codes & Diagnostics' },
  { id: 'prebuilt-form', title: 'Prebuilt LoginForm' }
]

export function LoginContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Authentication API</span>
        <h1>login()</h1>
        <p className="rak-docs-lead">
          Authenticates an existing user account using email and password credentials, returning tokens and updating global AuthContext.
        </p>
      </header>

      {/* 1. Purpose */}
      <section id="purpose" className="rak-docs-section">
        <h2>Purpose & Overview</h2>
        <p>
          The <code>login()</code> method sends user credentials to Firebase Authentication services. It verifies passwords against secure server-side hashes, retrieves access tokens, and securely hydrates the local user session.
        </p>
      </section>

      {/* 2. API Signature */}
      <section id="method-signature" className="rak-docs-section">
        <h2>API Signature</h2>
        <CodeBlock
          language="typescript"
          filename="src/auth/authService.js"
          code={`login(email: string, password: string): Promise<UserCredential>`}
        />
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.25rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.65rem' }}>Parameter</th>
              <th style={{ padding: '0.65rem' }}>Type</th>
              <th style={{ padding: '0.65rem' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>email</code></td>
              <td style={{ padding: '0.65rem' }}><code>string</code></td>
              <td style={{ padding: '0.65rem' }}>Registered account email address.</td>
            </tr>
            <tr>
              <td style={{ padding: '0.65rem' }}><code>password</code></td>
              <td style={{ padding: '0.65rem' }}><code>string</code></td>
              <td style={{ padding: '0.65rem' }}>Account authentication password.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. Implementation Example */}
      <section id="example" className="rak-docs-section">
        <h2>Implementation Example</h2>
        <p>Calling <code>login()</code> headlessly inside an application handler:</p>
        <CodeBlock
          language="javascript"
          filename="handleSignIn.js"
          code={`import { login } from './auth/authService.js'

async function handleSignIn(email, password) {
  try {
    const userCredential = await login(email, password)
    // Successful login: AuthContext automatically receives updated user
    return userCredential.user
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password.')
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Access temporarily disabled due to too many failed attempts.')
    }
    throw new Error('Sign-in failed. Please try again.')
  }
}`}
        />
      </section>

      {/* 4. Behavior */}
      <section id="behavior" className="rak-docs-section">
        <h2>Lifecycle & Behavior</h2>
        <ol>
          <li>Client submits email and password via <code>login()</code>.</li>
          <li>Firebase Authentication validates credentials over TLS.</li>
          <li>Tokens are saved into local IndexedDB storage under Same-Origin Policy protection.</li>
          <li><code>AuthContext</code> receives the active <code>User</code> instance via <code>onAuthStateChanged</code>.</li>
          <li><code>&lt;ProtectedRoute&gt;</code> recognizes the active session and renders the private view.</li>
        </ol>
      </section>

      {/* 5. Error Codes & Diagnostics */}
      <section id="error-codes" className="rak-docs-section">
        <h2>Error Codes & Diagnostics</h2>
        <Callout type="warning" title="Anti-Enumeration Protection">
          Firebase v10+ returns <code>auth/invalid-credential</code> for both non-existent emails and incorrect passwords to prevent malicious actors from discovering valid accounts.
        </Callout>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1.25rem 0', fontSize: 'var(--rak-font-size-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--rak-color-border-subtle)', textAlign: 'left' }}>
              <th style={{ padding: '0.65rem' }}>Firebase Error Code</th>
              <th style={{ padding: '0.65rem' }}>Cause & Remediation</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>auth/invalid-credential</code></td>
              <td style={{ padding: '0.65rem' }}>Email or password does not match any existing record.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>auth/too-many-requests</code></td>
              <td style={{ padding: '0.65rem' }}>Account temporarily locked due to repeated attempts. Wait several minutes.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--rak-color-border-subtle)' }}>
              <td style={{ padding: '0.65rem' }}><code>auth/user-disabled</code></td>
              <td style={{ padding: '0.65rem' }}>The account has been suspended by an administrator.</td>
            </tr>
            <tr>
              <td style={{ padding: '0.65rem' }}><code>auth/network-request-failed</code></td>
              <td style={{ padding: '0.65rem' }}>Client could not reach Firebase authentication endpoints.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 6. Prebuilt LoginForm */}
      <section id="prebuilt-form" className="rak-docs-section">
        <h2>Prebuilt LoginForm</h2>
        <p>Use the drop-in <code>&lt;LoginForm /&gt;</code> for immediate validation and error feedback:</p>
        <CodeBlock
          language="jsx"
          code={`import { LoginForm } from './components/auth/LoginForm.jsx'

export function LoginView({ onSwitchToSignup }) {
  return <LoginForm onSwitchToSignup={onSwitchToSignup} />
}`}
        />
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/signup" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← signup() API</span>
        </Link>
        <Link href="/docs/logout" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">logout() API →</span>
        </Link>
      </div>
    </article>
  )
}

export default LoginContent
