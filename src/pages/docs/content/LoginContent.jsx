import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const loginHeadings = [
  { id: 'method-signature', title: 'Method Signature' },
  { id: 'example', title: 'Code Example' },
  { id: 'error-codes', title: 'Error Handling & Firebase Codes' },
  { id: 'login-form', title: 'Prebuilt LoginForm Component' }
]

export function LoginContent() {
  return (
    <article className="rak-docs-article">
      <h1>login()</h1>
      <p className="rak-docs-lead">
        Authenticates an existing user account using email and password credentials.
      </p>

      <section id="method-signature">
        <h2>Method Signature</h2>
        <CodeBlock
          language="typescript"
          code={`login(email: string, password: string): Promise<UserCredential>`}
        />
        <p><strong>Parameters:</strong></p>
        <ul>
          <li><code>email</code> (string): The registered user's email address.</li>
          <li><code>password</code> (string): The user's account password.</li>
        </ul>
        <p><strong>Returns:</strong> A Promise resolving to the Firebase <code>UserCredential</code> containing user session tokens.</p>
      </section>

      <section id="example">
        <h2>Code Example</h2>
        <p>Calling <code>login()</code> headlessly inside an application handler:</p>
        <CodeBlock
          language="javascript"
          filename="handleLogin.js"
          code={`import { login } from './auth/authService.js'

async function handleSignIn(email, password) {
  try {
    const userCredential = await login(email, password)
    // Successful login: AuthContext automatically receives updated user
    return userCredential.user
  } catch (error) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password.')
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Access temporarily disabled due to too many failed attempts.')
    }
    throw new Error('Sign-in failed. Please try again.')
  }
}`}
        />
      </section>

      <section id="error-codes">
        <h2>Error Handling & Firebase Codes</h2>
        <p>
          Firebase v10+ uses generalized error codes to prevent account enumeration attacks:
        </p>
        <ul>
          <li><code>auth/invalid-credential</code>: The email address or password entered does not match an existing record.</li>
          <li><code>auth/too-many-requests</code>: Temporary lock triggered by repeated failed attempts.</li>
          <li><code>auth/user-disabled</code>: The account has been suspended by an administrator.</li>
          <li><code>auth/network-request-failed</code>: Client could not reach Firebase authentication servers.</li>
        </ul>
      </section>

      <section id="login-form">
        <h2>Prebuilt LoginForm Component</h2>
        <p>
          Use the drop-in <code>&lt;LoginForm /&gt;</code> component with pre-wired form states, disabled submit on pending network requests, and error banners:
        </p>
        <CodeBlock
          language="jsx"
          code={`import { LoginForm } from './components/auth/LoginForm.jsx'

export function SignInView({ onSwitchToSignup }) {
  return <LoginForm onSwitchToSignup={onSwitchToSignup} />
}`}
        />
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/signup" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Signup API</span>
        </Link>
        <Link href="/docs/logout" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Logout API →</span>
        </Link>
      </div>
    </article>
  )
}

export default LoginContent
