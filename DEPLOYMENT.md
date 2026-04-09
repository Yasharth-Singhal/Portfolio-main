# Deployment Guide: Vercel + Render

This setup deploys:
- Frontend on Vercel from [client](client)
- Backend API on Render from [server](server)

## Architecture

1. Vercel hosts the React app.
2. Render hosts the Node/Express API.
3. Frontend calls backend using VITE_API_URL.

## 1) Deploy Backend on Render

1. Push code to GitHub.
2. In Render dashboard, create a new Web Service.
3. Select the repository and use:
	- Root Directory: server
	- Build Command: npm ci && npm run build
	- Start Command: npm start
4. Add environment variables:
	- MONGODB_URI
	- RESEND_API_KEY
	- GMAIL_USER
	- GROQ_API_KEY (optional)
	- GEMINI_API_KEY (optional)
	- CLIENT_URL (set this to your Vercel production URL)
5. Deploy and copy your Render API URL, for example:
	https://portfolio-api.onrender.com

Notes:
- PORT is managed by Render automatically.
- If MongoDB Atlas blocks connection, whitelist Render egress IPs or allow 0.0.0.0/0 temporarily for testing.

## 2) Deploy Frontend on Vercel

1. In Vercel dashboard, create a new project from the same repository.
2. Configure project:
	- Framework: Vite
	- Root Directory: client
	- Build Command: npm run build
	- Output Directory: dist
3. Add environment variable:
	- VITE_API_URL = https://your-render-service.onrender.com/api
4. Deploy.

## 3) CORS and Client URL

The backend allows:
- localhost origins for local development
- all .vercel.app domains (preview + production)
- optional explicit CLIENT_URL

For custom domains, set CLIENT_URL on Render to your exact Vercel domain.

## 4) Verify After Deploy

1. Open frontend URL and submit contact form.
2. Check Render logs for:
	- Email sent via Resend...
3. Check backend health endpoint:
	https://your-render-service.onrender.com/api/health

## Optional: Branch Strategy

- develop: Vercel preview + optional Render staging service
- main: production on both platforms
