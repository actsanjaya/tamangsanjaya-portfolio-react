import profileImg from './assets/profile.jpg'
import './App.css'

const skills = [
  {
    name: 'Python',
    detail: 'Automation, data analysis, modeling',
    icon: '🐍',
  },
  {
    name: 'SQL',
    detail: 'Queries, joins, extraction, reporting',
    icon: '🛢️',
  },
  {
    name: 'Power BI',
    detail: 'Dashboards, DAX, data visualization',
    icon: '📊',
  },
  {
    name: 'Advanced Excel',
    detail: 'Modeling, formulas, Power Query',
    icon: '📗',
  },
  {
    name: 'Actuarial Valuation',
    detail: 'Reserving, projections, cashflows',
    icon: '🧮',
  },
  {
    name: 'Automation',
    detail: 'Workflow automation and reporting',
    icon: '⚙️',
  },
]

const projects = [
  {
    title: 'Actuarial Reporting Automation',
    description:
      'Automated recurring actuarial reports including reserving, premiums, movement analysis, and business summaries using Python, SQL, and Excel.',
    tags: ['Python', 'SQL', 'Excel', 'Automation'],
    icon: '📄',
  },
  {
    title: 'Excel to Python Model Conversion',
    description:
      'Converted complex Excel actuarial models into scalable Python scripts to improve performance, auditability, and maintainability.',
    tags: ['Python', 'Pandas', 'NumPy', 'Excel'],
    icon: '💻',
  },
  {
    title: 'Power BI Dashboard',
    description:
      'Designed interactive Power BI dashboards to track KPIs, trends, and key metrics for management reporting and decision-making.',
    tags: ['Power BI', 'DAX', 'SQL', 'Data Modeling'],
    icon: '📈',
  },
]

function App() {
  return (
    <main className="site">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Go to homepage">
          <span className="brandIcon">↗</span>
          <span>Sanjaya Tamang</span>
        </a>

        <nav className="navLinks" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="navButton" href="#contact">
          ✉ Contact Me
        </a>
      </header>

      <section id="home" className="hero">
        <div className="heroContent">
          <p className="eyebrow">Hello, I&apos;m</p>

          <h1>
            Technical
            <span>Actuarial Analyst</span>
          </h1>

          <p className="heroRole">
            Actuarial Analyst <span>•</span> Automation Enthusiast
          </p>

          <p className="heroText">
            I help insurance and financial teams turn complex data into reliable
            insights through actuarial analysis, automation, and reporting. I
            build efficient solutions with Python, SQL, Power BI, and Excel to
            drive accuracy, efficiency, and better decisions.
          </p>

          <div className="heroActions">
            <a className="primaryButton" href="#projects">
              💼 View Projects
            </a>
            <a className="secondaryButton" href="#contact">
              ✉ Get In Touch
            </a>
          </div>

          <div className="heroBadges">
            <span>🛡️ Actuarial Expertise</span>
            <span>⌘ Automation Focused</span>
            <span>▥ Data Driven</span>
          </div>
        </div>

        <div className="heroVisual" aria-label="Professional portrait and data visuals">
          <div className="chartCard floatingCard">
            <strong>Data Into Impact</strong>
            <p>
              Building automated solutions that deliver accuracy, efficiency,
              and clarity.
            </p>
          </div>

          <div className="visualCircle"></div>
          <div className="barChart">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="donutChart"></div>

          <img src={profileImg} alt="Sanjaya Tamang" className="profileImage" />
        </div>
      </section>

      <section className="overviewGrid">
        <article id="about" className="panel aboutPanel">
          <div className="sectionTitle">
            <span className="sectionIcon">👤</span>
            <h2>About Me</h2>
          </div>

          <p>
            I am a detail-oriented actuarial professional with a strong
            technical foundation in data analysis, modeling, and automation. I
            specialize in building reliable actuarial solutions that improve
            accuracy, reduce manual effort, and support better business
            decisions.
          </p>

          <div className="aboutHighlights">
            <span>🎓 Actuarial Background</span>
            <span>💻 Analytical Problem Solver</span>
            <span>🎯 Focused on Business Impact</span>
          </div>
        </article>

        <article id="skills" className="panel">
          <div className="sectionTitle">
            <span className="sectionIcon">⌘</span>
            <h2>Skills</h2>
          </div>

          <div className="skillGrid">
            {skills.map((skill) => (
              <div className="skillCard" key={skill.name}>
                <span className="skillIcon">{skill.icon}</span>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="projects" className="sectionBlock">
        <div className="sectionHeader">
          <div className="sectionTitle">
            <span className="sectionIcon">💼</span>
            <h2>Projects</h2>
          </div>

          <a href="#projects" className="viewLink">
            View All Projects →
          </a>
        </div>

        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div className="projectIcon">{project.icon}</div>

              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tagList">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="sectionBlock experienceBlock">
        <div className="sectionTitle">
          <span className="sectionIcon">📌</span>
          <h2>Technical Focus</h2>
        </div>

        <div className="focusGrid">
          <div>
            <strong>Actuarial Automation</strong>
            <p>Automating recurring actuarial and business reporting workflows.</p>
          </div>
          <div>
            <strong>Model Conversion</strong>
            <p>Moving Excel-based actuarial logic into Python-based workflows.</p>
          </div>
          <div>
            <strong>Data & Dashboarding</strong>
            <p>Building SQL and Power BI reporting outputs for decision support.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div>
          <div className="sectionTitle">
            <span className="sectionIcon">✉</span>
            <h2>Let&apos;s Work Together</h2>
          </div>

          <p>
            I&apos;m open to opportunities in actuarial analytics, automation,
            reporting, and technical actuarial work. Let&apos;s connect and build
            something impactful.
          </p>

          <div className="contactDetails">
            <span>✉ actsanjaya@gmail.com</span>
            <span>📍 Kathmandu, Nepal</span>
            <span>🌐 tamangsanjaya.com.np</span>
          </div>
        </div>

        <div className="contactCard">
          <a href="mailto:actsanjaya@gmail.com">Send a Message</a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Sanjaya Tamang. All rights reserved.</p>
        <div>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  )
}

export default App