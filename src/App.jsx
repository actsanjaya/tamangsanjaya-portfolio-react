import './App.css'

function App() {
  return (
    <main className="site">
      <nav className="navbar">
        <div className="brand">Sanjaya Tamang</div>

        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="heroSection">
        <p className="eyebrow">Actuarial Analyst • Automation Enthusiast</p>

        <h1>
          Building actuarial solutions with Python, SQL, Power BI, and automation.
        </h1>

        <p className="heroText">
          I am Sanjaya Tamang, an actuarial professional focused on combining
          actuarial knowledge with technical tools to improve valuation,
          reporting, analytics, and business automation workflows.
        </p>

        <div className="heroButtons">
          <a className="primaryButton" href="#projects">
            View Projects
          </a>
          <a className="secondaryButton" href="#contact">
            Contact Me
          </a>
        </div>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am interested in becoming a technical actuary by strengthening my
          skills in actuarial modeling, Python automation, SQL-based data
          workflows, Power BI dashboards, and Excel-to-Python model conversion.
        </p>
      </section>

      <section id="skills" className="section">
        <h2>Skills</h2>

        <div className="skillGrid">
          <div className="skillCard">Python</div>
          <div className="skillCard">SQL</div>
          <div className="skillCard">Power BI</div>
          <div className="skillCard">Advanced Excel</div>
          <div className="skillCard">Actuarial Valuation</div>
          <div className="skillCard">Automation</div>
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="projectGrid">
          <article className="projectCard">
            <h3>Actuarial Reporting Automation</h3>
            <p>
              Automated recurring business reports using Python, SQL, and
              styled email outputs.
            </p>
          </article>

          <article className="projectCard">
            <h3>Power BI Dashboard</h3>
            <p>
              Built interactive dashboards with slicers, KPI cards, and
              app-like navigation for business analysis.
            </p>
          </article>

          <article className="projectCard">
            <h3>Excel to Python Model Conversion</h3>
            <p>
              Working on translating actuarial model logic from Excel into
              Python for cleaner and more scalable workflows.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="section contactSection">
        <h2>Contact</h2>
        <p>Email: actsanjaya@gmail.com</p>
        <p>Website: tamangsanjaya.com.np</p>
      </section>

      <footer className="footer">
        © 2026 Sanjaya Tamang. All rights reserved.
      </footer>
    </main>
  )
}

export default App