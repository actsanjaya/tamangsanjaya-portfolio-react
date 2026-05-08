export function Footer({ onNavigate, siteData }) {
  return (
    <footer className="footer">
      <p>
        © {siteData.copyrightYear} {siteData.name}. All rights reserved.
      </p>
      <div>
        <a
          href="/default"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/default')
          }}
        >
          Default Mode
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
