import { useState } from 'react'

/**
 * Reusable CodeBlock component for technical documentation.
 * Provides accessible clipboard copy, syntax language tagging, and horizontal scrolling.
 */
export function CodeBlock({ code, language = 'javascript', filename }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API is not available
      setCopied(false)
    }
  }

  return (
    <div className="rak-codeblock">
      <div className="rak-codeblock-header">
        <span className="rak-codeblock-lang">
          {filename || language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`rak-codeblock-copy ${copied ? 'copied' : ''}`}
          aria-label={copied ? 'Code snippet copied to clipboard' : 'Copy code snippet to clipboard'}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="rak-codeblock-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
