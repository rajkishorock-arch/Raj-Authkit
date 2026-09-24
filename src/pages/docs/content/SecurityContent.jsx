import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const securityHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'credential-storage', title: 'Credential & Token Storage' },
  { id: 'central-state', title: 'Single-Listener State Management' },
  { id: 'route-protection', title: 'Client-Side Route Protection' },
  { id: 'privacy-masking', title: 'User Identity & Privacy' },
  { id: 'env-separation', title: 'Environment Variable Hygiene' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function SecurityContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / ARCHITECTURE</span>
        <h1>Security Principles</h1>
        <p className="rak-docs-lead">
          Core architectural security patterns, data boundaries, and operational guidelines implemented in Raj-AuthKit.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          Raj-AuthKit is architected around the principle of zero credential leakage. It isolates presentation components from authentication secrets and relies strictly on audited browser sandbox protections.
        </p>
      </section>

      {/* 2. Credential & Token Storage */}
      <section id="credential-storage" className="rak-docs-section">
        <h2>Credential & Token Storage</h2>
        <p>
          Raj-AuthKit delegates credential encryption, password hashing, and token issuance directly to Google Firebase Authentication. The client library does not store raw passwords in memory, <code>localStorage</code>, or plain cookies.
        </p>
        <p>
          Session persistence is handled automatically by the official Firebase Web SDK using browser IndexedDB storage protected by the browser's Same-Origin Policy.
        </p>
      </section>

      {/* 3. Single-Listener State Management */}
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

      {/* 4. Client-Side Route Protection */}
      <section id="route-protection" className="rak-docs-section">
        <h2>Client-Side Route Protection</h2>
        <p>
          While <code>&lt;ProtectedRoute&gt;</code> prevents unauthenticated users from rendering private React UI views, client-side route guards do not replace backend security rules.
        </p>
        <Callout type="warning" title="Backend Security Enforcement">
          Always protect backend APIs, database read/writes (e.g. Firebase Security Rules), and cloud functions using server-side token verification. Client-side guards protect user experience; backend rules protect data.
        </Callout>
      </section>

      {/* 5. User Identity & Privacy */}
      <section id="privacy-masking" className="rak-docs-section">
        <h2>User Identity & Privacy</h2>
        <p>
          Internal database identifiers such as Firebase UIDs and full personal email addresses should never be unnecessarily exposed in public product interfaces or marketing demonstrations.
        </p>
        <p>
          Raj-AuthKit implements strict client-side email masking (e.g. <code>r••••••••@gmail.com</code>) and completely eliminates raw UID output in public presentation layers.
        </p>
      </section>

      {/* 6. Environment Variable Hygiene */}
      <section id="env-separation" className="rak-docs-section">
        <h2>Environment Variable Hygiene</h2>
        <p>
          Never commit production API keys or environment secrets to git repositories. Always use <code>.env.example</code> with placeholder values for source control, and maintain local <code>.env</code> files in <code>.gitignore</code>.
        </p>
      </section>

      {/* 7. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="important" title="Transport Security (HTTPS)">
          Firebase authentication requires an HTTPS context in production environments to protect auth cookies and session tokens against man-in-the-middle attacks. Localhost is permitted during development.
        </Callout>
      </section>

      {/* 8. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/architecture">System Architecture</Link> — Detailed layer-by-layer architectural breakdown</li>
          <li><Link href="/docs/firebase">Firebase Setup</Link> — Safe environment variable configuration</li>
          <li><Link href="/docs/troubleshooting">Troubleshooting Guide</Link> — Resolving common authentication and setup errors</li>
        </ul>
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
