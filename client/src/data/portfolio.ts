export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend & Databases'
  | 'Tools & Core'

export interface Skill {
  name: string
  level: number
  category: SkillCategory
  years: string
  detail: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  name: string
  description: string
  story: string
  tags: string[]
  filters: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  views: string
  status: 'Live' | 'Completed' | 'In Progress'
  accent: string
  links: {
    live?: ProjectLink
    github?: ProjectLink
  }
  aiBreakdown: {
    problem: string
    approach: string
    tech: string
    challenges: string
    outcome: string
  }
}

export interface BlogSection {
  id: string
  title: string
  content: string
  bullets?: string[]
  code?: string
}

export interface BlogPost {
  id: string
  title: string
  category: 'Backend' | 'Frontend' | 'DB' | 'Security' | 'DevOps'
  readTime: string
  date: string
  excerpt: string
  sections: BlogSection[]
}

export interface ExperienceItem {
  role: string
  company: string
  duration: string
  work: string
  tech: string[]
}

export const profile = {
  name: 'Yasharth Singhal',
  role: 'MERN Developer',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: 'yashsinghal6244@gmail.com',
  github: 'https://github.com/Yasharth-Singhal',
  linkedin: 'https://www.linkedin.com/in/yasharth-singhal',
  resume: '/resume.pdf',
  shortBio:
    'I build full-stack web apps with the MERN stack, with a focus on clean UI, reliable APIs, and production-ready delivery.',
  about:
    'I am an early-career developer who enjoys turning ideas into usable products. My journey started with programming fundamentals, grew through hands-on MERN projects, and continues with a strong focus on better architecture, performance, and user experience.',
}

export const heroStats = [
  { value: '6', label: 'Projects' },
  { value: '2', label: 'Internships' },
  { value: '4+', label: 'Deployments' },
]

export const aboutCounters = [
  { value: 6, suffix: '+', label: 'Real Projects' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 1, suffix: '+', label: 'Year Hands-on Experience' },
]

export const learningJourney = [
  'Started with programming fundamentals in C and C++.',
  'Learned web development through HTML, CSS, and JavaScript.',
  'Transitioned into the MERN stack to build full-stack products.',
  'Built real-world apps with authentication, APIs, and dashboards.',
  'Completed internships and collaborated in team environments.',
  'Currently exploring AI integrations and system design thinking.',
]

export const currentFocus = [
  'Building scalable MERN applications with better UX polish.',
  'Learning system design through production-inspired projects.',
  'Exploring AI-assisted workflows inside modern web apps.',
]

export const skills: Skill[] = [
  {
    name: 'C',
    level: 72,
    category: 'Languages',
    years: '1.5 yrs',
    detail: 'Strong base for logic, memory concepts, and problem solving.',
  },
  {
    name: 'C++',
    level: 78,
    category: 'Languages',
    years: '2 yrs',
    detail: 'Comfortable with OOP, STL, and interview-style problem solving.',
  },
  {
    name: 'JavaScript',
    level: 92,
    category: 'Languages',
    years: '2+ yrs',
    detail: 'Primary language for building interactive UI and backend APIs.',
  },
  {
    name: 'TypeScript',
    level: 82,
    category: 'Languages',
    years: '1 yr',
    detail: 'Used for safer component architecture and predictable frontends.',
  },
  {
    name: 'React',
    level: 94,
    category: 'Frontend',
    years: '2+ yrs',
    detail: 'Builds component-driven interfaces with stateful interactions.',
  },
  {
    name: 'Tailwind Thinking',
    level: 83,
    category: 'Frontend',
    years: '1 yr',
    detail: 'Comfortable translating premium layouts into utility-first systems.',
  },
  {
    name: 'HTML5',
    level: 95,
    category: 'Frontend',
    years: '2+ yrs',
    detail: 'Semantic layout, accessibility basics, and responsive structure.',
  },
  {
    name: 'CSS3',
    level: 90,
    category: 'Frontend',
    years: '2+ yrs',
    detail: 'Animation, layout, glassmorphism, gradients, and responsive polish.',
  },
  {
    name: 'Node.js',
    level: 88,
    category: 'Backend & Databases',
    years: '1.5 yrs',
    detail: 'Builds APIs, service layers, async flows, and deployment-ready logic.',
  },
  {
    name: 'Express.js',
    level: 87,
    category: 'Backend & Databases',
    years: '1.5 yrs',
    detail: 'REST APIs, routing, middleware, validation, and auth workflows.',
  },
  {
    name: 'REST API Design',
    level: 84,
    category: 'Backend & Databases',
    years: '1+ yr',
    detail: 'Designs clean resources, JWT flows, and scalable request patterns.',
  },
  {
    name: 'MongoDB',
    level: 86,
    category: 'Backend & Databases',
    years: '1.5 yrs',
    detail: 'Comfortable with schemas, relations, indexes, and aggregation basics.',
  },
  {
    name: 'Mongoose',
    level: 84,
    category: 'Backend & Databases',
    years: '1.5 yrs',
    detail: 'Uses models, validation, hooks, and reusable query patterns.',
  },
  {
    name: 'Git & GitHub',
    level: 88,
    category: 'Tools & Core',
    years: '2 yrs',
    detail: 'Feature branches, collaboration, documentation, and review flow.',
  },
  {
    name: 'Postman',
    level: 82,
    category: 'Tools & Core',
    years: '1.5 yrs',
    detail: 'API testing, debugging, and endpoint validation workflows.',
  },
  {
    name: 'Docker Basics',
    level: 68,
    category: 'Tools & Core',
    years: '0.5 yr',
    detail: 'Learning containerized development and production-friendly packaging.',
  },
  {
    name: 'Problem Solving',
    level: 85,
    category: 'Tools & Core',
    years: '2+ yrs',
    detail: 'Breaks projects into smaller systems with practical trade-off thinking.',
  },
]

export const projectFilters = [
  'All',
  'React',
  'Node',
  'AI',
  'Fullstack',
  'MongoDB',
] as const

export const projects: Project[] = [
  {
    id: 'mockmitra',
    name: 'MockMitra',
    description:
      'A quiz and practice platform that helps students prepare through subject-wise questions, account-based progress tracking, and clean dashboards.',
    story:
      'Built to turn fragmented student preparation into one focused practice journey with better tracking and motivation.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    filters: ['Node', 'Fullstack', 'MongoDB'],
    difficulty: 'Hard',
    views: '3.4k',
    status: 'In Progress',
    accent: 'cyan',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Students needed a single place to practice topics consistently instead of jumping between scattered PDFs and links.',
      approach:
        'I designed a full-stack flow with authentication, topic organization, quiz attempts, and progress visibility so practice feels structured.',
      tech:
        'React for the student dashboard, Node and Express for APIs, MongoDB for question banks and user progress, JWT for secure sessions.',
      challenges:
        'The hardest part was shaping question data in a reusable way and keeping the quiz flow simple while still storing meaningful progress.',
      outcome:
        'The project became my strongest full-stack proof point because it shows product thinking, backend structure, and learner-focused UX.',
    },
  },
  {
    id: 'team-sync',
    name: 'TeamSync',
    description:
      'A collaboration concept blending Jira-style planning with chat-first teamwork to simulate modern product delivery for fresher teams.',
    story:
      'Created as a systems-thinking project to explore how planning, status visibility, and communication can live in one workflow.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    filters: ['Node', 'Fullstack', 'MongoDB'],
    difficulty: 'Hard',
    views: '2.8k',
    status: 'Completed',
    accent: 'violet',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Freshers often know how to build pages, but not how real teams manage tasks, discussions, and progress in one place.',
      approach:
        'I framed the app like a lightweight workflow system with tasks, ownership, and communication features that feel product-oriented.',
      tech:
        'React powers the workspace UI, Socket.io handles real-time conversation ideas, and MongoDB stores tasks and team updates.',
      challenges:
        'Balancing complexity was important because I wanted realistic workflow behavior without making the interface overwhelming.',
      outcome:
        'It became a strong storytelling project for interviews because it highlights architecture thinking, not just screen building.',
    },
  },
  {
    id: 'chat-app',
    name: 'Real-time Chat App',
    description:
      'A MERN chat experience with instant messaging, online presence, and responsive layouts for clean person-to-person conversations.',
    story:
      'This project sharpened my real-time backend understanding and taught me how to keep interfaces fast, readable, and dependable.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    filters: ['React', 'Node', 'Fullstack', 'MongoDB'],
    difficulty: 'Hard',
    views: '3.1k',
    status: 'Live',
    accent: 'emerald',
    links: {
      live: {
        label: 'Live Demo',
        href: 'https://chatindia-yasharth.web.app/',
      },
      github: {
        label: 'GitHub',
        href: 'https://github.com/amarkumarsbg/chat-app',
      },
    },
    aiBreakdown: {
      problem:
        'Messaging apps have to feel instant and trustworthy, which means both backend events and frontend state need to stay in sync.',
      approach:
        'I used Socket.io for real-time transport, protected routes for users, and UI states that make online presence and conversations easy to scan.',
      tech:
        'React, Node.js, Express, Socket.io, MongoDB, and authentication flows for secure message delivery.',
      challenges:
        'Managing real-time updates and keeping message state clean across active chats was the main engineering challenge.',
      outcome:
        'The result is a stronger demonstration of event-driven thinking than a typical CRUD app and shows I can build beyond static dashboards.',
    },
  },
  {
    id: 'mern-blog',
    name: 'MERN Blog Platform',
    description:
      'A full-stack publishing platform with authentication, protected CRUD workflows, and a clean content-first interface.',
    story:
      'Built to understand how content products work end to end, from authoring and validation to publishing and readable UI.',
    tags: ['React', 'Node.js', 'MongoDB', 'Authentication'],
    filters: ['React', 'Node', 'Fullstack', 'MongoDB'],
    difficulty: 'Medium',
    views: '2.2k',
    status: 'Completed',
    accent: 'fuchsia',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/amarkumarsbg/mern-blog',
      },
    },
    aiBreakdown: {
      problem:
        'Content platforms need a smooth author experience, reliable data flow, and readable presentation for visitors.',
      approach:
        'I built protected routes, CRUD APIs, and a content UI that separates editing concerns from reading concerns.',
      tech:
        'React for the author and reader experience, Node and Express for APIs, MongoDB for posts and users, auth for protected actions.',
      challenges:
        'The biggest challenge was coordinating validation and keeping edit flows intuitive without overcomplicating the interface.',
      outcome:
        'This project helped me connect frontend polish with backend logic in a way recruiters can understand quickly.',
    },
  },
  {
    id: 'movix',
    name: 'Movix',
    description:
      'A movie discovery experience with search, trends, trailers, and rich browsing powered by external API data.',
    story:
      'This sharpened my frontend product sense and taught me how to turn third-party data into an enjoyable browsing experience.',
    tags: ['React', 'API Integration', 'UI States', 'Responsive Design'],
    filters: ['React'],
    difficulty: 'Medium',
    views: '1.9k',
    status: 'Completed',
    accent: 'amber',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/amarkumarsbg/movix',
      },
    },
    aiBreakdown: {
      problem:
        'API-powered apps often feel generic unless the data is organized into a satisfying discovery flow.',
      approach:
        'I focused on search, browse, and detail interactions so users can move quickly from curiosity to useful content.',
      tech:
        'React, external movie APIs, reusable UI components, and responsive design patterns.',
      challenges:
        'Handling multiple loading states and mapping inconsistent API responses into a polished UI took careful cleanup.',
      outcome:
        'Movix shows visual execution strength and my ability to turn raw API data into a product-like experience.',
    },
  },
  {
    id: 'gemini-clone',
    name: 'Gemini Clone',
    description:
      'An AI-inspired conversational UI that recreates modern assistant behavior with prompt-driven responses and sleek interaction design.',
    story:
      'Built to explore how AI interfaces feel, how response layouts guide trust, and how conversational products should behave visually.',
    tags: ['React', 'AI UI', 'JavaScript', 'API'],
    filters: ['React', 'AI'],
    difficulty: 'Medium',
    views: '2.6k',
    status: 'Live',
    accent: 'sky',
    links: {
      live: {
        label: 'Live Demo',
        href: 'https://gemini-clone-five.vercel.app',
      },
      github: {
        label: 'GitHub',
        href: 'https://github.com/amarkumarsbg/gemini-clone',
      },
    },
    aiBreakdown: {
      problem:
        'AI products are judged heavily on interaction quality, clarity, and the feeling of responsiveness.',
      approach:
        'I recreated a conversational layout with prompt input, answer rendering, and polished transitions to make the UI feel modern.',
      tech:
        'React, JavaScript, API integration, and motion-led interaction patterns.',
      challenges:
        'Designing a layout that feels premium instead of just functional was the key product challenge.',
      outcome:
        'It became a useful portfolio USP because it shows curiosity around AI experiences and frontend execution quality.',
    },
  },
]

export const experiences: ExperienceItem[] = [
  {
    role: 'MERN Stack Intern',
    company: 'Startappss System India Pvt Ltd, Noida',
    duration: 'Jan 2026 - Present',
    work:
      'Developing MERN features, integrating APIs, working with MongoDB collections, fixing bugs, and collaborating through Git-based delivery flows.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Git'],
  },
  {
    role: 'CRM Intern',
    company: 'Wakencode Technologies',
    duration: 'Sep 2023 - Oct 2023',
    work:
      'Observed enterprise workflows, supported data handling tasks, and gained early exposure to business systems and team processes.',
    tech: ['Salesforce CRM', 'Data Handling', 'Process Learning'],
  },
  {
    role: 'MCA Candidate',
    company: 'ABES Engineering College',
    duration: '2024 - 2026',
    work:
      'Deepened foundations in software, web development, and project implementation while continuously building portfolio-ready applications.',
    tech: ['Computer Applications', 'Web Development', 'Projects'],
  },
]

export const blogs: BlogPost[] = [
  {
    id: 'rest-apis-node',
    title: 'REST APIs with Node.js',
    category: 'Backend',
    readTime: '6 min',
    date: 'Mar 12, 2026',
    excerpt:
      'A practical structure for building Node.js APIs that stay readable as routes, controllers, and validation grow.',
    sections: [
      {
        id: 'why-structure',
        title: 'Why structure matters',
        content:
          'The fastest way to make a backend harder to maintain is to let every route own its own logic. A better approach is to split responsibilities between routes, controllers, services, and validation so each layer stays small.',
        bullets: [
          'Routes define the URL contract.',
          'Controllers shape request and response handling.',
          'Services own business logic.',
          'Validation protects the API boundary.',
        ],
      },
      {
        id: 'sample-flow',
        title: 'A simple request flow',
        content:
          'One clean pattern is to validate early, call a service, and return a consistent JSON shape. This makes the API easier to document and easier to test.',
        code: `router.post('/posts', validate(postSchema), async (req, res) => {\n  const post = await postService.create(req.body)\n  res.status(201).json({ success: true, data: post })\n})`,
      },
      {
        id: 'takeaway',
        title: 'Takeaway',
        content:
          'A good REST API is not only about endpoints. It is about predictability, naming clarity, and making future changes feel safe.',
      },
    ],
  },
  {
    id: 'react-optimization',
    title: 'React Optimization',
    category: 'Frontend',
    readTime: '7 min',
    date: 'Mar 21, 2026',
    excerpt:
      'Performance wins in React often come from reducing unnecessary work, simplifying state flow, and deferring the right updates.',
    sections: [
      {
        id: 'start-simple',
        title: 'Start with the render tree',
        content:
          'Optimization should begin with clarity. Before adding memoization, check whether state is living too high, whether lists can be split, and whether expensive UI is rendering before it becomes visible.',
      },
      {
        id: 'defer-work',
        title: 'Defer work when the UI should stay responsive',
        content:
          'React now gives us tools like transitions and deferred values, which are useful when a typed input should feel instant while filtered results can update a moment later.',
        code: `const deferredSearch = useDeferredValue(search)\nconst filtered = skills.filter((skill) =>\n  skill.name.toLowerCase().includes(deferredSearch.toLowerCase())\n)`,
      },
      {
        id: 'measure',
        title: 'Measure what users feel',
        content:
          'The goal is not fewer renders by itself. The goal is fast interaction, stable layouts, and smooth transitions on real devices.',
      },
    ],
  },
  {
    id: 'mongodb-best-practices',
    title: 'MongoDB Best Practices',
    category: 'DB',
    readTime: '6 min',
    date: 'Feb 28, 2026',
    excerpt:
      'MongoDB works best when the document shape matches the product experience, not just the first version of the UI.',
    sections: [
      {
        id: 'modeling',
        title: 'Model around access patterns',
        content:
          'Before building collections, ask which screens need the data and how often it changes. This helps decide when to embed related fields and when to reference them.',
      },
      {
        id: 'indexes',
        title: 'Indexes are part of feature design',
        content:
          'Search, filtering, and dashboards can slow down quickly if indexes are added as an afterthought. If a query is important to the user journey, it deserves index planning from the start.',
        bullets: [
          'Index frequently filtered fields.',
          'Avoid unbounded array growth.',
          'Return only the fields the UI needs.',
        ],
      },
      {
        id: 'mongoose-layer',
        title: 'Keep the schema layer helpful',
        content:
          'Mongoose should do more than define fields. Use it for validation, sensible defaults, and keeping model rules close to the data itself.',
      },
    ],
  },
  {
    id: 'jwt-auth-system',
    title: 'JWT Auth System',
    category: 'Security',
    readTime: '8 min',
    date: 'Apr 1, 2026',
    excerpt:
      'JWT authentication is simple to start with, but secure implementation depends on token handling, expiry, and route protection details.',
    sections: [
      {
        id: 'auth-basics',
        title: 'Separate identity from authorization',
        content:
          'Login proves who the user is. Authorization decides what they can do next. Keeping those concerns clear makes auth logic easier to extend later.',
      },
      {
        id: 'middleware',
        title: 'Protect routes through middleware',
        content:
          'A shared middleware layer keeps private routes consistent and avoids repeating token checks in every controller.',
        code: `export const requireAuth = (req, _res, next) => {\n  const token = req.headers.authorization?.replace('Bearer ', '')\n  const payload = verifyToken(token)\n  req.user = payload\n  next()\n}`,
      },
      {
        id: 'security-mindset',
        title: 'Build with failure in mind',
        content:
          'Expired tokens, invalid headers, and missing roles are normal cases. Strong auth UX handles them clearly instead of failing silently.',
      },
    ],
  },
  {
    id: 'socket-io-realtime',
    title: 'Socket.io Real-time Apps',
    category: 'Backend',
    readTime: '7 min',
    date: 'Apr 4, 2026',
    excerpt:
      'Real-time features need more than instant delivery. They need predictable event names, cleanup, and UI states that make presence understandable.',
    sections: [
      {
        id: 'event-contracts',
        title: 'Treat events like API contracts',
        content:
          'Socket events should be named carefully and documented just like HTTP endpoints. Clear contracts reduce confusion as the app grows.',
      },
      {
        id: 'connection-lifecycle',
        title: 'Manage connection lifecycle',
        content:
          'Join, leave, reconnect, and offline states need explicit handling. Real-time UX breaks quickly when these transitions are ignored.',
        code: `io.on('connection', (socket) => {\n  socket.on('join-room', (roomId) => socket.join(roomId))\n  socket.on('disconnect', () => {\n    // cleanup presence state here\n  })\n})`,
      },
      {
        id: 'ui-support',
        title: 'Pair backend events with honest UI',
        content:
          'Loading, sent, delivered, and online indicators are not decoration. They help users trust the product when timing matters.',
      },
    ],
  },
  {
    id: 'docker-node',
    title: 'Docker for Node',
    category: 'DevOps',
    readTime: '5 min',
    date: 'Apr 8, 2026',
    excerpt:
      'Docker helps move a Node app from local development into a more repeatable deployment workflow with fewer environment surprises.',
    sections: [
      {
        id: 'why-docker',
        title: 'Why Docker matters',
        content:
          'It reduces the "works on my machine" problem by giving the app a predictable runtime and dependency environment.',
      },
      {
        id: 'simple-dockerfile',
        title: 'Keep the first Dockerfile boring',
        content:
          'The best starter Dockerfile is short, easy to read, and focused on running the app reliably before trying to optimize every byte.',
        code: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["npm", "run", "start"]`,
      },
      {
        id: 'next-step',
        title: 'Next step',
        content:
          'After the basics work, improve the image with multi-stage builds, environment-aware configs, and smaller production installs.',
      },
    ],
  },
]

export const quickContactOptions = [
  'Internship',
  'Freelance',
  'Collaboration',
]

export const aiQuickPrompts = [
  'Ask about me',
  'Ask about projects',
  'Resume Q&A',
  'Ask skills',
]


