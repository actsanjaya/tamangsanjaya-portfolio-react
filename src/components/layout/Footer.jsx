export function Footer({ onNavigate, siteData }) {
  return (
    <footer className="footer">
      <p>
        © {siteData.copyrightYear} {siteData.name}. All rights reserved.
      </p>

      <div className="footerLinks">
        <a
          href="/model"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/model')
          }}
        >
          Model Lab
        </a>
        <a href={siteData.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/')
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
