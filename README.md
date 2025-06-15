
# 🚀 GitDocAI - AI-Powered Documentation Generator

Transform any GitHub repository into comprehensive, professional documentation using AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18+-blue.svg)](https://reactjs.org/)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Advanced AI analyzes your codebase and generates intelligent documentation
- 📚 **Multiple Formats** - Generate README files, API docs, tutorials, and more
- 🎨 **Professional Design** - Beautiful, responsive documentation with modern UI
- 🔧 **Easy Integration** - Simple GitHub URL input, instant results
- 📄 **Export Options** - Download as Markdown, PDF, or HTML
- 🌍 **Enterprise Ready** - Professional-grade documentation for teams

## 🚀 Quick Start

### Option 1: Run Locally (Recommended for Development)

```bash
# Clone the repository
git clone https://github.com/your-username/gitdocai.git
cd gitdocai

# Setup backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your Gemini API key to .env file

# Start backend
uvicorn main:app --reload

# Setup frontend (new terminal)
cd ..
npm install
npm run dev
```

**Access**: Frontend at http://localhost:5173, Backend at http://localhost:8000

### Option 2: Deploy to Production

#### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gitdocai)

#### Backend (Render)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 🔑 Environment Setup

Create a `.env` file in the backend directory:

```env
# Required: Get your API key from https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://your-domain.com

# Optional: GitHub token for private repositories
GITHUB_TOKEN=your_github_token_here
```

## 📱 How to Use

1. **Enter Repository URL**: Paste your GitHub repository URL
2. **Choose Type**: Select Documentation or Tutorial generation
3. **Configure Options**: Set target audience and preferences
4. **Generate**: AI creates comprehensive documentation
5. **Export**: Download in your preferred format

## 🏗️ Architecture

```
gitdocai/
├── frontend/                 # React + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── package.json
├── backend/                 # FastAPI + Python
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── services/       # Business logic
│   │   └── models/         # Data models
│   └── requirements.txt
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Vite** - Fast build tool

### Backend
- **FastAPI** - High-performance Python API
- **Google Gemini** - Advanced AI model
- **GitPython** - Git repository analysis
- **Pydantic** - Data validation

## 📖 API Reference

### Generate Documentation
```http
POST /api/v1/generate-docs
Content-Type: application/json

{
  "repo_url": "https://github.com/username/repo",
  "target_audience": "intermediate",
  "tone": "professional",
  "output_format": "markdown",
  "selected_components": ["overview", "installation", "usage"]
}
```

### Health Check
```http
GET /api/v1/health
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow TypeScript/Python best practices
- Use meaningful commit messages
- Add documentation for new features
- Ensure tests pass

## 🚨 Important Notice

GitDocAI uses artificial intelligence to generate documentation and tutorials. While our AI strives for accuracy, the generated content may contain errors, omissions, or inaccuracies. Please carefully review, verify, and test all generated code and instructions before using them in production environments.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

- ⭐ **Star this repo** if you find it helpful
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/your-username/gitdocai/issues)
- 💡 **Feature requests** are welcome
- 📧 **Contact**: your-email@example.com

## 🔗 Links

- [Live Demo](https://gitdocai.vercel.app)
- [Documentation](https://docs.gitdocai.com)
- [API Docs](https://api.gitdocai.com/docs)
- [Changelog](CHANGELOG.md)

---

<div align="center">
  <strong>Built with ❤️ using AI and modern web technologies</strong>
</div>
