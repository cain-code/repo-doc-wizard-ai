
# 🚀 GitDocAI - AI-Powered Documentation Generator

Generate professional, customized documentation for any GitHub repository using AI.

## 📁 Project Structure

```
gitdocai/
├── frontend/                 # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── requirements.txt
│   └── main.py
├── .env.example
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: FastAPI + Python 3.9+
- **AI**: OpenAI GPT-4
- **Git**: GitPython
- **Hosting**: Vercel (frontend) + Render (backend)

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env
# Add your OpenAI API key to .env
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

## 📦 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set environment variables
5. Deploy

## ✨ Features

- 🔗 GitHub repository analysis
- 🎨 Customizable documentation options
- 🤖 AI-powered content generation
- 🌙 Beautiful dark theme UI
- 📄 Multiple export formats
- 📊 Mermaid diagram generation
- 📱 Mobile-responsive design

## 🔧 API Endpoints

- `POST /api/v1/generate-docs` - Generate documentation
- `GET /api/v1/health` - Health check

## 📋 License

MIT License - see LICENSE file for details.
