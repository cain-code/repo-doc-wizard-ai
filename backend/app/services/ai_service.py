
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
        
        # Check if this is a tutorial request
        is_tutorial = any(component in ['tutorial', 'code-examples', 'step-by-step'] 
                         for component in request.selected_components)
        
        if is_tutorial:
            prompt = self._build_tutorial_prompt(request, repo_analysis)
        else:
            prompt = self._build_comprehensive_prompt(request, repo_analysis)
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Failed to generate documentation: {str(e)}")
    
    def _build_tutorial_prompt(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Build AI prompt specifically for tutorial generation"""
        
        repo_name = repo_analysis.get("name", "Unknown Project")
        description = repo_analysis.get("description") or request.project_description or "No description provided"
        language = repo_analysis.get("language", "Unknown")
        technologies = repo_analysis.get("technologies", [])
        structure = repo_analysis.get("structure", {})
        
        tutorial_type = "Getting Started" if "getting-started" in request.project_description else "Advanced Tutorial"
        
        prompt = f"""You are a senior technical writer specializing in creating interactive, step-by-step tutorials. Create a comprehensive tutorial for the following repository:

## 📁 Repository Information:
- **Name**: {repo_name}
- **URL**: {request.repo_url}
- **Description**: {description}
- **Language**: {language}
- **Technologies**: {', '.join(technologies) if technologies else 'Auto-detecting'}

## 🎯 Tutorial Requirements:
- **Type**: {tutorial_type}
- **Audience**: {request.target_audience.title()} developers
- **Tone**: {request.tone.title()}
- **Focus**: Hands-on, practical learning with real code examples

## 📂 Project Structure:
```
{self._format_structure_detailed(structure)}
```

## 🎓 Tutorial Objectives:
Create a comprehensive, interactive tutorial that includes:

1. **Clear Learning Objectives** - What users will accomplish
2. **Prerequisites** - Required knowledge and tools
3. **Step-by-Step Instructions** - Numbered, actionable steps
4. **Code Examples** - Real, executable code snippets from the repository
5. **Explanations** - Why each step matters
6. **Common Issues** - Troubleshooting tips
7. **Next Steps** - What to explore after completing the tutorial

## 📋 Tutorial Structure:

```markdown
# 🚀 {tutorial_type}: {repo_name}

## 🎯 What You'll Learn
[Clear learning objectives]

## 📋 Prerequisites
[Required knowledge, tools, and setup]

## ⏱️ Estimated Time
[Realistic time estimate]

## 🛠️ Step-by-Step Tutorial

### Step 1: [Action Title]
**Objective**: [What this step accomplishes]

[Detailed explanation]

```bash
# Command examples
[Real commands]
```

```{language.lower()}
// Code example from the repository
[Actual code snippets]
```

**💡 Explanation**: [Why this step is important]

**❗ Common Issues**: [Potential problems and solutions]

---

### Step 2: [Next Action]
[Continue pattern...]

## 🧪 Testing Your Implementation
[How to verify everything works]

## 🎉 Congratulations!
[Summary of what was accomplished]

## 🚀 Next Steps
[Suggestions for further learning]

## 🛠️ Troubleshooting
[Common issues and solutions]

## 📚 Additional Resources
[Relevant links and documentation]
```

## 🔒 Critical Requirements:

- **Real Code**: Use actual code patterns and examples from the repository
- **Executable**: All code examples must be runnable
- **Progressive**: Each step builds on the previous
- **Practical**: Focus on real-world usage scenarios
- **Beginner-Friendly**: Explain technical concepts clearly
- **Complete**: Include all necessary commands and configurations
- **Tested**: Provide verification steps for each major section

Generate a tutorial that a {request.target_audience} developer can follow from start to finish to successfully use this project.
"""
        
        return prompt
    
    def _build_comprehensive_prompt(self, request: DocumentationRequest, repo_analysis: Dict) -> str:
        """Build comprehensive AI prompt for professional documentation generation"""
        
        # ... keep existing code (extract repository information, build components section, etc.)
        
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
    
    # ... keep existing code (helper methods)
