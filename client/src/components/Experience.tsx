import { useScrollReveal } from '../hooks/useScrollReveal'

const experiences = [
  {
    role: 'MERN Stack Intern',
    company: 'Startappss System India Pvt Ltd, Noida',
    period: 'Jan 2026 — Present',
    description:
      'Developing MERN features, creating REST APIs, integrating MongoDB collections, fixing bugs, and collaborating with the team through Git workflows.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Git'],
  },
  {
    role: 'Intern',
    company: 'Wakencode Technologies',
    period: 'Sep 2023 — Oct 2023',
    description:
      'Gained foundational exposure to Salesforce CRM, assisted with data handling and simple CRM configurations, and observed enterprise workflows in real business environments.',
    tech: ['Salesforce CRM', 'Data Handling', 'Business Workflows'],
  },
  {
    role: 'Education',
    company:
      'MCA: ABES Engineering College (2024 — Aug 2026 Expected) | BCA: RV Higher Education and Technical Institute (2021 — Jun 2024)',
    period: '2021 — Present',
    description:
      'Academic foundation in programming, computer applications, and web development with practical project work.',
    tech: ['C', 'C++', 'JavaScript', 'Python', 'Web Development'],
  },
]

export function Experience() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section" id="experience">
      <div ref={headerRef}>
        <h2 className="section-title">Experience & Learning</h2>
        <p className="experience-subtitle">
          Internships, education, and the work that shaped my approach.
        </p>
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number]
  index: number
}) {
  const ref = useScrollReveal<HTMLDivElement>(0.15, index * 150)

  return (
    <div className="timeline-item" ref={ref}>
      <div className="timeline-dot" />
      <div className="timeline-content">
        <span className="timeline-period">{exp.period}</span>
        <h3 className="timeline-role">{exp.role}</h3>
        <p className="timeline-company">{exp.company}</p>
        <p className="timeline-desc">{exp.description}</p>
        <div className="timeline-tech">
          {exp.tech.map((t) => (
            <span key={t} className="timeline-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
