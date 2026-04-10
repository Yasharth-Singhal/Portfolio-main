import {
  Suspense,
  lazy,
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentType,
  type FormEvent,
} from 'react'
import type { IconType } from 'react-icons'
import {
  AnimatePresence,
  motion,
  useInView,
  type Variants,
} from 'framer-motion'
import Lenis from 'lenis'
import {
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUp,
  FiArrowUpRight,
  FiBriefcase,
  FiCommand,
  FiDownload,
  FiExternalLink,
  FiFilter,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiMessageSquare,
  FiMoon,
  FiSearch,
  FiSend,
  FiStar,
  FiSun,
  FiTarget,
  FiX,
  FiZap,
} from 'react-icons/fi'
import {
  SiMongodb,
  SiNodedotjs,
  SiOpenai,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import {
  aiQuickPrompts,
  blogs,
  aboutCounters,
  currentFocus,
  experiences,
  heroStats,
  learningJourney,
  profile,
  projectFilters,
  projects,
  quickContactOptions,
  skills,
  type BlogPost,
  type Project,
  type Skill,
} from './data/portfolio'
import { config } from './config/env'

const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal'))
const BlogReader = lazy(() => import('./components/BlogReader'))

type SkillView = 'bars' | 'gauges'
type ChatRole = 'assistant' | 'user'

interface ChatMessage {
  id: number
  role: ChatRole
  text: string
}

const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'blogs',
  'experience',
  'contact',
] as const

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const skillCategories = [
  'Languages',
  'Frontend',
  'Backend & Databases',
  'Tools & Core',
] as const

const skillCategoryMeta: Record<
  (typeof skillCategories)[number],
  {
    icon: IconType
    chip: string
  }
> = {
  Languages: { icon: SiTypescript, chip: 'Core logic' },
  Frontend: { icon: SiReact, chip: 'UI systems' },
  'Backend & Databases': { icon: SiMongodb, chip: 'APIs + data' },
  'Tools & Core': { icon: FiCommand, chip: 'Workflow stack' },
}

const techOrbit: Array<{ icon: IconType; label: string; className: string }> = [
  { icon: SiReact, label: 'React', className: 'tech-orbit-card--react' },
  { icon: SiNodedotjs, label: 'Node', className: 'tech-orbit-card--node' },
  { icon: SiMongodb, label: 'MongoDB', className: 'tech-orbit-card--mongo' },
  {
    icon: SiTailwindcss,
    label: 'Tailwind',
    className: 'tech-orbit-card--tailwind',
  },
  {
    icon: SiTypescript,
    label: 'TypeScript',
    className: 'tech-orbit-card--typescript',
  },
  { icon: SiOpenai, label: 'AI', className: 'tech-orbit-card--ai' },
]

const particles = [
  { top: '8%', left: '12%', size: 6, delay: 0 },
  { top: '18%', left: '82%', size: 5, delay: 1.2 },
  { top: '28%', left: '24%', size: 4, delay: 2.1 },
  { top: '32%', left: '67%', size: 7, delay: 1.5 },
  { top: '42%', left: '15%', size: 5, delay: 2.8 },
  { top: '48%', left: '52%', size: 4, delay: 0.4 },
  { top: '54%', left: '88%', size: 6, delay: 3.2 },
  { top: '64%', left: '22%', size: 5, delay: 0.8 },
  { top: '72%', left: '74%', size: 7, delay: 1.8 },
  { top: '84%', left: '38%', size: 4, delay: 2.6 },
]

const rotatingHeroRoles = [
  profile.role,
  'Full-Stack Developer',
  'React Frontend Developer',
  'Node.js Backend Developer',
  'Open to Internship Roles',
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [showLoader, setShowLoader] = useState(true)
  const [activeSection, setActiveSection] =
    useState<(typeof sectionIds)[number]>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [skillView, setSkillView] = useState<SkillView>('bars')
  const [skillSearch, setSkillSearch] = useState('')
  const [projectFilter, setProjectFilter] =
    useState<(typeof projectFilters)[number]>('All')
  const [blogFilter, setBlogFilter] = useState<BlogPost['category'] | 'All'>(
    'All'
  )
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [contactOption, setContactOption] = useState(quickContactOptions[0])
  const [toast, setToast] = useState<{
    title: string
    message: string
  } | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [typedHeroText, setTypedHeroText] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatTyping, setChatTyping] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Hi, I am Yasharth\'s portfolio assistant. Ask me about projects, experience, skills, or resume highlights.',
    },
  ])

  const deferredSkillSearch = useDeferredValue(skillSearch)
  const chatId = useRef(2)

  useEffect(() => {
    const stored = window.localStorage.getItem('portfolio-theme')
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowLoader(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showLoader ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showLoader])

  useEffect(() => {
    if (activeSection !== 'home') {
      setTypedHeroText(rotatingHeroRoles[0])
      return
    }

    let roleIndex = 0
    let characterIndex = 0
    let deleting = false
    let timeout = 0

    const tick = () => {
      const role = rotatingHeroRoles[roleIndex]

      if (!deleting) {
        characterIndex += 1
        setTypedHeroText(role.slice(0, characterIndex))

        if (characterIndex === role.length) {
          deleting = true
          timeout = window.setTimeout(tick, 1250)
          return
        }
      } else {
        characterIndex = Math.max(0, characterIndex - 1)
        setTypedHeroText(role.slice(0, characterIndex))

        if (characterIndex === 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % rotatingHeroRoles.length
          timeout = window.setTimeout(tick, 240)
          return
        }
      }

      timeout = window.setTimeout(tick, deleting ? 38 : 70)
    }

    tick()
    return () => window.clearTimeout(timeout)
  }, [activeSection])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.08,
      smoothWheel: true,
    })

    let frameId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    frameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id as (typeof sectionIds)[number])
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.45, 0.7],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleScrollUpdate = useEffectEvent(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight
    const nextProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
    setScrollProgress(nextProgress)
    setShowBackToTop(window.scrollY > 700)
    setIsScrolled(window.scrollY > 24)
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScrollUpdate, { passive: true })
    handleScrollUpdate()
    return () => window.removeEventListener('scroll', handleScrollUpdate)
  }, [handleScrollUpdate])

  const handlePointerMove = useEffectEvent((event: PointerEvent) => {
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const ring = document.querySelector<HTMLElement>('.cursor-ring')
    if (!dot || !ring) {
      return
    }

    dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    ring.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
  })

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) {
      return
    }

    const body = document.body
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const ring = document.querySelector<HTMLElement>('.cursor-ring')
    const magneticElements = Array.from(
      document.querySelectorAll<HTMLElement>('.magnetic')
    )
    const tiltElements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-tilt="true"]')
    )

    const enterInteractive = () => body.classList.add('cursor-hover')
    const leaveInteractive = () => body.classList.remove('cursor-hover')

    const cleanups: Array<() => void> = []

    magneticElements.forEach((element) => {
      const onMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2
        element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`
      }

      const onLeave = () => {
        element.style.transform = ''
      }

      element.addEventListener('mouseenter', enterInteractive)
      element.addEventListener('mouseleave', leaveInteractive)
      element.addEventListener('mousemove', onMove)
      element.addEventListener('mouseleave', onLeave)

      cleanups.push(() => {
        element.removeEventListener('mouseenter', enterInteractive)
        element.removeEventListener('mouseleave', leaveInteractive)
        element.removeEventListener('mousemove', onMove)
        element.removeEventListener('mouseleave', onLeave)
      })
    })

    tiltElements.forEach((element) => {
      const onMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        const rotateY = (px - 0.5) * 12
        const rotateX = (0.5 - py) * 12
        element.style.transform =
          `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
      }

      const onLeave = () => {
        element.style.transform = ''
      }

      element.addEventListener('mousemove', onMove)
      element.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        element.removeEventListener('mousemove', onMove)
        element.removeEventListener('mouseleave', onLeave)
      })
    })

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    dot?.classList.add('cursor-visible')
    ring?.classList.add('cursor-visible')

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      window.removeEventListener('pointermove', handlePointerMove)
      dot?.classList.remove('cursor-visible')
      ring?.classList.remove('cursor-visible')
    }
  }, [handlePointerMove])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = window.setTimeout(() => setToast(null), 3400)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const filteredSkills = useMemo(() => {
    const query = deferredSkillSearch.trim().toLowerCase()
    if (!query) {
      return skills
    }

    return skills.filter((skill) => {
      const haystack = `${skill.name} ${skill.category} ${skill.detail}`.toLowerCase()
      return haystack.includes(query)
    })
  }, [deferredSkillSearch])

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'All') {
      return projects
    }
    return projects.filter((project) => project.filters.includes(projectFilter))
  }, [projectFilter])

  const filteredBlogs = useMemo(() => {
    if (blogFilter === 'All') {
      return blogs
    }
    return blogs.filter((blog) => blog.category === blogFilter)
  }, [blogFilter])

  const groupedSkills = useMemo(
    () =>
      skillCategories.map((category) => ({
        category,
        items: filteredSkills.filter((skill) => skill.category === category),
      })),
    [filteredSkills]
  )

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false)
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOpenProject = (project: Project) => {
    startTransition(() => setSelectedProject(project))
  }

  const handleOpenBlog = (blog: BlogPost) => {
    startTransition(() => setSelectedBlog(blog))
  }

  const handleSendChat = (prompt: string) => {
    const text = prompt.trim()
    if (!text) {
      return
    }

    setChatMessages((messages) => [
      ...messages,
      { id: chatId.current++, role: 'user', text },
    ])
    setChatInput('')
    setChatTyping(true)

    window.setTimeout(() => {
      const reply = buildAssistantReply(text)
      setChatMessages((messages) => [
        ...messages,
        { id: chatId.current++, role: 'assistant', text: reply },
      ])
      setChatTyping(false)
    }, 850)
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingContact) {
      return
    }

    setIsSubmittingContact(true)

    try {
      const response = await fetch(`${config.apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          message: formState.message.trim(),
        }),
      })

      if (!response.ok) {
        let errorMessage = 'Could not send your message. Please try again.'
        try {
          const payload = (await response.json()) as { error?: string }
          if (payload.error) {
            errorMessage = payload.error
          }
        } catch {
          // Keep fallback message when response body is not JSON.
        }

        setToast({
          title: 'Message failed',
          message: errorMessage,
        })
        return
      }

      setToast({
        title: 'Message sent',
        message: 'Thanks for reaching out. Your message has been submitted successfully.',
      })
      setFormState({ name: '', email: '', message: '' })
    } catch {
      setToast({
        title: 'Network error',
        message: 'Unable to reach the server. Check backend status and try again.',
      })
    } finally {
      setIsSubmittingContact(false)
    }
  }

  return (
    <>
      <div className="progress-top-bar">
        <motion.div
          className="progress-top-bar__fill"
          animate={{ width: `${scrollProgress}%` }}
        />
      </div>

      <AnimatedBackground />
      <Cursor />

      <AnimatePresence>
        {showLoader ? <Loader /> : null}
      </AnimatePresence>

      <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
        <nav className={`nav-shell ${isScrolled ? 'nav-shell--scrolled' : ''}`}>
          <button
            type="button"
            className="brand magnetic"
            onClick={() => handleNavClick('home')}
            aria-label="Go to home section"
          >
            <span className="brand-mark">&lt;/&gt;</span>
            <span>
              {profile.name.split(' ')[0]}
              <small>Portfolio</small>
            </span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'nav-links--open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link magnetic ${activeSection === item.id ? 'nav-link--active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="theme-toggle magnetic"
              onClick={() =>
                setTheme((value) => (value === 'dark' ? 'light' : 'dark'))
              }
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <span className={`theme-toggle__thumb ${theme === 'light' ? 'theme-toggle__thumb--light' : ''}`}>
                {theme === 'dark' ? <FiMoon /> : <FiSun />}
              </span>
            </button>
            <a
              className="button button--ghost button--resume magnetic"
              href={profile.resume}
              download
            >
              Resume <FiDownload />
            </a>
            <button
              className="nav-menu magnetic"
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </header>

      <main className="page-shell">
        <section id="home" className="hero-section">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="eyebrow" variants={fadeUp}>
              Recruiter-ready MERN portfolio
            </motion.span>
            <motion.div className="open-badge" variants={fadeUp}>
              <span className="pulse-dot" />
              Open to Work
            </motion.div>
            <motion.h1 variants={fadeUp}>
              <span className="typing-line">
                {`Hi, I'm ${profile.name} - `}
                <span className="typing-dynamic">
                  <span className="typing-role">{typedHeroText}</span>
                  <span className="typing-caret" />
                </span>
              </span>
            </motion.h1>
            <motion.p className="hero-description" variants={fadeUp}>
              {profile.shortBio}
            </motion.p>
            <motion.div className="hero-meta" variants={fadeUp}>
              <span>
                <FiTarget /> Fresher with product focus
              </span>
              <span>
                <FiBriefcase /> {profile.location}
              </span>
            </motion.div>
            <motion.div className="hero-actions" variants={fadeUp}>
              <button
                type="button"
                className="button button--primary magnetic"
                onClick={() => handleNavClick('projects')}
              >
                View Projects <FiArrowRight />
              </button>
              <button
                type="button"
                className="button button--secondary magnetic"
                onClick={() => handleNavClick('contact')}
              >
                Contact Me <FiMail />
              </button>
              <a
                className="button button--ghost magnetic"
                href={profile.resume}
                download
              >
                Download Resume <FiDownload />
              </a>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeUp}>
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-chip">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="hero-orbit">
              {techOrbit.map(({ icon: Icon, label, className }, index) => (
                <motion.div
                  key={label}
                  className={`tech-orbit-card ${className}`}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="hero-card-shell" data-tilt="true">
              <div className="hero-card">
                <div className="hero-card-topline">
                  <span>Designer + Engineer Product Thinking</span>
                  <FiZap />
                </div>
                <h2>Building thoughtful full-stack products</h2>
                <p>
                  I build apps that are easy to understand and easy to use,
                  with clean frontend interactions, maintainable backend
                  architecture, and practical product decisions.
                </p>
                <div className="hero-card-grid">
                  <FeaturePill
                    icon={SiReact}
                    title="Frontend"
                    text="Interactive React experiences"
                  />
                  <FeaturePill
                    icon={SiNodedotjs}
                    title="Backend"
                    text="REST APIs and auth flows"
                  />
                  <FeaturePill
                    icon={SiMongodb}
                    title="Database"
                    text="Schema-driven data design"
                  />
                  <FeaturePill
                    icon={SiOpenai}
                    title="AI Ready"
                    text="Experimenting with smart features"
                  />
                </div>
                <div className="hero-card-footer">
                  <div>
                    <span className="eyebrow eyebrow--small">Current mission</span>
                    <strong>Make full-stack work feel premium and clear.</strong>
                  </div>
                  <FiArrowDownRight />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <SectionIntro
          id="about"
          eyebrow="About"
          title="My journey from learning fundamentals to shipping real products."
          description={profile.about}
        />
        <section className="content-section section-split about-section">
          <div className="about-story glass-panel">
            <p>
              I am most energized by turning ideas into interfaces that feel
              intentional. My growth came from moving beyond tutorials, building
              end-to-end projects, and learning how frontend polish and backend
              logic support each other.
            </p>
            <div className="counter-grid">
              {aboutCounters.map((counter) => (
                <CounterCard key={counter.label} {...counter} />
              ))}
            </div>
            <a className="button button--primary magnetic" href={profile.resume} download>
              Download CV <FiDownload />
            </a>
          </div>

          <div className="about-stack">
            <div className="glass-panel timeline-panel">
              <div className="panel-heading">
                <span>Learning Journey Timeline</span>
              </div>
              <div className="journey-list">
                {learningJourney.map((item, index) => (
                  <motion.div
                    key={item}
                    className="journey-item"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-panel focus-panel">
              <div className="panel-heading">
                <span>Current Focus</span>
              </div>
              <div className="focus-list">
                {currentFocus.map((item) => (
                  <div key={item} className="focus-item">
                    <FiStar />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionIntro
          id="skills"
          eyebrow="Skills"
          title="The technologies I use most and where I am strongest."
          description="Browse my skills by category, search quickly, and switch views for a clear snapshot of my current technical strengths."
        />
        <section className="content-section">
          <div className="skills-toolbar glass-panel">
            <div className="search-field">
              <FiSearch />
              <input
                value={skillSearch}
                onChange={(event) => setSkillSearch(event.target.value)}
                placeholder="Search React, Node, MongoDB..."
                aria-label="Search skills"
              />
            </div>
            <div className="toolbar-actions">
              <button
                type="button"
                className={`toggle-button magnetic ${skillView === 'bars' ? 'toggle-button--active' : ''}`}
                onClick={() => setSkillView('bars')}
              >
                Bars View
              </button>
              <button
                type="button"
                className={`toggle-button magnetic ${skillView === 'gauges' ? 'toggle-button--active' : ''}`}
                onClick={() => setSkillView('gauges')}
              >
                Gauge View
              </button>
            </div>
          </div>

          <div className="skills-categories-wrap">
            {groupedSkills.map(({ category, items }) => (
              <SkillSectionCard
                key={category}
                category={category}
                items={items}
                view={skillView}
              />
            ))}
          </div>
        </section>

        <SectionIntro
          id="projects"
          eyebrow="Projects"
          title="A selection of projects I have designed, built, and shipped."
          description="Each project includes the problem, approach, tech stack, and outcomes to show both implementation quality and product thinking."
        />
        <section className="content-section">
          <div className="filter-row">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`chip-button magnetic ${projectFilter === filter ? 'chip-button--active' : ''}`}
                onClick={() => setProjectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mobile-filter-wrap">
            <label className="mobile-filter-label" htmlFor="project-filter-mobile">
              Project Category
            </label>
            <select
              id="project-filter-mobile"
              className="mobile-filter-select"
              value={projectFilter}
              onChange={(event) =>
                setProjectFilter(event.target.value as (typeof projectFilters)[number])
              }
            >
              {projectFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>

          <motion.div
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpenProject}
              />
            ))}
          </motion.div>
        </section>

        <SectionIntro
          id="blogs"
          eyebrow="Writing"
          title="Notes and articles from my day-to-day learning process."
          description="Short practical reads on APIs, performance, databases, security, real-time systems, and deployment lessons."
        />
        <section className="content-section">
          <div className="filter-row">
            {(['All', 'Backend', 'Frontend', 'DB', 'Security', 'DevOps'] as const).map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`chip-button magnetic ${blogFilter === filter ? 'chip-button--active' : ''}`}
                  onClick={() => setBlogFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          <div className="mobile-filter-wrap">
            <label className="mobile-filter-label" htmlFor="blog-filter-mobile">
              Blog Category
            </label>
            <select
              id="blog-filter-mobile"
              className="mobile-filter-select"
              value={blogFilter}
              onChange={(event) =>
                setBlogFilter(
                  event.target.value as BlogPost['category'] | 'All'
                )
              }
            >
              {(['All', 'Backend', 'Frontend', 'DB', 'Security', 'DevOps'] as const).map(
                (filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="glass-panel blog-card">
                <span className="blog-card-category">{blog.category}</span>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{blog.readTime}</span>
                  <span>{blog.date}</span>
                </div>
                <button
                  type="button"
                  className="button button--ghost magnetic"
                  onClick={() => handleOpenBlog(blog)}
                >
                  Read Article <FiExternalLink />
                </button>
              </article>
            ))}
          </div>
        </section>

        <SectionIntro
          id="experience"
          eyebrow="Experience"
          title="Where I worked and what I learned along the way."
          description="A quick timeline of internships, responsibilities, and the technologies I used while building real projects."
        />
        <section className="content-section">
          <div className="experience-timeline">
            {experiences.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.company}`}
                className="glass-panel experience-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
              >
                <span className="experience-line-dot" />
                <span className="experience-duration">{item.duration}</span>
                <h3>{item.role}</h3>
                <h4>{item.company}</h4>
                <p>{item.work}</p>
                <div className="tag-row">
                  {item.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <SectionIntro
          id="contact"
          eyebrow="Contact"
          title="Let's connect and talk about your next project."
          description="I am open to internships, freelance work, and collaborations where thoughtful product quality and clear communication matter."
        />
        <section className="content-section contact-layout">
          <div className="glass-panel contact-sidebar">
            <div className="contact-point">
              <FiMail />
              <div>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
            <div className="contact-point">
              <FiLinkedin />
              <div>
                <span>LinkedIn</span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  Connect professionally
                </a>
              </div>
            </div>
            <div className="contact-point">
              <FiGithub />
              <div>
                <span>GitHub</span>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  Explore repositories
                </a>
              </div>
            </div>
            <div className="contact-availability">
              <FiMoon />
              <p>
                Best for: internship roles, fresher hiring, full-stack practice
                projects, frontend revamps, and AI-flavored web ideas.
              </p>
            </div>
          </div>

          <form className="glass-panel contact-form" onSubmit={handleContactSubmit}>
            <div className="contact-options">
              {quickContactOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip-button magnetic ${contactOption === option ? 'chip-button--active' : ''}`}
                  onClick={() => {
                    setContactOption(option)
                    setFormState((state) => ({
                      ...state,
                      message: state.message
                        ? state.message
                        : `Hi Yasharth, I would like to discuss a ${option.toLowerCase()} opportunity.`,
                    }))
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <label className="field">
              <span>Name</span>
              <input
                required
                value={formState.name}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, name: event.target.value }))
                }
                placeholder="Your name"
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                required
                type="email"
                value={formState.email}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, email: event.target.value }))
                }
                placeholder="you@example.com"
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                required
                rows={6}
                value={formState.message}
                onChange={(event) =>
                  setFormState((state) => ({
                    ...state,
                    message: event.target.value,
                  }))
                }
                placeholder="Tell me about the role, project, or collaboration."
              />
            </label>
            <button
              type="submit"
              className="button button--primary magnetic"
              disabled={isSubmittingContact}
            >
              {isSubmittingContact ? 'Sending...' : 'Send Message'} <FiSend />
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <span className="eyebrow eyebrow--small">Portfolio</span>
            <h3>{profile.name}</h3>
            <p>
              MERN developer focused on premium frontend experience and reliable
              backend delivery.
            </p>
          </div>
          <div>
            <span className="footer-title">Quick Links</span>
            <div className="footer-links">
              {navItems
                .filter((item) =>
                  ['about', 'projects', 'skills', 'blogs'].includes(item.id)
                )
                .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
                ))}
            </div>
          </div>
          <div>
            <span className="footer-title">Social</span>
            <div className="footer-socials">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <FiGithub />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <FiLinkedin />
              </a>
              <a href={`mailto:${profile.email}`}>
                <FiMail />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span />
          <p>
            Copyright 2026 {profile.name}. Built with React, with a focus on
            clarity, performance, and a smooth user experience.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop ? (
          <motion.button
            className="back-to-top magnetic"
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AiAssistant
        chatOpen={chatOpen}
        chatTyping={chatTyping}
        chatInput={chatInput}
        chatMessages={chatMessages}
        onToggle={() => setChatOpen((value) => !value)}
        onChange={setChatInput}
        onSend={() => handleSendChat(chatInput)}
        onQuickPrompt={handleSendChat}
      />

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="toast-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <FiZap />
            <div>
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Suspense fallback={null}>
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
        <BlogReader blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      </Suspense>
    </>
  )
}

function Loader() {
  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="loader-brand loader-brand--centered">
        <div className="loader-emblem" aria-hidden="true">
          <div className="loader-orbit">
            <span className="loader-orbit__ring loader-orbit__ring--outer" />
            <span className="loader-orbit__ring loader-orbit__ring--inner" />
            <span className="brand-mark brand-mark--loader">&lt;/&gt;</span>
          </div>
        </div>
        <strong className="loader-signature" aria-label={`${profile.name} loading`}>
          {'<'}
          {profile.name}
          {'/>'}
        </strong>
        <div className="loader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="loader-pulse" />
      </div>
    </motion.div>
  )
}

function Cursor() {
  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </>
  )
}

function AnimatedBackground() {
  return (
    <div className="background-layer" aria-hidden="true">
      <div className="background-grid" />
      <div className="background-gradient background-gradient--one" />
      <div className="background-gradient background-gradient--two" />
      <div className="particle-field">
        {particles.map((particle, index) => (
          <span
            key={`${particle.top}-${particle.left}-${index}`}
            className="particle"
            style={
              {
                '--particle-top': particle.top,
                '--particle-left': particle.left,
                '--particle-size': `${particle.size}px`,
                '--particle-delay': `${particle.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}

function SectionIntro({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <motion.div
      ref={ref}
      id={id}
      className="section-intro"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  )
}

function CounterCard({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) {
      return
    }

    let frame = 0
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp
      }
      const progress = Math.min((timestamp - start) / 900, 1)
      setDisplayValue(Math.round(progress * value))
      if (progress < 1) {
        frame = window.requestAnimationFrame(step)
      }
    }

    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <div ref={ref} className="counter-card">
      <strong>
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

function FeaturePill({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  text: string
}) {
  return (
    <div className="feature-pill">
      <Icon className="feature-pill__icon" />
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  )
}

function SkillSectionCard({
  category,
  items,
  view,
}: {
  category: (typeof skillCategories)[number]
  items: Skill[]
  view: SkillView
}) {
  const { icon: Icon, chip } = skillCategoryMeta[category]

  return (
    <motion.article
      className="glass-panel skill-dashboard-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="skill-dashboard-card__header">
        <div>
          <h3>{category}</h3>
          <p>{chip}</p>
        </div>
        <div className="skill-dashboard-card__icon">
          <Icon />
        </div>
      </div>

      {items.length > 0 ? (
        <AnimatePresence mode="wait">
          {view === 'bars' ? (
            <motion.div
              key="bars"
              className="skill-list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {items.map((skill) => (
                <SkillBarRow key={skill.name} skill={skill} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="gauges"
              className="skill-gauge-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {items.map((skill) => (
                <SkillGaugeCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="empty-state">
          <FiFilter />
          <p>No matches in this category yet.</p>
        </div>
      )}
    </motion.article>
  )
}

function SkillBarRow({ skill }: { skill: Skill }) {
  return (
    <motion.article
      className="skill-row"
      title={`${skill.detail} | ${skill.years}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
    >
      <div className="skill-row__topline">
        <div>
          <strong>{skill.name}</strong>
          <span>{skill.years}</span>
        </div>
        <em>{skill.level}%</em>
      </div>
      <div className="skill-bar-wrap">
        <div className="skill-bar-track">
          <motion.div
            className="skill-bar-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.article>
  )
}

function SkillGaugeCard({ skill }: { skill: Skill }) {
  const cssVars = {
    '--skill-level': `${skill.level}%`,
  } as CSSProperties

  return (
    <motion.article
      className="skill-gauge-card"
      style={cssVars}
      title={`${skill.detail} | ${skill.years}`}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
    >
      <div className="skill-gauge">
        <div className="skill-gauge__ring">
          <span>{skill.level}%</span>
        </div>
      </div>
      <strong>{skill.name}</strong>
      <p>{skill.years}</p>
    </motion.article>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  return (
    <motion.article
      className={`project-card project-card--${project.accent.toLowerCase()}`}
      variants={fadeUp}
      data-tilt="true"
    >
      <div className="project-card__topline">
        <span>{project.status}</span>
        <span>{project.views} views</span>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-card__meta">
        <div>
          <small>Difficulty</small>
          <strong>{project.difficulty}</strong>
        </div>
        <div>
          <small>Focus</small>
          <strong>{project.filters.slice(0, 2).join(' / ')}</strong>
        </div>
      </div>
      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-card__actions">
        {project.links.live ? (
          <a
            className="button button--primary magnetic"
            href={project.links.live.href}
            target="_blank"
            rel="noreferrer"
          >
            Live Demo <FiArrowUpRight />
          </a>
        ) : (
          <button className="button button--secondary magnetic" type="button">
            Completed
          </button>
        )}
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
          className="button button--ghost magnetic"
          type="button"
          onClick={() => onOpen(project)}
        >
          AI Explain <FiZap />
        </button>
      </div>
    </motion.article>
  )
}

function AiAssistant({
  chatOpen,
  chatTyping,
  chatInput,
  chatMessages,
  onToggle,
  onChange,
  onSend,
  onQuickPrompt,
}: {
  chatOpen: boolean
  chatTyping: boolean
  chatInput: string
  chatMessages: ChatMessage[]
  onToggle: () => void
  onChange: (value: string) => void
  onSend: () => void
  onQuickPrompt: (prompt: string) => void
}) {
  const messagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chatOpen || !messagesRef.current) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      const behavior: ScrollBehavior = chatMessages.length <= 1 ? 'auto' : 'smooth'
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior,
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [chatOpen, chatMessages, chatTyping])

  return (
    <div className="assistant-shell">
      <AnimatePresence>
        {chatOpen ? (
          <motion.div
            className="assistant-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
          >
            <div className="assistant-panel__header">
              <div>
                <span className="eyebrow eyebrow--small">AI Assistant</span>
                <strong>Portfolio copilot</strong>
              </div>
              <button
                type="button"
                className="overlay-icon-button magnetic"
                onClick={onToggle}
                aria-label="Close assistant"
              >
                <FiX />
              </button>
            </div>

            <div className="assistant-quick-prompts">
              {aiQuickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="chip-button magnetic"
                  onClick={() => onQuickPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="assistant-messages" ref={messagesRef}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`assistant-message assistant-message--${message.role}`}
                >
                  <p>{message.text}</p>
                </div>
              ))}
              {chatTyping ? (
                <div className="assistant-message assistant-message--assistant">
                  <div className="typing-bubbles">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="assistant-input">
              <input
                value={chatInput}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onSend()
                  }
                }}
                placeholder="Ask about projects, skills, resume..."
              />
              <button
                type="button"
                className="button button--primary magnetic"
                onClick={onSend}
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button className="assistant-fab magnetic" type="button" onClick={onToggle}>
        <FiMessageSquare />
        <span>AI Assistant</span>
      </button>
    </div>
  )
}

function buildAssistantReply(input: string) {
  const prompt = input.toLowerCase()

  if (
    prompt.includes('about me') ||
    prompt.includes('who are you') ||
    prompt.includes('resume')
  ) {
    return `${profile.name} is a fresher MERN developer based in ${profile.location}. His story is about learning fast, building real full-stack apps, and improving product polish so recruiters can see both engineering ability and growth mindset quickly.`
  }

  if (prompt.includes('project')) {
    return `The strongest projects to discuss are MockMitra, TeamSync, the real-time Chat App, and the MERN Blog Platform. Together they show CRUD depth, auth, MongoDB work, real-time communication, product thinking, and stronger interview storytelling.`
  }

  if (prompt.includes('skill')) {
    return `The core strength stack is React, JavaScript, Node.js, Express, MongoDB, REST APIs, Git, and product-minded UI work. The portfolio also highlights ongoing growth in TypeScript, Docker basics, AI interfaces, and system design.`
  }

  if (prompt.includes('internship') || prompt.includes('hiring')) {
    return `Yasharth is positioned well for MERN internships and fresher full-stack roles because he already has project depth, internship exposure, deployment experience, and a clear narrative around continuous improvement.`
  }

  return `I can help with four things quickly: resume summary, best projects to discuss, technical strengths, and recruiter-style talking points. Try asking "Which project should I highlight?" or "What are his strongest MERN skills?"`
}

export default App



