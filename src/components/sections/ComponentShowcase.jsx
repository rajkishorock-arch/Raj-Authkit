import { useState } from 'react'
import { Button } from '../ui/Button.jsx'
import { Input } from '../ui/Input.jsx'
import { PasswordInput } from '../ui/PasswordInput.jsx'
import { Alert } from '../ui/Alert.jsx'
import { AuthCard } from '../auth/AuthCard.jsx'

export function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState('button')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [inputValue, setInputValue] = useState('developer@example.com')
  const [passwordValue, setPasswordValue] = useState('SuperSecret123!')

  const tabs = [
    { id: 'button', label: 'Button' },
    { id: 'input', label: 'Input' },
    { id: 'password', label: 'PasswordInput' },
    { id: 'alert', label: 'Alert' },
    { id: 'card', label: 'AuthCard' }
  ]

  return (
    <section id="components" className="rak-section" aria-labelledby="showcase-heading">
      <div className="rak-container">
        <div className="rak-section-header">
          <span className="rak-section-badge">UI Library</span>
          <h2 id="showcase-heading" className="rak-section-title">
            Built for consistency. Designed for customization.
          </h2>
          <p className="rak-section-description">
            Explore the actual Raj-AuthKit UI foundation components. Interact with the sandbox tabs below to inspect their behavior, loading states, and accessibility.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="rak-showcase-tabs" role="tablist" aria-label="Component Showcase Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`rak-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="rak-showcase-panel" role="tabpanel">
          {activeTab === 'button' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button variant="primary" onClick={() => setButtonLoading((p) => !p)}>
                  Primary Button
                </Button>
                <Button variant="secondary" onClick={() => setButtonLoading((p) => !p)}>
                  Secondary
                </Button>
                <Button variant="primary" loading={buttonLoading} onClick={() => setButtonLoading(false)}>
                  Loading State
                </Button>
              </div>
              <p style={{ fontSize: 'var(--rak-font-size-xs)', color: 'var(--rak-color-text-muted)' }}>
                Click any button to toggle the interactive loading state. Prevents repeated form submissions.
              </p>
            </div>
          )}

          {activeTab === 'input' && (
            <div style={{ width: '100%', maxWidth: '420px' }}>
              <Input
                label="Email Address"
                type="email"
                name="demo-email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="name@company.com"
                required
                helperText="Accessible field with htmlFor linkage, ARIA attributes, and focus rings."
              />
            </div>
          )}

          {activeTab === 'password' && (
            <div style={{ width: '100%', maxWidth: '420px' }}>
              <PasswordInput
                label="Secure Password"
                name="demo-password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                required
                helperText="Includes keyboard-accessible show/hide visibility toggle with ARIA labels."
              />
            </div>
          )}

          {activeTab === 'alert' && (
            <div style={{ width: '100%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Alert type="error" title="Validation Error">
                Incorrect credentials provided. Please try again.
              </Alert>
              <Alert type="success" title="Action Completed">
                Account created and session authenticated.
              </Alert>
              <Alert type="info" title="System Notice">
                Firebase Authentication token refreshed.
              </Alert>
            </div>
          )}

          {activeTab === 'card' && (
            <div style={{ width: '100%', maxWidth: '440px' }}>
              <AuthCard
                title="AuthCard Container"
                description="Consistent card layout container for authentication screens"
                footer={<span>Footer links, policies, or mode switches</span>}
              >
                <p style={{ fontSize: 'var(--rak-font-size-sm)', color: 'var(--rak-color-text-muted)', lineHeight: 1.6 }}>
                  Provides responsive mobile padding, subtle border tokens, and clean typography hierarchy out of the box.
                </p>
              </AuthCard>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ComponentShowcase
