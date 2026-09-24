import { useState } from 'react'
import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { PasswordInput } from '../../../components/ui/PasswordInput.jsx'
import { Alert } from '../../../components/ui/Alert.jsx'
import { Spinner } from '../../../components/ui/Spinner.jsx'
import { AuthCard } from '../../../components/auth/AuthCard.jsx'
import { LoginForm } from '../../../components/auth/LoginForm.jsx'
import { SignupForm } from '../../../components/auth/SignupForm.jsx'

export const componentsHeadings = [
  { id: 'button-playground', title: 'Button' },
  { id: 'input-playground', title: 'Input' },
  { id: 'password-playground', title: 'PasswordInput' },
  { id: 'alert-playground', title: 'Alert' },
  { id: 'spinner-playground', title: 'Spinner' },
  { id: 'authcard-playground', title: 'AuthCard' },
  { id: 'forms-playground', title: 'LoginForm & SignupForm' }
]

export function ComponentsContent() {
  // Button interactive state
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnClickCount, setBtnClickCount] = useState(0)

  // Input interactive state
  const [emailValue, setEmailValue] = useState('')
  const [emailError, setEmailError] = useState('')

  // Password interactive state
  const [passwordValue, setPasswordValue] = useState('')

  // Alert interactive state
  const [activeAlertType, setActiveAlertType] = useState('info')

  // Form preview state
  const [formMode, setFormMode] = useState('login')

  const handleEmailChange = (e) => {
    const val = e.target.value
    setEmailValue(val)
    if (val && !val.includes('@')) {
      setEmailError('Please include an "@" in the email address.')
    } else {
      setEmailError('')
    }
  }

  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">UI Library</span>
        <h1>Component Playground</h1>
        <p className="rak-docs-lead">
          Inspect, test, and copy accessible UI building blocks built on centralized CSS tokens with zero third-party UI library overhead.
        </p>
      </header>

      {/* Button Section */}
      <section id="button-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">Button</h2>
            <p className="rak-comp-desc">
              Multi-variant interactive button supporting primary, secondary, outline, and ghost appearances alongside an accessible loading state.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box">
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                variant="primary"
                onClick={() => setBtnClickCount((c) => c + 1)}
              >
                Primary ({btnClickCount})
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button
                variant="primary"
                loading={btnLoading}
                onClick={() => {
                  setBtnLoading(true)
                  setTimeout(() => setBtnLoading(false), 1400)
                }}
              >
                {btnLoading ? 'Processing...' : 'Simulate Loading'}
              </Button>
            </div>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
          <CodeBlock
            language="jsx"
            code={`import { Button } from './components/ui/Button.jsx'

<Button variant="primary" onClick={handleClick}>
  Primary Action
</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button loading={isLoading} disabled={isLoading}>
  Submit
</Button>`}
          />
        </div>
      </section>

      {/* Input Section */}
      <section id="input-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">Input</h2>
            <p className="rak-comp-desc">
              Accessible form input supporting floating labels, field validation errors, and assistive helper text.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box">
            <div style={{ maxWidth: '420px', width: '100%' }}>
              <Input
                id="doc-input-email"
                label="Email Address"
                placeholder="developer@example.com"
                value={emailValue}
                onChange={handleEmailChange}
                error={emailError}
                helperText="Enter a valid work or personal email address."
                required
              />
            </div>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
          <CodeBlock
            language="jsx"
            code={`import { Input } from './components/ui/Input.jsx'

<Input
  id="user-email"
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  helperText="We will never share your email address."
  required
/>`}
          />
        </div>
      </section>

      {/* PasswordInput Section */}
      <section id="password-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">PasswordInput</h2>
            <p className="rak-comp-desc">
              Security-oriented password input featuring an accessible keyboard-operable visibility toggle button with aria-label updates.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box">
            <div style={{ maxWidth: '420px', width: '100%' }}>
              <PasswordInput
                id="doc-input-password"
                label="Master Password"
                placeholder="Enter password to test toggle"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
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
        </div>
      </section>

      {/* Alert Section */}
      <section id="alert-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">Alert</h2>
            <p className="rak-comp-desc">
              Accessible status banners with contextual semantic roles (note/alert) for informative notices, success alerts, and error states.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {['info', 'success', 'warning', 'error'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveAlertType(type)}
                  className={`rak-tab-btn ${activeAlertType === type ? 'active' : ''}`}
                  style={{ textTransform: 'capitalize' }}
                >
                  {type}
                </button>
              ))}
            </div>

            <Alert type={activeAlertType}>
              {activeAlertType === 'info' && 'Information: AuthContext listener is synchronizing with Firebase.'}
              {activeAlertType === 'success' && 'Success: Authentication credentials verified successfully.'}
              {activeAlertType === 'warning' && 'Warning: Ensure your environment variables are configured in .env.'}
              {activeAlertType === 'error' && 'Error: Invalid credentials. Please check your email and password.'}
            </Alert>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
          <CodeBlock
            language="jsx"
            code={`import { Alert } from './components/ui/Alert.jsx'

<Alert type="info">Information banner notice</Alert>
<Alert type="success">Operation completed successfully</Alert>
<Alert type="warning">Warning: check your configuration</Alert>
<Alert type="error">Error: Invalid email or password</Alert>`}
          />
        </div>
      </section>

      {/* Spinner Section */}
      <section id="spinner-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">Spinner</h2>
            <p className="rak-comp-desc">
              Lightweight CSS animation spinner designed for loading fallbacks and button states with screen-reader aria support.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box">
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="sm" ariaLabel="Small spinner" />
                <div style={{ fontSize: 'var(--rak-font-size-xs)', color: 'var(--rak-color-text-muted)', marginTop: '0.5rem' }}>Small</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="md" color="var(--rak-color-primary)" ariaLabel="Medium spinner" />
                <div style={{ fontSize: 'var(--rak-font-size-xs)', color: 'var(--rak-color-text-muted)', marginTop: '0.5rem' }}>Medium</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Spinner size="lg" ariaLabel="Large spinner" />
                <div style={{ fontSize: 'var(--rak-font-size-xs)', color: 'var(--rak-color-text-muted)', marginTop: '0.5rem' }}>Large</div>
              </div>
            </div>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
          <CodeBlock
            language="jsx"
            code={`import { Spinner } from './components/ui/Spinner.jsx'

<Spinner size="sm" ariaLabel="Loading small..." />
<Spinner size="md" color="var(--rak-color-primary)" />
<Spinner size="lg" ariaLabel="Checking session state..." />`}
          />
        </div>
      </section>

      {/* AuthCard Section */}
      <section id="authcard-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">AuthCard</h2>
            <p className="rak-comp-desc">
              The primary visual container for authentication dialogs, featuring a brand header, content slot, and optional footer.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box" style={{ background: 'var(--rak-color-bg)' }}>
            <div style={{ width: '100%', maxWidth: '440px' }}>
              <AuthCard
                title="Account Access"
                description="Sign in to your Raj-AuthKit account"
                footer={<span style={{ fontSize: '0.85rem' }}>Secured by Firebase Web SDK</span>}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Input label="Email Address" placeholder="you@domain.com" />
                  <PasswordInput label="Password" placeholder="••••••••" />
                  <Button variant="primary" fullWidth style={{ marginTop: '0.5rem' }}>
                    Continue
                  </Button>
                </div>
              </AuthCard>
            </div>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
          <CodeBlock
            language="jsx"
            code={`import { AuthCard } from './components/auth/AuthCard.jsx'

<AuthCard
  title="Sign In to Dashboard"
  description="Enter your credentials below"
  footer={<span>Need an account? <a href="/signup">Sign up</a></span>}
>
  <form onSubmit={handleSubmit}>
    {/* Form contents */}
  </form>
</AuthCard>`}
          />
        </div>
      </section>

      {/* LoginForm & SignupForm Section */}
      <section id="forms-playground" className="rak-docs-section">
        <div className="rak-comp-card">
          <div className="rak-comp-header">
            <h2 className="rak-comp-title">LoginForm & SignupForm</h2>
            <p className="rak-comp-desc">
              Drop-in, validated composite forms connected directly to <code>authService</code> with client-side regex checking and error mapping.
            </p>
          </div>

          <div className="rak-comp-preview-label">LIVE PREVIEW</div>
          <div className="rak-comp-preview-box" style={{ background: 'var(--rak-color-bg)' }}>
            <div style={{ width: '100%', maxWidth: '460px' }}>
              {formMode === 'login' ? (
                <LoginForm onSwitchToSignup={() => setFormMode('signup')} />
              ) : (
                <SignupForm onSwitchToLogin={() => setFormMode('login')} />
              )}
            </div>
          </div>

          <div className="rak-comp-usage-label">Usage</div>
          <CodeBlock
            language="jsx"
            code={`import { useState } from 'react'
import { LoginForm } from './components/auth/LoginForm.jsx'
import { SignupForm } from './components/auth/SignupForm.jsx'

export function AuthenticationModal() {
  const [mode, setMode] = useState('login')

  return mode === 'login' ? (
    <LoginForm onSwitchToSignup={() => setMode('signup')} />
  ) : (
    <SignupForm onSwitchToLogin={() => setMode('login')} />
  )
}`}
          />
        </div>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/protected-route" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← ProtectedRoute</span>
        </Link>
        <Link href="/docs/architecture" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">System Architecture →</span>
        </Link>
      </div>
    </article>
  )
}

export default ComponentsContent
