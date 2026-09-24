import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const signupHeadings = [
  { id: 'method-signature', title: 'Method Signature' },
  { id: 'example', title: 'Code Example' },
  { id: 'error-codes', title: 'Error Handling & Firebase Codes' },
  { id: 'signup-form', title: 'Prebuilt SignupForm Component' }
]

export function SignupContent() {
  return (
    <article className="rak-docs-article">
      <h1>signup()</h1>
      <p className="rak-docs-lead">
        Creates a new user account in Firebase Authentication using email and password credentials.
      </p>

      <section id="method-signature">
        <h2>Method Signature</h2>
        <CodeBlock
          language="typescript"
          code={`signup(email: string, password: string): Promise<UserCredential>`}
        />
        <p><strong>Parameters:</strong></p>
        <ul>
          <li><code>email</code> (string): The user's valid email address.</li>
          <li><code>password</code> (string): The user's password (must meet minimum Firebase requirement of 6 characters).</li>
        </ul>
        <p><strong>Returns:</strong> A Promise resolving to the Firebase <code>UserCredential</code> object containing user session tokens.</p>
      </section>

      <section id="example">
        <h2>Code Example</h2>
        <p>Calling <code>signup()</code> headlessly inside an application handler:</p>
        <CodeBlock
          language="javascript"
          filename="handleSignup.js"
          code={`import { signup } from './auth/authService.js'

async function handleRegister(email, password) {
  try {
    const userCredential = await signup(email, password)
    // Account created and automatically logged in via Firebase
    return userCredential.user
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email address is already registered.')
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password must be at least 6 characters long.')
    }
    throw new Error('Registration failed. Please check your credentials.')
  }
}`}
        />
      </section>

      <section id="error-codes">
        <h2>Error Handling & Firebase Codes</h2>
        <p>
          <code>authService.signup()</code> re-throws original Firebase error codes, ensuring consumer applications can inspect <code>error.code</code> for granular error messages:
        </p>
        <ul>
          <li><code>auth/email-already-in-use</code>: An account with this email address already exists.</li>
          <li><code>auth/invalid-email</code>: The email address is malformed.</li>
          <li><code>auth/weak-password</code>: Password is shorter than 6 characters.</li>
          <li><code>auth/network-request-failed</code>: Client lost network connectivity.</li>
        </ul>
      </section>

      <section id="signup-form">
        <h2>Prebuilt SignupForm Component</h2>
        <p>
          For rapid integration, use the pre-built <code>&lt;SignupForm /&gt;</code> component, which includes client-side validation, password confirmation matching, and error display:
        </p>
        <CodeBlock
          language="jsx"
          code={`import { SignupForm } from './components/auth/SignupForm.jsx'

export function RegisterView({ onSwitchToLogin }) {
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
          <span className="rak-docs-pager-title">Login API →</span>
        </Link>
      </div>
    </article>
  )
}

export default SignupContent
