import { Router } from 'express'
import Groq from 'groq-sdk'
import { ProjectModel } from '../models/Project.js'
import { isConnected } from '../config/db.js'
import { buildRAGContext } from '../data/portfolioContext.js'

export const chatRouter = Router()

const SYSTEM_PROMPT = `You are a friendly AI assistant for Yasharth Singhal's portfolio website. You answer questions about Yasharth, his skills, education, experience, and projects. Use ONLY the context below. Be concise (2-4 sentences). If asked something not in the context, say you don't have that information and suggest they use the contact form.`

function buildResumeAwareFallback(
  question: string,
  projects: {
    title: string
    description: string
    techStack: string[]
    liveUrl?: string
    repoUrl?: string
  }[]
): string {
  const q = question.toLowerCase()

  if (
    q.includes('experience') ||
    q.includes('intern') ||
    q.includes('startappss')
  ) {
    return "Yasharth is currently working as a MERN Stack Intern at Startappss System India Pvt Ltd, Noida (Jan 2026 - Present). He also completed an internship at Wakencode Technologies (Sep 2023 - Oct 2023) with basic Salesforce CRM exposure. If you want, I can help draft a message for him and ask: 'Can I send mail from your side?'"
  }

  if (
    q.includes('education') ||
    q.includes('college') ||
    q.includes('mca') ||
    q.includes('bca')
  ) {
    return 'He is pursuing MCA at ABES Engineering College, Ghaziabad (expected Aug 2026), and completed BCA from RV Higher Education and Technical Institute, Dadri (Jun 2024). Would you like course timeline details or only latest qualification?'
  }

  if (
    q.includes('skills') ||
    q.includes('tech') ||
    q.includes('stack')
  ) {
    return 'Core skills include MERN Stack (MongoDB, Express.js, React, Node.js), JavaScript, Python, C, C++, HTML, CSS, Salesforce CRM (basic), VS Code, Windows, and Linux. If you want, I can share skills grouped by frontend, backend, and tools.'
  }

  if (q.includes('project')) {
    const top = projects.slice(0, 3).map((p) => p.title)
    if (top.length > 0) {
      return `Featured projects include ${top.join(', ')}. If you want recommendations, tell me your preferred domain (MERN, chat app, movie app, food app), and I will suggest the best project to discuss in interviews.`
    }
  }

  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('linkedin') ||
    q.includes('github')
  ) {
    return "You can reach Yasharth at yashsinghal6244@gmail.com, phone +91 9720277774, LinkedIn /in/yasharth-singhal, and GitHub /Yasharth-Singhal. If you want, I can help draft a short message and ask: 'Can I send mail from your side?'"
  }

  if (
    q.includes('hire') ||
    q.includes('available') ||
    q.includes('opportunity') ||
    q.includes('job')
  ) {
    return "Yes, he is open to opportunities. I can prepare a concise intro message for recruiter outreach. Can I send mail from your side?"
  }

  return "I can answer from Yasharth's resume and portfolio. Please tell me what you need: skills, education, internship experience, projects, or contact details. If you want to reach him, I can draft a message and ask: 'Can I send mail from your side?'"
}

async function askGemini(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 300,
        },
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Gemini API request failed')
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>
      }
    }>
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ''
}

chatRouter.post('/', async (req, res) => {
  try {
    const groqApiKey = process.env.GROQ_API_KEY
    const geminiApiKey = process.env.GEMINI_API_KEY

    const { message } = req.body
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' })
      return
    }

    const trimmed = message.trim().slice(0, 500)
    if (!trimmed) {
      res.status(400).json({ error: 'Message cannot be empty' })
      return
    }

    // Build RAG context: fetch projects from DB if connected, else use fallback
    let projects: {
      title: string
      description: string
      techStack: string[]
      liveUrl?: string
      repoUrl?: string
    }[] = []
    if (isConnected()) {
      const docs = await ProjectModel.find().sort({ order: 1 }).lean()
      projects = docs.map((d) => ({
        title: d.title,
        description: d.description,
        techStack: d.techStack ?? [],
        liveUrl: d.liveUrl,
        repoUrl: d.repoUrl,
      }))
    } else {
      projects = [
        {
          title: 'MERN Blog',
          description: 'Full-stack blogging platform with auth and CRUD.',
          techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        },
        {
          title: 'Chat App',
          description: 'Real-time messaging with Socket.io.',
          techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          liveUrl: 'https://chatindia-yasharth.web.app/',
        },
        {
          title: 'Movix',
          description: 'Movie discovery app with TMDB API.',
          techStack: ['React', 'Redux', 'TMDB API'],
        },
        {
          title: 'Food Delivery',
          description: 'Online food ordering platform.',
          techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
        },
        {
          title: 'Netflix Clone',
          description: 'Netflix-inspired streaming UI.',
          techStack: ['React', 'TMDB API', 'CSS'],
          liveUrl: 'https://netflix-clone-three-flax.vercel.app',
        },
        {
          title: 'Gemini Clone',
          description: 'Google Gemini AI clone.',
          techStack: ['React', 'AI', 'API'],
          liveUrl: 'https://gemini-clone-five.vercel.app',
        },
        {
          title: 'MockMitra',
          description:
            'Quiz-based practice platform for subject-wise student preparation.',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
        },
        {
          title: 'TeamSync',
          description:
            'Learning-focused tool combining Jira-style task management and team collaboration.',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        },
      ]
    }

    const context = buildRAGContext(projects)
    const prompt = `${SYSTEM_PROMPT}\n\n## Context\n${context}\n\n## User question\n${trimmed}`

    let text = ''

    if (groqApiKey) {
      const groq = new Groq({ apiKey: groqApiKey })
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 256,
      })

      const raw = completion.choices[0]?.message?.content
      text = (typeof raw === 'string' ? raw : '').trim()
    } else if (geminiApiKey) {
      text = await askGemini(prompt, geminiApiKey)
    }

    if (!text) {
      text = buildResumeAwareFallback(trimmed, projects)
    }

    res.json({ reply: text })
  } catch (err) {
    console.error('Chat error:', err)
    res.json({
      reply: buildResumeAwareFallback(
        typeof req.body?.message === 'string' ? req.body.message : '',
        []
      ),
    })
  }
})
