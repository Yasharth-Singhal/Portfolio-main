import type { Project } from '../types/project'

export const dummyProjects: Project[] = [
  {
    _id: '1',
    title: 'MERN Blog',
    description:
      'Full-stack blogging platform with user authentication, CRUD operations, and a clean UI built with Tailwind CSS.',
    imageUrl:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: 'https://github.com/amarkumarsbg/mern-blog',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    order: 0,
  },
  {
    _id: '2',
    title: 'Chat App',
    description:
      'Real-time messaging application with user authentication, online status, and instant message delivery.',
    imageUrl:
      'https://plus.unsplash.com/premium_vector-1724612296564-45d0558558f5?q=80&w=600&h=400&fit=crop',
    liveUrl: 'https://chatindia-yasharth.web.app/',
    repoUrl: 'https://github.com/amarkumarsbg/chat-app',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    order: 1,
  },
  {
    _id: '3',
    title: 'Movix',
    description:
      'Movie discovery app with search, trending films, trailers, and detailed info powered by TMDB API.',
    imageUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: 'https://github.com/amarkumarsbg/movix',
    techStack: ['React', 'Redux', 'TMDB API', 'CSS'],
    order: 2,
  },
  {
    _id: '4',
    title: 'Food Delivery',
    description:
      'Online food ordering platform with cart management, order tracking, and a responsive storefront.',
    imageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: 'https://github.com/amarkumarsbg/food-del',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    order: 3,
  },
  {
    _id: '5',
    title: 'Netflix Clone',
    description:
      'A Netflix-inspired streaming UI with movie browsing, trailers, and responsive design deployed on Vercel.',
    imageUrl:
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
    liveUrl: 'https://netflix-clone-three-flax.vercel.app',
    repoUrl: 'https://github.com/amarkumarsbg/netflix-clone',
    techStack: ['React', 'TMDB API', 'CSS'],
    order: 4,
  },
  {
    _id: '6',
    title: 'Gemini Clone',
    description:
      'A Google Gemini AI clone with conversational interface and AI-powered responses.',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    liveUrl: 'https://gemini-clone-five.vercel.app',
    repoUrl: 'https://github.com/amarkumarsbg/gemini-clone',
    techStack: ['React', 'AI', 'API', 'JavaScript'],
    order: 5,
  },
  {
    _id: '7',
    title: 'MockMitra',
    description:
      'Quiz-based practice platform where students can register and practice subject-wise questions for college topics and general subjects with progress tracking.',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: '',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    order: 6,
  },
  {
    _id: '8',
    title: 'TeamSync',
    description:
      'Learning-focused collaboration platform combining Jira-style task planning with team communication features, designed to help freshers understand real workflow systems.',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: '',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    order: 7,
  },
]

export const dummySkills = [
  'C',
  'C++',
  'JavaScript',
  'Python',
  'HTML',
  'CSS',
  'React',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MERN Stack',
  'Salesforce CRM',
  'VS Code',
  'Windows',
  'Linux',
]

export const dummyAbout = {
  name: 'Yasharth Singhal',
  title: 'MERN Stack Developer',
  bio: 'MERN Stack Developer focused on building responsive, user-friendly web apps with clean architecture and practical problem solving.',
  email: 'yashsinghal6244@gmail.com',
  github: 'https://github.com/Yasharth-Singhal',
  linkedin: 'https://www.linkedin.com/in/yasharth-singhal',
}
