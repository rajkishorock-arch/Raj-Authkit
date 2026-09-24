import { useState } from 'react'
import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { PasswordInput } from '../../../components/ui/PasswordInput.jsx'
import { Alert } from '../../../components/ui/Alert.jsx'
import { Spinner } from '../../../components/ui/Spinner.jsx'

export const componentsHeadings = [
  { id: 'button', title: 'Button' },
  { id: 'input', title: 'Input' },
  { id: 'password-input', title: 'PasswordInput' },
  { id: 'alert', title: 'Alert' },
  { id: 'spinner', title: 'Spinner' },
  { id: 'auth-card', title: 'AuthCard' },
  { id: 'forms', title: 'LoginForm & SignupForm' }
]

export function ComponentsContent() {
  const [btnLoading, setBtnLoading] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [testPassword, setTestPassword] = useState('')

  return (
    <article className="rak-docs-article">
      <h1>UI Components</h1>
      <p className="rak-docs-lead">
        Accessible, reusable UI components built on centralized design tokens with zero external UI library dependencies.
      </p>

      {/* Button */}
      <section id="button">
        <h2>Button</h2>
        <p>Interactive button supporting four stylistic variants and an accessible loading state.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.25rem 0', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button
            variant="primary"
            loading={btnLoading}
            onClick={() => {
              setBtnLoading(true)
              setTimeout(() => setBtnLoading(false), 1500)
            }}
          >
            {btnLoading ? 'Processing...' : 'Click for Loading'}
          </Button>
        </div>
        <CodeBlock
          language="jsx"
          code={`import { Button } from './components/ui/Button.jsx'

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Action</Button>
<Button variant="ghost">Ghost Action</Button>
<Button loading={isLoading} disabled={isLoading}>Submit</Button>`}
        />
      </section>

      {/* Input */}
      <section id="input">
        <h2>Input</h2>
        <p>Accessible text input supporting floating labels, error messages, and helper descriptions.</p>
        <div style={{ maxWidth: '380px', margin: '1.25rem 0' }}>
          <Input
            id="demo-email"
            label="Email Address"
            placeholder="developer@example.com"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            helperText="We will never share your email address."
          />
        </div>
        <CodeBlock
          language="jsx"
          code={`import { Input } from './components/ui/Input.jsx'

<Input
  id="user-email"
  label="Email Address"
  type="email"
  placeholder="dev@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  helperText="Enter your work email address"
  required
/>`}
        />
      </section>

      {/* PasswordInput */}
      <section id="password-input">
        <h2>PasswordInput</h2>
        <p>Secure password input with an accessible show/hide visibility toggle and error integration.</p>
        <div style={{ maxWidth: '380px', margin: '1.25rem 0' }}>
          <PasswordInput
            id="demo-password"
            label="Password"
            placeholder="Enter secure password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
          />
        </div>
        <CodeBlock
          language="jsx"
          code={`import { PasswordInput } from './components/ui/PasswordInput.jsx'

<PasswordInput
  id="account-password"
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={passwordError}
  required
/>`}
        />
      </section>

      {/* Alert */}
      <section id="alert">
        <h2>Alert</h2>
        <p>Accessible status banners for system messages, warnings, and error feedback.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.25rem 0' }}>
          <Alert type="info">Information: Session will synchronize with Firebase Auth.</Alert>
          <Alert type="success">Success: Your authentication credentials were verified.</Alert>
          <Alert type="warning">Warning: Please configure your environment variables in .env.</Alert>
          <Alert type="error">Error: Invalid email or password. Please try again.</Alert>
        </div>
        <CodeBlock
          language="jsx"
          code={`import { Alert } from './components/ui/Alert.jsx'

<Alert type="info">Information notice message</Alert>
<Alert type="success">Action completed successfully</Alert>
<Alert type="warning">System warning notice</Alert>
<Alert type="error">Error message with accessible role="alert"</Alert>`}
        />
      </section>

      {/* Spinner */}
      <section id="spinner">
        <h2>Spinner</h2>
        <p>CSS-animated loading indicator with accessible <code>aria-label</code> and customizable sizing.</p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', margin: '1.25rem 0' }}>
          <Spinner size="sm" ariaLabel="Small loading indicator" />
          <Spinner size="md" ariaLabel="Medium loading indicator" />
          <Spinner size="lg" ariaLabel="Large loading indicator" />
        </div>
        <CodeBlock
          language="jsx"
          code={`import { Spinner } from './components/ui/Spinner.jsx'

<Spinner size="sm" ariaLabel="Checking credentials..." />
<Spinner size="md" color="var(--rak-color-primary)" />
<Spinner size="lg" ariaLabel="Synchronizing user session" />`}
        />
      </section>

      {/* AuthCard */}
      <section id="auth-card">
        <h2>AuthCard</h2>
        <p>Structured card container designed for authentication flows, form wrappers, and modal content.</p>
        <CodeBlock
          language="jsx"
          code={`import { AuthCard } from './components/auth/AuthCard.jsx'

<AuthCard
  title="Sign In to Raj-AuthKit"
  description="Enter your credentials to access your dashboard"
  footer={<span>Need an account? <a href="/signup">Sign up</a></span>}
>
  <form onSubmit={handleSubmit}>
    {/* Form inputs */}
  </form>
</AuthCard>`}
        />
      </section>

      {/* Forms */}
      <section id="forms">
        <h2>LoginForm & SignupForm</h2>
        <p>
          High-level composite components that wire together inputs, validation logic, password toggles, and <code>authService</code> methods.
        </p>
        <CodeBlock
          language="jsx"
          code={`import { LoginForm } from './components/auth/LoginForm.jsx'
import { SignupForm } from './components/auth/SignupForm.jsx'

// Switch between forms with accessible callbacks
<LoginForm onSwitchToSignup={() => setMode('signup')} />
<SignupForm onSwitchToLogin={() => setMode('login')} />`}
        />
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/protected-route" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← ProtectedRoute</span>
        </Link>
        <Link href="/docs/architecture" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Architecture →</span>
        </Link>
      </div>
    </article>
  )
}

export default ComponentsContent
