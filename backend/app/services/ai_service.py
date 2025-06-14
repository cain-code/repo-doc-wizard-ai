
import google.generativeai as genai
from typing import Dict, List
from app.core.config import settings
from app.models.schemas import DocumentationRequest

class AIService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate_documentation(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Generate documentation using Google Gemini"""
        prompt = self._build_prompt(request, repo_analysis)
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate documentation: {str(e)}")
    
    def _build_prompt(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Build dynamic prompt based on user inputs and repo analysis"""
        
        # Extract repository information
        repo_name = repo_analysis.get("name", "Unknown Project")
        description = repo_analysis.get("description") or request.project_description or "No description provided"
        language = repo_analysis.get("language", "Unknown")
        technologies = repo_analysis.get("technologies", [])
        structure = repo_analysis.get("structure", {})
        git_history = repo_analysis.get("git_history", [])
        
        # Build components section
        components_text = self._get_components_instructions(request.selected_components)
        
        # Build audience and tone instructions
        audience_instruction = self._get_audience_instruction(request.target_audience)
        tone_instruction = self._get_tone_instruction(request.tone)
        
        prompt = f"""
Generate comprehensive documentation for the following GitHub repository:

## Repository Information:
- **Name**: {repo_name}
- **Description**: {description}
- **Primary Language**: {language}
- **Technologies**: {', '.join(technologies) if technologies else 'Not detected'}
- **Repository URL**: {request.repo_url}

## Project Structure:
```
{self._format_structure(structure)}
```

## Recent Commit History:
{self._format_git_history(git_history)}

## Documentation Requirements:

### Target Audience: {audience_instruction}
### Tone: {tone_instruction}
### Output Format: {request.output_format.value.upper()}

### Components to Include:
{components_text}

## Style Guidelines:
- Use dark theme-compatible markdown
- Include emojis for visual structure (📦, 🔧, 📁, 📄, 🚀, etc.)
- Use proper markdown syntax with syntax highlighting
- Create clear section headers with ##, ###
- Include code examples where relevant
- Use tables and bullet points for better readability
- Add badges and shields where appropriate
- Include a table of contents for longer documents

## Additional Instructions:
- Make the documentation professional and complete
- Include actual code examples from the repository where possible
- Provide clear installation and setup instructions
- Include troubleshooting sections where relevant
- Add contribution guidelines that are specific to this project
- Ensure all links and references are accurate

Generate the complete documentation now:
"""
        
        return prompt
    
    def _get_components_instructions(self, components: List[str]) -> str:
        """Get instructions for selected components"""
        component_map = {
            "overview": "📌 **Project Overview** - Comprehensive introduction and purpose",
            "readme": "📄 **README.md** - Clean, complete README with all essential information",
            "installation": "🔧 **Installation Guide** - Step-by-step setup instructions",
            "usage": "💡 **Usage Examples** - Code examples and tutorials",
            "structure": "📁 **Project Structure** - Detailed folder/file organization explanation",
            "api": "🔗 **API Documentation** - REST/GraphQL endpoints and usage",
            "comments": "💬 **Code Comments** - Inline documentation suggestions",
            "technologies": "⚡ **Technologies Used** - Detailed tech stack explanation",
            "contributing": "🤝 **Contributing Guidelines** - How to contribute to the project",
            "license": "📜 **License Information** - License details and usage rights",
            "changelog": "📋 **Changelog** - Version history and changes",
            "architecture": "🏗️ **Architecture** - System design and architecture overview"
        }
        
        instructions = []
        for component in components:
            if component in component_map:
                instructions.append(component_map[component])
        
        return "\n".join(instructions)
    
    def _get_audience_instruction(self, audience: str) -> str:
        """Get audience-specific instructions"""
        instructions = {
            "beginner": "Write for developers new to programming. Include detailed explanations, avoid jargon, and provide extensive examples.",
            "intermediate": "Write for developers with some experience. Balance detail with conciseness, include practical examples.",
            "advanced": "Write for experienced developers. Be concise but comprehensive, focus on technical details and advanced concepts."
        }
        return instructions.get(audience, instructions["intermediate"])
    
    def _get_tone_instruction(self, tone: str) -> str:
        """Get tone-specific instructions"""
        instructions = {
            "professional": "Use formal, business-appropriate language. Be clear, direct, and authoritative.",
            "friendly": "Use conversational, approachable language. Be helpful and encouraging.",
            "technical": "Use precise technical language. Focus on accuracy and technical depth.",
            "fun": "Use casual, engaging language with appropriate humor. Make it enjoyable to read."
        }
        return instructions.get(tone, instructions["professional"])
    
    def _format_structure(self, structure: Dict, indent: int = 0) -> str:
        """Format directory structure for display"""
        result = []
        prefix = "  " * indent
        
        for key, value in structure.items():
            if isinstance(value, dict):
                result.append(f"{prefix}{key}")
                result.append(self._format_structure(value, indent + 1))
            else:
                result.append(f"{prefix}{key}")
        
        return "\n".join(filter(None, result))
    
    def _format_git_history(self, history: List[Dict]) -> str:
        """Format git history for display"""
        if not history:
            return "No recent commits found"
        
        formatted = []
        for commit in history[:5]:  # Show last 5 commits
            formatted.append(f"- `{commit.get('hash', 'unknown')}` - {commit.get('message', 'No message')} ({commit.get('author', 'Unknown author')})")
        
        return "\n".join(formatted)
