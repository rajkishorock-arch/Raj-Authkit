/**
 * Table of contents navigation displaying headings in current documentation view.
 */
export function OnThisPage({ headings = [] }) {
  if (!headings || headings.length === 0) {
    return null
  }

  const handleClick = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <aside className="rak-docs-toc" aria-label="On this page navigation">
      <div className="rak-docs-toc-title">On This Page</div>
      <ul className="rak-docs-toc-list">
        {headings.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="rak-docs-toc-link"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default OnThisPage
