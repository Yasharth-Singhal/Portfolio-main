import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiGithub,
  FiX,
  FiZap,
} from 'react-icons/fi'
import type { Project } from '../data/portfolio'

interface ProjectDetailModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  const [showAi, setShowAi] = useState(false)

  useEffect(() => {
    if (!project) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, project])

  useEffect(() => {
    setShowAi(false)
  }, [project])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="overlay-panel overlay-panel--project"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="overlay-close magnetic"
              type="button"
              onClick={onClose}
              aria-label="Close project details"
            >
              <FiX />
            </button>

            <div
              className={`overlay-hero overlay-hero--${project.accent.toLowerCase()}`}
            >
              <span className="overlay-eyebrow">Project Deep Dive</span>
              <h2>{project.name}</h2>
              <p>{project.story}</p>
              <div className="overlay-meta">
                <span>{project.difficulty}</span>
                <span>{project.views} views</span>
                <span>{project.status}</span>
              </div>
              <div className="overlay-actions">
                {project.links.live ? (
                  <a
                    className="button button--primary magnetic"
                    href={project.links.live.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo <FiArrowUpRight />
                  </a>
                ) : null}
                {project.links.github ? (
                  <a
                    className="button button--ghost magnetic"
                    href={project.links.github.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <FiGithub />
                  </a>
                ) : null}
                <button
                  className="button button--secondary magnetic"
                  type="button"
                  onClick={() => setShowAi((value) => !value)}
                >
                  Explain Project <FiZap />
                </button>
              </div>
            </div>

            <div className="overlay-content">
              <div className="detail-grid">
                <article className="detail-card">
                  <h3>Why this project matters</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>

                <article className="detail-card">
                  <h3>AI explanation</h3>
                  <div className="ai-explain-grid">
                    <div>
                      <strong>Problem</strong>
                      <p>{project.aiBreakdown.problem}</p>
                    </div>
                    <div>
                      <strong>Approach</strong>
                      <p>{project.aiBreakdown.approach}</p>
                    </div>
                    <div>
                      <strong>Tech</strong>
                      <p>{project.aiBreakdown.tech}</p>
                    </div>
                    <div>
                      <strong>Challenges</strong>
                      <p>{project.aiBreakdown.challenges}</p>
                    </div>
                    <div>
                      <strong>Outcome</strong>
                      <p>{project.aiBreakdown.outcome}</p>
                    </div>
                  </div>
                </article>
              </div>

              <AnimatePresence>
                {showAi ? (
                  <motion.section
                    className="ai-summary-panel"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                  >
                    <div className="ai-summary-header">
                      <FiZap />
                      <span>AI recruiter-ready summary</span>
                    </div>
                    <p>
                      {project.name} is a strong portfolio proof point because it
                      shows that I can identify a user problem, design a
                      thoughtful UI, wire a practical full-stack solution, and
                      explain trade-offs clearly. It reflects both engineering
                      execution and product thinking.
                    </p>
                  </motion.section>
                ) : null}
              </AnimatePresence>

              <div className="detail-footer">
                <FiCheckCircle />
                <p>
                  This project is positioned to answer what I built, why I built
                  it, and what I learned from it in interviews.
                </p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectDetailModal
