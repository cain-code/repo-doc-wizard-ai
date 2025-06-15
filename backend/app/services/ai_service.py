import google.generativeai as genai
from typing import Dict, List
from app.core.config import settings
from app.models.schemas import DocumentationRequest

class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        # Updated to use the correct model name
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    def generate_documentation(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Generate documentation using Google Gemini"""
        prompt = self._build_comprehensive_prompt(request, repo_analysis)
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate documentation: {str(e)}")
    
    def _build_comprehensive_prompt(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Build comprehensive AI prompt for professional documentation generation"""
        
        # Extract repository information
        repo_name = repo_analysis.get("name", "Unknown Project")
        description = repo_analysis.get("description") or request.project_description or "No description provided"
        language = repo_analysis.get("language", "Unknown")
        technologies = repo_analysis.get("technologies", [])
        structure = repo_analysis.get("structure", {})
        git_history = repo_analysis.get("git_history", [])
        license_type = repo_analysis.get("license_type", "Not specified")
        
        # Build components section
        components_text = self._get_components_instructions(request.selected_components)
        
        # Build audience and tone instructions
        audience_instruction = self._get_audience_instruction(request.target_audience)
        tone_instruction = self._get_tone_instruction(request.tone)
        
        prompt = f"""You are a senior technical writer, software engineer, and AI documentation expert. Your job is to deeply analyze the provided GitHub repository and generate comprehensive, accurate, long-form documentation based on it.

## 📁 Repository Context:
- **Repository Name**: {repo_name}
- **Repository URL**: {request.repo_url}
- **Description**: {description}
- **Primary Language**: {language}
- **Technologies Detected**: {', '.join(technologies) if technologies else 'Auto-detecting from codebase'}
- **License**: {license_type}

## 📂 Project Structure Analysis:
```
{self._format_structure_detailed(structure)}
```

## 📈 Recent Git History:
{self._format_git_history_detailed(git_history)}

## 🎯 Documentation Requirements:

### Target Audience: {audience_instruction}
### Writing Tone: {tone_instruction}
### Output Format: {request.output_format.value.upper()}

### Required Components:
{components_text}

## 🧠 Your Objective:

Generate **complete, professional-quality, detailed documentation** that:

- Explains the **project purpose** clearly based on actual code analysis
- Describes the **entire folder and file structure** in detail with explanations
- Provides **installation steps** with real command-line instructions
- Includes **multiple usage examples** with actual code blocks from the repository
- Generates **function-level documentation** based on actual code
- Extracts and documents **API endpoints** if found in the code
- Provides an accurate **changelog** based on the provided Git commit history
- Documents **dependencies and technologies** accurately detected from the codebase
- Suggests improvements or known limitations based on code analysis
- Includes **Mermaid.js diagrams** where appropriate for architecture explanation

## 📄 Required Output Structure:

Generate the documentation using this exact structure:

```markdown
# 🚀 {repo_name}

## 📖 Description
[Comprehensive project description based on code analysis]

## 📁 Project Structure
[Detailed folder structure with explanations]

## 📦 Installation
[Step-by-step installation instructions]

## 🧪 Usage
[Multiple usage examples with real code blocks]

## 📡 API Reference
[Documented APIs found in the codebase, if any]

## 🛠️ Technologies Used
[Detailed list of technologies and dependencies]

## 🔍 File-Level Documentation
[Key files and their purposes]

## 🧭 Architecture Overview
[System architecture explanation with Mermaid diagram if complex]

## 📈 Changelog
[Based on provided git history]

## 🧑‍💻 Contributing
[Contribution guidelines]

## 📄 License
[License information]
```

## 🔒 Critical Constraints:

- **Never hallucinate** - Only document features and APIs actually present in the code
- **Be comprehensive** - This should be a complete, production-ready documentation (1500-3000+ words)
- **Use real examples** - All code examples must be based on actual repository content
- **Maintain accuracy** - Every technical detail must be verifiable from the provided information
- **Professional quality** - This documentation should be ready for public release

## 🌓 Markdown Formatting Requirements:

- Use dark theme-compatible markdown with appropriate emojis
- Include proper syntax highlighting for all code blocks
- Use tables, bullet points, and proper heading hierarchy
- Include badges and shields where appropriate
- Make it visually appealing and easy to navigate

Now analyze the repository structure, technologies, and code patterns to generate comprehensive documentation that accurately reflects this specific project.
"""
        
        return prompt
    
    def _get_components_instructions(self, components: List[str]) -> str:
        """Get detailed instructions for selected components"""
        component_map = {
            "overview": "📌 **Project Overview** - Comprehensive introduction explaining the project's purpose, goals, and target use cases",
            "readme": "📄 **Complete README** - Professional README.md with all essential sections and clear formatting",
            "installation": "🔧 **Installation Guide** - Detailed setup instructions for different environments and platforms",
            "usage": "💡 **Usage Examples** - Multiple real code examples, tutorials, and common use cases",
            "structure": "📁 **Project Structure** - Detailed explanation of folder organization and file purposes",
            "api": "🔗 **API Documentation** - Complete API reference with endpoints, parameters, and examples",
            "comments": "💬 **Code Documentation** - Suggestions for improving inline code documentation",
            "technologies": "⚡ **Technology Stack** - Detailed explanation of all technologies, frameworks, and dependencies",
            "contributing": "🤝 **Contributing Guidelines** - Comprehensive guide for contributors including setup and workflow",
            "license": "📜 **License Information** - License details, usage rights, and legal information",
            "changelog": "📋 **Changelog** - Version history and changes based on git commit analysis",
            "architecture": "🏗️ **System Architecture** - Technical architecture overview with diagrams where appropriate"
        }
        
        instructions = []
        for component in components:
            if component in component_map:
                instructions.append(component_map[component])
        
        return "\n".join(instructions)
    
    def _get_audience_instruction(self, audience: str) -> str:
        """Get detailed audience-specific writing instructions"""
        instructions = {
            "beginner": "Write for developers new to programming or this technology stack. Include detailed explanations of concepts, avoid technical jargon without explanation, provide extensive step-by-step examples, and explain the 'why' behind each step.",
            "intermediate": "Write for developers with moderate experience. Balance technical depth with clarity, include practical examples, assume familiarity with basic programming concepts but explain domain-specific terminology.",
            "advanced": "Write for experienced developers and architects. Be concise but comprehensive, focus on technical implementation details, architecture decisions, and advanced usage patterns. Assume strong technical background."
        }
        return instructions.get(audience, instructions["intermediate"])
    
    def _get_tone_instruction(self, tone: str) -> str:
        """Get detailed tone-specific writing instructions"""
        instructions = {
            "professional": "Use formal, business-appropriate language. Be authoritative, clear, and direct. Focus on facts and technical accuracy. Use industry-standard terminology.",
            "friendly": "Use conversational, approachable language while maintaining professionalism. Be helpful, encouraging, and supportive. Include welcoming phrases and positive reinforcement.",
            "technical": "Use precise, technical language with deep technical detail. Focus on implementation specifics, performance considerations, and technical trade-offs. Be thorough and analytical.",
            "fun": "Use engaging, casual language with appropriate humor and personality. Make the documentation enjoyable to read while maintaining technical accuracy. Include creative analogies where appropriate."
        }
        return instructions.get(tone, instructions["professional"])
    
    def _format_structure_detailed(self, structure: Dict, indent: int = 0) -> str:
        """Format directory structure with detailed explanations"""
        if not structure:
            return "Project structure analysis not available"
            
        result = []
        prefix = "  " * indent
        
        for key, value in structure.items():
            if isinstance(value, dict):
                result.append(f"{prefix}{key}/")
                if indent < 3:  # Limit depth to avoid overwhelming output
                    result.append(self._format_structure_detailed(value, indent + 1))
            else:
                result.append(f"{prefix}{key}")
        
        return "\n".join(filter(None, result))
    
    def _format_git_history_detailed(self, history: List[Dict]) -> str:
        """Format git history with more context"""
        if not history:
            return "No git history available for analysis"
        
        formatted = []
        formatted.append("Recent commits (showing last 10):")
        
        for i, commit in enumerate(history[:10], 1):
            hash_short = commit.get('hash', 'unknown')[:8]
            message = commit.get('message', 'No message')
            author = commit.get('author', 'Unknown author')
            date = commit.get('date', 'Unknown date')
            
            formatted.append(f"{i}. **{hash_short}** - {message}")
            formatted.append(f"   - Author: {author}")
            formatted.append(f"   - Date: {date}")
            formatted.append("")
        
        return "\n".join(formatted)
