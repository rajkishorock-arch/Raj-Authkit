import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const loginHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'usage', title: 'Usage' },
  { id: 'parameters', title: 'Parameters' },
  { id: 'return-value', title: 'Return Value' },
  { id: 'example', title: 'Example' },
  { id: 'error-codes', title: 'Error Codes' },
  { id: 'prebuilt-form', title: 'Prebuilt LoginForm' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function LoginContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / AUTHENTICATION</span>
        <h1>login()</h1>
        <p className="rak-docs-lead">
          Authenticates an existing user account using email and password credentials, returning tokens and updating global AuthContext.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          The <code>login()</code> method sends user credentials to Firebase Authentication services over TLS. It verifies passwords against secure server-side hashes, retrieves access tokens, stores them in browser IndexedDB under Same-Origin Policy protection, and securely hydrates the reactive authentication session.
        </p>
      </section>

      {/* 2. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <CodeBlock
          language="javascript"
          filename="handleSignIn.js"
          code={`import { login } from './auth/authService.js'

const userCredential = await login('developer@example.com', 'SecureP@ssw0rd')
console.log('Logged in user UID:', userCredential.user.uid)`}
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
                <td>Registered account email address (e.g. <code>user@example.com</code>).</td>
              </tr>
              <tr>
                <td><code>password</code></td>
                <td><code>string</code></td>
                <td>Yes</td>
                <td>Account password credential.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Return Value */}
      <section id="return-value" className="rak-docs-section">
        <h2>Return Value</h2>
        <p>
          Returns a <code>Promise&lt;UserCredential&gt;</code> that resolves with the Firebase UserCredential object containing the authenticated <code>User</code> instance and session access tokens.
        </p>
      </section>

      {/* 5. Example */}
      <section id="example" className="rak-docs-section">
        <h2>Example</h2>
        <p>A production-ready asynchronous authentication handler with diagnostic error handling:</p>
        <CodeBlock
          language="javascript"
          filename="signInController.js"
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
                <td><code>auth/invalid-credential</code></td>
                <td>Email or password does not match any existing record.</td>
              </tr>
              <tr>
                <td><code>auth/too-many-requests</code></td>
                <td>Account temporarily locked due to repeated attempts. Wait several minutes.</td>
              </tr>
              <tr>
                <td><code>auth/user-disabled</code></td>
                <td>The account has been suspended by an administrator.</td>
              </tr>
              <tr>
                <td><code>auth/network-request-failed</code></td>
                <td>Client could not reach Firebase authentication endpoints.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Prebuilt LoginForm */}
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

      {/* 8. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="warning" title="Anti-Enumeration Protection">
          Firebase modern SDK returns <code>auth/invalid-credential</code> for both non-existent emails and incorrect passwords to prevent malicious actors from discovering valid accounts.
        </Callout>
      </section>

      {/* 9. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/signup">signup()</Link> — Create new user accounts in Firebase</li>
          <li><Link href="/docs/logout">logout()</Link> — Terminate user sessions and purge tokens</li>
          <li><Link href="/docs/use-auth">useAuth()</Link> — React hook for accessing reactive auth state</li>
          <li><Link href="/docs/protected-route">ProtectedRoute</Link> — Guard private views against unauthenticated access</li>
        </ul>
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
