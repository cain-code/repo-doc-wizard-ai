
# 🚀 GitDocAI - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)

## 🔧 Quick Start (5 minutes)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/gitdocai.git
cd gitdocai
```

### 2. Setup Backend
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env file and add your Gemini API key
```

### 3. Setup Frontend
```bash
# Open new terminal and navigate to project root
cd gitdocai

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### 4. Start Backend
```bash
# In the backend terminal (with virtual environment activated)
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔑 Environment Configuration

### Backend (.env file)
```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-domain.com

# Application Configuration
APP_NAME=GitDocAI
APP_VERSION=1.0.0
DEBUG=true

# Optional: GitHub Token for private repositories
GITHUB_TOKEN=your_github_token_here
```

## 🚀 Production Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Backend (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Use these settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Add your environment variables

## 🧪 Testing the Setup

### 1. Test Backend
```bash
curl http://localhost:8000/api/v1/health
# Should return: {"status": "healthy", "service": "GitDocAI API"}
```

### 2. Test Frontend
1. Open http://localhost:5173
2. Enter a GitHub repository URL
3. Generate documentation or tutorial

## 📁 Project Structure
```
gitdocai/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API and utility services
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic
│   ├── requirements.txt
│   └── main.py
├── .env.example            # Environment variables template
├── README.md              # Project documentation
└── SETUP.md              # This setup guide
```

## 🔧 Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
uvicorn main:app --reload                    # Development server
uvicorn main:app --host 0.0.0.0 --port 8000 # Production server
pip install -r requirements.txt              # Install dependencies
python -m pytest                            # Run tests (if available)
```

## 🛠️ Troubleshooting

### Common Issues

#### Backend Issues
- **Port already in use**: Change port with `--port 8001`
- **Module not found**: Ensure virtual environment is activated
- **API key error**: Check your Gemini API key in .env file

#### Frontend Issues
- **Node modules error**: Delete `node_modules` and run `npm install`
- **Port conflict**: Change port in vite.config.ts
- **Build errors**: Check TypeScript errors with `npm run type-check`

#### API Connection Issues
- **CORS errors**: Add your frontend URL to `CORS_ORIGINS` in backend .env
- **Connection refused**: Ensure backend is running on correct port
- **404 errors**: Check API endpoint URLs in frontend services

### Getting Help
- **GitHub Issues**: [Create an issue](https://github.com/your-username/gitdocai/issues)
- **Documentation**: Check README.md for additional information
- **Logs**: Check browser console and backend terminal for error messages

## 📈 Performance Tips

1. **Development**:
   - Use `npm run dev` for hot reloading
   - Keep backend virtual environment activated
   - Monitor API response times in network tab

2. **Production**:
   - Enable caching for static assets
   - Use environment variables for configuration
   - Monitor API usage and rate limits

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for all secrets
- Enable HTTPS in production
- Validate all user inputs
- Review generated content before use

---

**Need help?** Check the troubleshooting section or create an issue on GitHub.
