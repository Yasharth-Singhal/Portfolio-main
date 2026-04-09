const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      {
        name: 'C',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      },
      {
        name: 'C++',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
    ],
  },
  {
    title: 'Web & MERN Stack',
    skills: [
      {
        name: 'HTML',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Express.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      },
      {
        name: 'Salesforce CRM (Basic)',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg',
      },
      {
        name: 'Linux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      },
      {
        name: 'Windows',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
    ],
  },
]

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="skills-header">
        <h2 className="section-title">Skills I Use in Real Projects</h2>
        <p className="skills-subtitle">
          Core technologies and tools I work with regularly.
        </p>
      </div>

      <div className="skills-categories">
        {skillCategories.map((category) => (
          <div key={category.title} className="skills-category">
            <h3 className="skills-category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-icon"
                    loading="lazy"
                  />
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
