import { useState } from 'react'
import { dummyProjects } from '../data/dummy'
import { ProjectCard } from './ProjectCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

const allTechs = [
  'All',
  ...Array.from(new Set(dummyProjects.flatMap((p) => p.techStack ?? []))),
]

export function Projects() {
  const [filter, setFilter] = useState('All')
  const headerRef = useScrollReveal<HTMLDivElement>()

  const filtered =
    filter === 'All'
      ? dummyProjects
      : dummyProjects.filter((p) => p.techStack?.includes(filter))

  return (
    <section className="section" id="projects">
      <div className="projects-header" ref={headerRef}>
        <div className="projects-header-text">
          <h2 className="section-title">Projects I&apos;ve Built</h2>
          <p className="projects-subtitle">
            A practical mix of full-stack builds, API work, and product-focused
            experiments.
          </p>
        </div>
      </div>

      <div className="project-filters">
        {allTechs.map((tech) => (
          <button
            key={tech}
            className={`project-filter-btn ${filter === tech ? 'project-filter-btn--active' : ''}`}
            onClick={() => setFilter(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="projects-empty">No projects found for this filter.</p>
      )}

      <div className="projects-footer">
        <p className="projects-footer-text">
          Project list kept as requested. GitHub project redirection is turned
          off.
        </p>
      </div>
    </section>
  )
}
