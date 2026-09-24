import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const securityHeadings = [
  { id: 'credential-storage', title: 'Credential & Token Storage' },
  { id: 'central-state', title: 'Single-Listener State Management' },
  { id: 'route-protection', title: 'Client-Side Route Protection' },
  { id: 'privacy-masking', title: 'User Identity & UID Exposure' },
  { id: 'env-separation', title: 'Environment Variable Hygiene' }
]

export function SecurityContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-section-badge">Security</span>
        <h1>Security Principles</h1>
        <p className="rak-docs-lead">
          Core architectural security patterns, data boundaries, and operational guidelines implemented in Raj-AuthKit.
        </p>
      </header>

      <section id="credential-storage" className="rak-docs-section">
        <h2>Credential & Token Storage</h2>
        <p>
          Raj-AuthKit delegates credential encryption, password hashing, and token issuance directly to Google Firebase Authentication. The client library does not store raw passwords in memory, <code>localStorage</code>, or plain cookies.
        </p>
        <p>
          Session persistence is handled automatically by the official Firebase Web SDK using browser IndexedDB storage protected by the browser's Same-Origin Policy.
        </p>
      </section>

      <section id="central-state" className="rak-docs-section">
        <h2>Single-Listener State Management</h2>
        <p>
          Duplicating authentication event listeners across different components creates synchronization races and memory leaks. Raj-AuthKit centralizes authentication state in <code>AuthContext</code>:
        </p>
        <ul>
          <li>A single <code>onAuthStateChanged</code> listener handles token changes and session refreshes.</li>
          <li>All components, guards, and hooks consume this single source of truth.</li>
          <li>Subscription cleanup is executed in <code>useEffect</code> return callbacks upon provider unmount.</li>
        </ul>
      </section>

      <section id="route-protection" className="rak-docs-section">
        <h2>Client-Side Route Protection</h2>
        <p>
          While <code>&lt;ProtectedRoute&gt;</code> prevents unauthenticated users from rendering private React UI views, client-side route guards do not replace backend security rules.
        </p>
        <Callout type="warning" title="Backend Security Enforcement">
          Always protect backend APIs, database read/writes (e.g. Firebase Security Rules), and cloud functions using server-side token verification. Client-side guards protect user experience; backend rules protect data.
        </Callout>
      </section>

      <section id="privacy-masking" className="rak-docs-section">
        <h2>User Identity & UID Exposure</h2>
        <p>
          Internal database identifiers such as Firebase UIDs and full personal email addresses should never be unnecessarily exposed in public product interfaces or marketing demonstrations.
        </p>
        <p>
          Raj-AuthKit implements strict client-side email masking (e.g. <code>r••••••••@gmail.com</code>) and completely eliminates raw UID output in public presentation layers.
        </p>
      </section>

      <section id="env-separation" className="rak-docs-section">
        <h2>Environment Variable Hygiene</h2>
        <p>
          Never commit production API keys or environment secrets to git repositories. Always use <code>.env.example</code> with placeholder values for source control, and maintain local <code>.env</code> files in <code>.gitignore</code>.
        </p>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs/architecture" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← System Architecture</span>
        </Link>
        <Link href="/docs/troubleshooting" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Troubleshooting Guide →</span>
        </Link>
      </div>
    </article>
  )
}

export default SecurityContent
