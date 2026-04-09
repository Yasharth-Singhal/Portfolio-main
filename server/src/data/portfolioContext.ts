export const portfolioAbout = {
  name: 'Yasharth Singhal',
  title: 'MERN Stack Developer',
  bio: 'MERN Stack Developer focused on clean, practical web applications and continuous learning.',
  email: 'yashsinghal6244@gmail.com',
  github: 'https://github.com/Yasharth-Singhal',
  linkedin: 'https://www.linkedin.com/in/yasharth-singhal',
}

export const portfolioSkills = [
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

export function buildRAGContext(
  projects: {
    title: string
    description: string
    techStack: string[]
    liveUrl?: string
    repoUrl?: string
  }[]
): string {
  const projectsText = projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description}. Tech: ${(p.techStack ?? []).join(', ')}. ${p.liveUrl ? `Live: ${p.liveUrl}` : ''}`
    )
    .join('\n')

  return `
## About ${portfolioAbout.name}
- Title: ${portfolioAbout.title}
- Bio: ${portfolioAbout.bio}
- Email: ${portfolioAbout.email}
- GitHub: ${portfolioAbout.github}
- LinkedIn: ${portfolioAbout.linkedin}
- Location: Sikandrabad, Bulandshahr, UP, India (Current city: Ghaziabad)

## Education
- MCA, ABES Engineering College, Ghaziabad (2024 - Aug 2026 expected)
- BCA, RV Higher Education and Technical Institute, Dadri (2021 - Jun 2024)
- Intermediate (Commerce), DDSSVM Inter College, Sikandrabad (Mar 2021)

## Work History
- MERN Stack Intern, Startappss System India Pvt Ltd, Noida (Jan 2026 - Present)
- Intern, Wakencode Technologies (Sep 2023 - Oct 2023)

## Skills
${portfolioSkills.join(', ')}

## Projects
${projectsText}
`.trim()
}
