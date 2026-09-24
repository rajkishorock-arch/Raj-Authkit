import { CodeBlock } from '../../../components/docs/CodeBlock.jsx'
import { Link } from '../../../router/index.jsx'

export const installationHeadings = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'repo-usage', title: 'Repository Usage (Current)' },
  { id: 'dependencies', title: 'Project Dependencies' },
  { id: 'npm-distribution', title: 'npm Distribution (Coming Soon)' }
]

export function InstallationContent() {
  return (
    <article className="rak-docs-article">
      <h1>Installation</h1>
      <p className="rak-docs-lead">
        Setting up Raj-AuthKit in your local development environment.
      </p>

      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>Ensure your environment satisfies the baseline technical requirements:</p>
        <ul>
          <li><strong>Node.js:</strong> v18.0.0 or later (Node 20+ recommended)</li>
          <li><strong>npm:</strong> v9.0.0 or later</li>
          <li><strong>Firebase Project:</strong> A Firebase project with Email/Password authentication enabled in the Firebase Console.</li>
        </ul>
      </section>

      <section id="repo-usage">
        <h2>Repository Usage (Current)</h2>
        <p>
          Raj-AuthKit is currently organized as an open-source source kit. To run or integrate the codebase locally, clone the repository and install dependencies:
        </p>
        <CodeBlock
          language="bash"
          code={`# Clone the repository
git clone https://github.com/rajkishorock-arch/Raj-Authkit.git

# Navigate into project directory
cd Raj-Authkit

# Install dependencies
npm install`}
        />
        <p>
          Start the local development server with Vite:
        </p>
        <CodeBlock
          language="bash"
          code={`# Start local dev server at http://localhost:3000
npm run dev`}
        />
      </section>

      <section id="dependencies">
        <h2>Project Dependencies</h2>
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

      <section id="npm-distribution">
        <h2>npm Distribution (Coming Soon)</h2>
        <div className="rak-callout">
          <div className="rak-callout-title">Planned Packaging (Step 8+)</div>
          <p>
            Vite library bundling and distribution via <code>npm install raj-authkit</code> will be released in an upcoming milestone. In the current release, import modules directly from the project directory.
          </p>
        </div>
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
