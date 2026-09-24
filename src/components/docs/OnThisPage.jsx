import { useState, useEffect } from 'react'

/**
 * Interactive Table of Contents with dynamic IntersectionObserver active section tracking.
 */
export function OnThisPage({ headings = [] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!headings || headings.length === 0) return

    // Track active heading via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: 0
      }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings || headings.length < 2) {
    return null
  }

  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <aside className="rak-docs-toc" aria-label="Table of contents">
      <div className="rak-docs-toc-title">
        <span>On This Page</span>
      </div>
      <ul className="rak-docs-toc-list">
        {headings.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id} className="rak-docs-toc-item">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`rak-docs-toc-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className={`rak-docs-toc-bullet ${isActive ? 'active' : ''}`} aria-hidden="true" />
                <span className="rak-docs-toc-text">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default OnThisPage
