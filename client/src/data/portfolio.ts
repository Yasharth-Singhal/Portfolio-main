export type SkillCategory =
  | 'Languages'
  | 'AI / GenAI'
  | 'Frontend'
  | 'Backend & APIs'
  | 'Databases'
  | 'Cloud & Tools'

export interface Skill {
  name: string
  proficiency: 'Advanced' | 'Proficient' | 'Intermediate'
  category: SkillCategory
  years: string
  detail: string
  level: number // Used for visual progress bar width (e.g. 90 = 90% bar width)
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
  location?: string
  duration: string
  work: string
  bullets?: string[]
  tech: string[]
}

export const profile = {
  name: 'Yasharth Singhal',
  role: 'AI Full Stack Engineer',
  headline: 'AI Full Stack Engineer | React.js | Next.js | Node.js | TypeScript | GenAI',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: 'yashsinghal6244@gmail.com',
  phone: '9720277774',
  github: 'https://github.com/Yasharth-Singhal',
  linkedin: 'https://www.linkedin.com/in/yasharth-singhal',
  website: 'https://www.yasharth.online',
  resume: '/YASHARTH SINGHAL RESUME.pdf',
  shortBio:
    'AI Full Stack Engineer with hands-on experience building and deploying production-grade web applications, REST APIs, real-time communication systems, and AI-powered workflows.',
  about:
    'AI Full Stack Engineer with hands-on experience building and deploying production-grade web applications, REST APIs, real-time communication systems, and AI-powered workflows. Skilled in React.js, Next.js, Node.js, Express.js, TypeScript, MongoDB, PostgreSQL, and modern cloud platforms, with experience in LLMs, RAG, embeddings, LangChain, LangGraph, and AI agents. Experienced in authentication, payment integrations, WebSockets, WebRTC, headless e-commerce, and scalable backend architecture. Focused on building reliable, maintainable, and user-centric software while continuously exploring modern AI and cloud technologies.',
}

export const heroStats = [
  { value: '6', label: 'Featured Projects' },
  { value: '50+', label: 'REST APIs Built' },
  { value: '5+', label: 'Deployments' },
]

export const aboutCounters = [
  { value: 6, suffix: '+', label: 'Featured Projects' },
  { value: 20, suffix: '+', label: 'Technologies & Tools' },
  { value: 1, suffix: '+', label: 'Year Practical Experience' },
]

export const learningJourney = [
  'Completed Bachelor of Computer Applications (BCA) at RVHET Institute (2020 – 2024).',
  'Master of Computer Applications (MCA) at ABES Engineering College, Ghaziabad (2024 – 2026).',
  'Developed full-stack web applications using React.js, Next.js, Node.js, Express.js, and TypeScript.',
  'Built scalable backend APIs, database models (MongoDB, PostgreSQL), and real-time WebSockets/WebRTC systems.',
  'Implemented headless e-commerce architecture with GraphQL, Shopify Hydrogen, and custom payment flows.',
  'Architected GenAI applications utilizing RAG pipelines, vector databases, LangChain, and LangGraph AI agents.',
]

export const currentFocus = [
  'Building production AI Full Stack applications with Next.js, FastAPI, and OpenAI/LLM APIs.',
  'Designing agentic AI workflows, RAG pipelines, and vector database retrieval systems.',
  'Refining scalable backend architectures, real-time communication protocols, and cloud deployments.',
]

export const skills: Skill[] = [
  // Languages
  {
    name: 'JavaScript',
    proficiency: 'Advanced',
    level: 92,
    category: 'Languages',
    years: '2+ yrs',
    detail: 'Core language for interactive user interfaces, Node.js server APIs, and asynchronous programming.',
  },
  {
    name: 'TypeScript',
    proficiency: 'Advanced',
    level: 88,
    category: 'Languages',
    years: '1.5 yrs',
    detail: 'Type-safe component architectures, REST API contracts, and predictable frontend application logic.',
  },
  {
    name: 'Python',
    proficiency: 'Proficient',
    level: 82,
    category: 'Languages',
    years: '1 yr',
    detail: 'Used for AI/GenAI scripting, LangChain orchestration, RAG pipelines, and FastAPI microservices.',
  },
  {
    name: 'SQL',
    proficiency: 'Proficient',
    level: 80,
    category: 'Languages',
    years: '1 yr',
    detail: 'Relational query design, data modeling, schema optimization, and joins for PostgreSQL and MySQL.',
  },

  // AI / GenAI
  {
    name: 'LLMs & OpenAI',
    proficiency: 'Advanced',
    level: 88,
    category: 'AI / GenAI',
    years: '1 yr',
    detail: 'Prompt engineering, model API integrations, fine-tuning workflows, and conversational AI interfaces.',
  },
  {
    name: 'RAG & Embeddings',
    proficiency: 'Advanced',
    level: 86,
    category: 'AI / GenAI',
    years: '< 1 yr',
    detail: 'Retrieval-augmented generation, vector search, document chunking, and semantic context retrieval.',
  },
  {
    name: 'LangChain & LangGraph',
    proficiency: 'Proficient',
    level: 84,
    category: 'AI / GenAI',
    years: '< 1 yr',
    detail: 'Agentic workflows, stateful multi-agent execution graphs, and tool-calling integration pipelines.',
  },
  {
    name: 'Agentic AI & AI Agents',
    proficiency: 'Proficient',
    level: 82,
    category: 'AI / GenAI',
    years: '< 1 yr',
    detail: 'Autonomous agent design, task planning, tool memory, and Hugging Face transformer models.',
  },

  // Frontend
  {
    name: 'React.js',
    proficiency: 'Advanced',
    level: 95,
    category: 'Frontend',
    years: '2+ yrs',
    detail: 'Component-driven user interfaces, state management, hooks, and responsive UX design.',
  },
  {
    name: 'Next.js',
    proficiency: 'Advanced',
    level: 88,
    category: 'Frontend',
    years: '1.5 yrs',
    detail: 'App router, server-side rendering (SSR), edge rendering, and full-stack React systems.',
  },
  {
    name: 'HTML5 & CSS3',
    proficiency: 'Advanced',
    level: 94,
    category: 'Frontend',
    years: '2+ yrs',
    detail: 'Semantic layout, glassmorphism UI visuals, keyframe animations, and responsive accessibility.',
  },
  {
    name: 'Tailwind CSS & Bootstrap',
    proficiency: 'Advanced',
    level: 90,
    category: 'Frontend',
    years: '2 yrs',
    detail: 'Utility-first styling systems, rapid UI prototyping, and responsive design systems.',
  },

  // Backend & APIs
  {
    name: 'Node.js & Express.js',
    proficiency: 'Advanced',
    level: 90,
    category: 'Backend & APIs',
    years: '2+ yrs',
    detail: 'Scalable RESTful APIs, business logic controllers, middleware validation, and backend services.',
  },
  {
    name: 'FastAPI',
    proficiency: 'Proficient',
    level: 78,
    category: 'Backend & APIs',
    years: '1 yr',
    detail: 'Asynchronous high-performance Python REST APIs for AI workflows and service endpoints.',
  },
  {
    name: 'REST APIs & GraphQL',
    proficiency: 'Advanced',
    level: 90,
    category: 'Backend & APIs',
    years: '2 yrs',
    detail: '50+ REST endpoints built, Zod request validation, JWT auth, and 15+ GraphQL operations.',
  },
  {
    name: 'Socket.IO & WebRTC',
    proficiency: 'Proficient',
    level: 86,
    category: 'Backend & APIs',
    years: '1.5 yrs',
    detail: 'Real-time WebSocket event synchronization and peer-to-peer audio/video streaming.',
  },

  // Databases
  {
    name: 'MongoDB & Mongoose',
    proficiency: 'Advanced',
    level: 88,
    category: 'Databases',
    years: '2 yrs',
    detail: 'NoSQL collection modeling, indexing, aggregation pipelines, and CRUD business logic.',
  },
  {
    name: 'PostgreSQL & MySQL',
    proficiency: 'Proficient',
    level: 82,
    category: 'Databases',
    years: '1 yr',
    detail: 'Relational database schema design, transactions, data integrity, and SQL queries.',
  },
  {
    name: 'Vector Databases',
    proficiency: 'Proficient',
    level: 80,
    category: 'Databases',
    years: '< 1 yr',
    detail: 'Vector embeddings storage, similarity indexing, and semantic search for RAG systems.',
  },

  // Cloud & Tools
  {
    name: 'AWS (IAM, S3, EC2)',
    proficiency: 'Proficient',
    level: 76,
    category: 'Cloud & Tools',
    years: '1 yr',
    detail: 'AWS Cloud Practitioner certified: EC2 instance hosting, S3 storage buckets, and IAM access policies.',
  },
  {
    name: 'Docker & Git/GitHub',
    proficiency: 'Advanced',
    level: 84,
    category: 'Cloud & Tools',
    years: '2 yrs',
    detail: 'Containerized environments, Git collaboration workflows, and repository management.',
  },
  {
    name: 'Vercel, Render & Oxygen',
    proficiency: 'Advanced',
    level: 88,
    category: 'Cloud & Tools',
    years: '1.5 yrs',
    detail: 'Cloud deployment, environment pipelines, edge rendering, and production hosting.',
  },
  {
    name: 'Shopify Hydrogen & Firebase',
    proficiency: 'Proficient',
    level: 82,
    category: 'Cloud & Tools',
    years: '1 yr',
    detail: 'Headless storefront architecture, custom payment gateways, and Firebase Auth / Firestore.',
  },
]

export const projectFilters = [
  'All',
  'AI',
  'React',
  'Next.js',
  'Node',
  'Fullstack',
  'MongoDB',
  'WebRTC',
] as const

export const projects: Project[] = [
  {
    id: 'headless-ecommerce',
    name: 'Headless E-Commerce Platform',
    description:
      'A headless storefront with 34 routes, 27 reusable components, and 15+ GraphQL operations, supporting catalog browsing, custom checkout, and account management.',
    story:
      'Built a modern decoupled storefront with Shopify Hydrogen and React, leveraging GraphQL APIs, edge rendering, passwordless OTP auth, and custom payment gateways.',
    tags: ['Shopify Hydrogen', 'React', 'TypeScript', 'GraphQL', 'Node.js', 'Shopify Oxygen', 'Vercel'],
    filters: ['React', 'Fullstack'],
    difficulty: 'Hard',
    views: '4.2k',
    status: 'Live',
    accent: 'violet',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Monolithic themes limit custom UI rendering flexibility and payment gateway integration.',
      approach:
        'Built a headless storefront using Shopify Hydrogen and React, consuming Storefront GraphQL APIs with SSR and edge rendering on Oxygen & Vercel.',
      tech:
        'Shopify Hydrogen, React, TypeScript, GraphQL, Node.js, passwordless OTP auth, and CC Avenue / Cash on Delivery payment flows.',
      challenges:
        'Handling headless checkout workflows, real-time inventory validation, and edge-rendered caching strategies.',
      outcome:
        'Implemented SSR and edge rendering for optimized storefront delivery across 34 routes with custom payment workflows.',
    },
  },
  {
    id: 'team-sync',
    name: 'TeamSync — Collaboration & Project Platform',
    description:
      'A full-stack project management platform with 50+ REST APIs and 14 MongoDB models, supporting Kanban tracking, sprint analytics, WebSocket chat, and WebRTC video calls.',
    story:
      'Created to unify task planning, team messaging, and live video collaboration into a single multi-workspace application.',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'WebRTC', 'Firebase'],
    filters: ['Next.js', 'Node', 'Fullstack', 'MongoDB', 'WebRTC'],
    difficulty: 'Hard',
    views: '3.8k',
    status: 'Completed',
    accent: 'cyan',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Teams frequently context-switch across separate tools for issue tracking, team chat, and video calls.',
      approach:
        'Engineered a workspace platform combining Kanban boards, Socket.IO channels, and WebRTC P2P video calls backed by 14 MongoDB models and RBAC.',
      tech:
        'Next.js, TypeScript, Node.js, Express.js, MongoDB, Socket.IO, WebRTC, Firebase Auth, JWT, and Zod validation.',
      challenges:
        'Managing WebRTC peer connections alongside active Socket.IO state and multi-workspace role permissions.',
      outcome:
        'Built a full collaboration platform supporting 50+ REST endpoints and real-time communication protocols.',
    },
  },
  {
    id: 'rag-ai-assistant',
    name: 'AI Knowledge Assistant & RAG Agent',
    description:
      'An agentic knowledge retrieval platform featuring document ingestion, vector embeddings, chunking, semantic vector search, and multi-agent LangGraph workflows.',
    story:
      'Engineered to demonstrate practical AI agent and RAG capabilities, implementing end-to-end vector retrieval pipelines, LangGraph stateful agents, and response citations.',
    tags: ['Next.js', 'FastAPI', 'Python', 'LangChain', 'LangGraph', 'RAG', 'Vector DB', 'OpenAI'],
    filters: ['AI', 'Next.js', 'Fullstack'],
    difficulty: 'Hard',
    views: '3.1k',
    status: 'Live',
    accent: 'sky',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Traditional search fails to provide precise contextual answers from large technical documents and Knowledge Bases.',
      approach:
        'Built an enterprise RAG agent with document chunking, OpenAI embeddings, vector search, and stateful LangGraph agent workflows.',
      tech:
        'Next.js frontend, FastAPI Python backend, LangChain, LangGraph, Vector Database, and OpenAI LLM models.',
      challenges:
        'Maintaining conversation memory across turns, filtering irrelevant context, and streaming exact document citations.',
      outcome:
        'Implemented a context-aware AI agent capable of answering complex documentation queries with verified citation references.',
    },
  },
  {
    id: 'car-service-admin',
    name: 'Car Service Management Admin Panel',
    description:
      'A full-stack auto service platform supporting job cards, bookings, quotations, customer records, revenue/expense tracking, overdue alerts, and service reminders.',
    story:
      'Designed to digitize auto garage operations by unifying job card management, billing workflows, and customer service appointments.',
    tags: ['React.js', 'Node.js', 'Express.js', 'REST API', 'MongoDB', 'Vercel'],
    filters: ['React', 'Node', 'Fullstack', 'MongoDB'],
    difficulty: 'Medium',
    views: '2.9k',
    status: 'Live',
    accent: 'amber',
    links: {
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Auto service centers rely on fragmented paper records and manual billing, causing overdue service tracking errors.',
      approach:
        'Built a full-stack service management platform covering job cards, bookings, quotations, appointments, customers, vehicles, services, and payments.',
      tech:
        'React.js, Node.js, Express, REST APIs, MongoDB database layer, and Vercel hosting.',
      challenges:
        'Calculating real-time financial metrics (revenue, expenses, overdue jobs) across dynamic job card states.',
      outcome:
        'Developed responsive admin workflows for managing service operations and business processes.',
    },
  },
  {
    id: 'connectx',
    name: 'ConnectX — Real-Time Communication Platform',
    description:
      'A real-time messaging platform supporting 1-on-1 and group chats, live presence synchronization, Firebase auth, and WebRTC peer-to-peer audio/video calls.',
    story:
      'Built to showcase event-driven WebSocket architectures combined with WebRTC streaming for personal and team communication.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Firebase', 'WebRTC'],
    filters: ['React', 'Node', 'Fullstack', 'MongoDB', 'WebRTC'],
    difficulty: 'Hard',
    views: '3.4k',
    status: 'Completed',
    accent: 'emerald',
    links: {
      live: {
        label: 'Live Demo',
        href: 'https://chatindia-yasharth.web.app/',
      },
      github: {
        label: 'GitHub',
        href: 'https://github.com/Yasharth-Singhal',
      },
    },
    aiBreakdown: {
      problem:
        'Messaging applications require reliable real-time event delivery and low-latency audio/video call connectivity.',
      approach:
        'Implemented Socket.IO event transport, Firebase + JWT authentication, and WebRTC signaling servers for call setup.',
      tech:
        'MERN Stack (MongoDB, Express, React, Node), Socket.IO, WebRTC, Firebase Auth, and Tailwind CSS.',
      challenges:
        'Maintaining message synchronization during socket disconnects and reconnects.',
      outcome:
        'Implemented real-time communication using Socket.IO and WebRTC with instant message synchronization.',
    },
  },
  {
    id: 'mockmitra',
    name: 'MockMitra — AI-Powered Quiz & Practice Platform',
    description:
      'An AI-enhanced quiz and practice platform with subject-wise test series, user account progress tracking, timed quiz attempts, and analytics dashboards.',
    story:
      'Built to turn fragmented exam preparation materials into a structured, analytics-driven learning experience with smart progress insights.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OpenAI'],
    filters: ['Node', 'Fullstack', 'MongoDB', 'AI'],
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
        'Students struggle to track test preparation progress across scattered question sets without detailed subject analytics.',
      approach:
        'Designed a practice platform with user auth, topic classification, quiz engines, and performance metrics dashboards.',
      tech:
        'React for dashboard UI, Node & Express for REST APIs, MongoDB for question repositories, and JWT auth.',
      challenges:
        'Structuring flexible quiz schemas while calculating accuracy and speed statistics across historical test attempts.',
      outcome:
        'Delivered a structured learner-focused platform demonstrating clear API security, database design, and UI analytics.',
    },
  },
]

export const experiences: ExperienceItem[] = [
  {
    role: 'Full Stack Developer',
    company: 'Startappss System India Pvt. Ltd.',
    location: 'Noida',
    duration: 'Jan 2026 – Present',
    work:
      'Developing and maintaining full-stack MERN applications across frontend, backend, database, and API layers.',
    bullets: [
      'Developed and maintained full-stack MERN applications across frontend, backend, database, and API layers.',
      'Built responsive React.js interfaces and reusable components integrated with RESTful APIs.',
      'Developed backend business logic, MongoDB schemas, CRUD operations, and data models.',
      'Debugged full-stack production issues and improved application reliability, performance, and maintainability using Git/GitHub workflows.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'TypeScript', 'Git/GitHub'],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Wakencode Technologies',
    location: 'GB Nagar',
    duration: 'Sept 2023 – Oct 2023',
    work:
      'Assisted with Salesforce CRM configuration, data handling, and basic CRM business processes.',
    bullets: [
      'Assisted with Salesforce CRM configuration, data handling, and basic CRM workflows.',
      'Supported data management and configuration tasks within Salesforce-based business processes.',
    ],
    tech: ['Salesforce CRM', 'Data Handling', 'CRM Workflows', 'Process Management'],
  },
  {
    role: 'Master of Computer Applications (MCA)',
    company: 'ABES Engineering College',
    location: 'Ghaziabad',
    duration: '2024 – 2026',
    work:
      'Postgraduate degree specializing in Computer Applications, Advanced Software Architecture, Database Systems, and AI Integrations.',
    bullets: [
      'Master of Computer Applications (MCA)',
      'ABES Engineering College, Ghaziabad',
      '2024 – 2026',
    ],
    tech: ['Full-Stack Systems', 'Software Architecture', 'Database Systems', 'AI Integrations'],
  },
  {
    role: 'Bachelor of Computer Applications (BCA)',
    company: 'RVHET Institute',
    location: 'GB Nagar',
    duration: '2020 – 2024',
    work:
      'Undergraduate degree in Computer Applications, Data Structures, Object-Oriented Programming (C/C++), Database Systems, and Web Basics.',
    bullets: [
      'Bachelor of Computer Applications (BCA)',
      'RVHET Institute, GB Nagar',
      '2020 – 2024',
    ],
    tech: ['Data Structures', 'C / C++', 'Web Development', 'SQL'],
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
  'Full-Time AI / Full-Stack Role',
  'Freelance / Contract',
  'Technical Collaboration',
]

export const aiQuickPrompts = [
  'Ask about me',
  'Ask AI / GenAI skills',
  'Ask about projects',
  'Resume highlights',
  'Work experience',
]
