import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCopy, FiLink2, FiShare2, FiX } from 'react-icons/fi'
import type { BlogPost } from '../data/portfolio'

interface BlogReaderProps {
  blog: BlogPost | null
  onClose: () => void
}

export function BlogReader({ blog, onClose }: BlogReaderProps) {
  const [progress, setProgress] = useState(0)

  const shareUrl = useMemo(() => {
    if (!blog) {
      return window.location.href
    }

    const url = new URL(window.location.href)
    url.hash = `blog-${blog.id}`
    return url.toString()
  }, [blog])

  useEffect(() => {
    if (!blog) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [blog, onClose])

  useEffect(() => {
    if (!blog) {
      return
    }

    const panel = document.querySelector<HTMLElement>('.blog-reader-body')
    if (!panel) {
      return
    }

    const updateProgress = () => {
      const max = panel.scrollHeight - panel.clientHeight
      const next = max > 0 ? (panel.scrollTop / max) * 100 : 0
      setProgress(next)
    }

    updateProgress()
    panel.addEventListener('scroll', updateProgress)
    return () => panel.removeEventListener('scroll', updateProgress)
  }, [blog])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      window.prompt('Copy this link:', shareUrl)
    }
  }

  const handleShare = async () => {
    if (navigator.share && blog) {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: shareUrl,
      })
      return
    }

    await handleCopy()
  }

  return (
    <AnimatePresence>
      {blog ? (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="overlay-panel overlay-panel--blog"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="blog-progress-track">
              <motion.div
                className="blog-progress-bar"
                animate={{ width: `${progress}%` }}
              />
            </div>

            <header className="blog-reader-header">
              <div>
                <span className="overlay-eyebrow">{blog.category} Article</span>
                <h2>{blog.title}</h2>
                <p>{blog.excerpt}</p>
                <div className="overlay-meta">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                  <span>{blog.sections.length} sections</span>
                </div>
              </div>
              <div className="blog-reader-actions">
                <button
                  className="overlay-icon-button magnetic"
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy blog link"
                >
                  <FiCopy />
                </button>
                <button
                  className="overlay-icon-button magnetic"
                  type="button"
                  onClick={handleShare}
                  aria-label="Share blog"
                >
                  <FiShare2 />
                </button>
                <button
                  className="overlay-icon-button magnetic"
                  type="button"
                  onClick={onClose}
                  aria-label="Close blog reader"
                >
                  <FiX />
                </button>
              </div>
            </header>

            <div className="blog-reader-layout">
              <aside className="blog-reader-toc">
                <h3>Table of contents</h3>
                <ul>
                  {blog.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>
                        <FiLink2 />
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="blog-reader-body">
                {blog.sections.map((section) => (
                  <section key={section.id} id={section.id} className="blog-copy">
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                    {section.bullets ? (
                      <ul className="blog-bullets">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.code ? (
                      <pre className="blog-code-block">
                        <code>{section.code}</code>
                      </pre>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default BlogReader
