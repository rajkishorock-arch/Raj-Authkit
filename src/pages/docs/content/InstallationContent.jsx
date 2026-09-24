import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Callout } from '../../../components/docs/Callout.jsx'
import { Link } from '../../../router/index.jsx'

export const installationHeadings = [
  { id: 'what-it-does', title: 'What it does' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'usage', title: 'Usage' },
  { id: 'dependencies', title: 'Dependencies' },
  { id: 'notes', title: 'Notes' },
  { id: 'related', title: 'Related' }
]

export function InstallationContent() {
  return (
    <article className="rak-docs-article">
      <header className="rak-docs-hero">
        <span className="rak-docs-eyebrow">DOCUMENTATION / GETTING STARTED</span>
        <h1>Installation</h1>
        <p className="rak-docs-lead">
          Set up the Raj-AuthKit development repository, verify baseline prerequisites, and install local dependencies.
        </p>
      </header>

      {/* 1. What it does */}
      <section id="what-it-does" className="rak-docs-section">
        <h2>What it does</h2>
        <p>
          This guide walks through cloning the Raj-AuthKit source kit, installing necessary node modules, and starting the Vite development server with zero configuration overhead.
        </p>
      </section>

      {/* 2. Prerequisites */}
      <section id="prerequisites" className="rak-docs-section">
        <h2>Prerequisites</h2>
        <p>Ensure your environment satisfies the baseline technical requirements:</p>
        <div className="rak-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Version</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Node.js</strong></td>
                <td><code>&gt;= 18.0.0</code></td>
                <td>Node 20+ LTS recommended for modern ESM and TLS support.</td>
              </tr>
              <tr>
                <td><strong>npm</strong></td>
                <td><code>&gt;= 9.0.0</code></td>
                <td>Standard package manager included with Node.js.</td>
              </tr>
              <tr>
                <td><strong>Firebase Project</strong></td>
                <td>v10+ Modular SDK</td>
                <td>A project configured with Email/Password sign-in enabled in Firebase Console.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Usage */}
      <section id="usage" className="rak-docs-section">
        <h2>Usage</h2>
        <p>Clone the repository and install dependencies locally:</p>

        <h3>1. Clone the repository</h3>
        <CodeBlock
          language="bash"
          code={`git clone https://github.com/rajkishorock-arch/Raj-Authkit.git
cd Raj-Authkit`}
        />

        <h3>2. Install dependencies</h3>
        <CodeBlock
          language="bash"
          code={`npm install`}
        />

        <h3>3. Start local development server</h3>
        <CodeBlock
          language="bash"
          code={`npm run dev`}
        />
        <p>
          The Vite development server will start at <code>http://localhost:3000</code> with hot module replacement (HMR) enabled.
        </p>
      </section>

      {/* 4. Dependencies */}
      <section id="dependencies" className="rak-docs-section">
        <h2>Dependencies</h2>
        <p>
          Raj-AuthKit relies strictly on lightweight core libraries without unnecessary UI dependencies:
        </p>
        <CodeBlock
          language="json"
          filename="package.json"
          code={`{
  "dependencies": {
    "firebase": "^12.19.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.14"
  }
}`}
        />
      </section>

      {/* 5. Notes */}
      <section id="notes" className="rak-docs-section">
        <h2>Notes</h2>
        <Callout type="info" title="npm Distribution (Coming Soon)">
          Vite library bundling and standalone package distribution via <code>npm install raj-authkit</code> will be released in an upcoming milestone. In the current release, import modules directly from the project directory.
        </Callout>
      </section>

      {/* 6. Related */}
      <section id="related" className="rak-docs-section">
        <h2>Related</h2>
        <ul>
          <li><Link href="/docs/firebase">Firebase Setup</Link> — Configure environment credentials</li>
          <li><Link href="/docs/quick-start">Quick Start</Link> — 5-step implementation walkthrough</li>
          <li><Link href="/docs/troubleshooting">Troubleshooting</Link> — Common installation and setup errors</li>
        </ul>
      </section>

      <div className="rak-docs-pager">
        <Link href="/docs" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Previous</span>
          <span className="rak-docs-pager-title">← Introduction</span>
        </Link>
        <Link href="/docs/firebase" className="rak-docs-pager-btn">
          <span className="rak-docs-pager-label">Next</span>
          <span className="rak-docs-pager-title">Firebase Setup →</span>
        </Link>
      </div>
    </article>
  )
}

export default InstallationContent
