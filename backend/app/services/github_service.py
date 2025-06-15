import os
import tempfile
import shutil
import stat
from typing import Dict, List, Optional
from git import Repo
from pathlib import Path
import json

class GitHubService:
    def __init__(self):
        self.temp_dir = None
        
    def clone_repository(self, repo_url: str) -> str:
        """Clone a GitHub repository to temporary directory"""
        try:
            self.temp_dir = tempfile.mkdtemp()
            repo = Repo.clone_from(repo_url, self.temp_dir)
            return self.temp_dir
        except Exception as e:
            if self.temp_dir and os.path.exists(self.temp_dir):
                self._safe_rmtree(self.temp_dir)
            raise Exception(f"Failed to clone repository: {str(e)}")
    
    def analyze_repository(self, repo_path: str) -> Dict:
        """Analyze repository structure and content"""
        try:
            repo = Repo(repo_path)
            
            # Get basic repo info
            analysis = {
                "name": os.path.basename(repo_path),
                "description": self._extract_description(repo_path),
                "language": self._detect_primary_language(repo_path),
                "technologies": self._detect_technologies(repo_path),
                "structure": self._get_directory_structure(repo_path),
                "readme_exists": self._check_readme_exists(repo_path),
                "license_type": self._detect_license(repo_path),
                "git_history": self._get_git_history(repo, limit=10)
            }
            
            return analysis
        except Exception as e:
            raise Exception(f"Failed to analyze repository: {str(e)}")
    
    def _extract_description(self, repo_path: str) -> Optional[str]:
        """Extract description from README or package.json"""
        # Check README files
        for readme_name in ["README.md", "README.txt", "README.rst", "readme.md"]:
            readme_path = os.path.join(repo_path, readme_name)
            if os.path.exists(readme_path):
                with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()[:500]  # First 500 chars
                    lines = content.split('\n')
                    for line in lines[1:]:  # Skip title
                        if line.strip() and not line.startswith('#'):
                            return line.strip()
        
        # Check package.json
        package_json_path = os.path.join(repo_path, "package.json")
        if os.path.exists(package_json_path):
            try:
                with open(package_json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return data.get("description")
            except:
                pass
                
        return None
    
    def _detect_primary_language(self, repo_path: str) -> Optional[str]:
        """Detect primary programming language"""
        language_extensions = {
            '.py': 'Python',
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.tsx': 'TypeScript',
            '.jsx': 'JavaScript',
            '.java': 'Java',
            '.cpp': 'C++',
            '.c': 'C',
            '.cs': 'C#',
            '.php': 'PHP',
            '.rb': 'Ruby',
            '.go': 'Go',
            '.rs': 'Rust',
            '.swift': 'Swift',
            '.kt': 'Kotlin'
        }
        
        language_counts = {}
        
        for root, dirs, files in os.walk(repo_path):
            # Skip hidden directories and common ignore patterns
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__', 'venv', 'env']]
            
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in language_extensions:
                    lang = language_extensions[ext]
                    language_counts[lang] = language_counts.get(lang, 0) + 1
        
        if language_counts:
            return max(language_counts, key=language_counts.get)
        return None
    
    def _detect_technologies(self, repo_path: str) -> List[str]:
        """Detect technologies used in the project"""
        technologies = []
        
        # Check package.json for JavaScript/Node.js projects
        package_json_path = os.path.join(repo_path, "package.json")
        if os.path.exists(package_json_path):
            technologies.append("Node.js")
            try:
                with open(package_json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    dependencies = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
                    
                    if "react" in dependencies:
                        technologies.append("React")
                    if "vue" in dependencies:
                        technologies.append("Vue.js")
                    if "angular" in dependencies or "@angular/core" in dependencies:
                        technologies.append("Angular")
                    if "express" in dependencies:
                        technologies.append("Express.js")
                    if "next" in dependencies:
                        technologies.append("Next.js")
                    if "typescript" in dependencies:
                        technologies.append("TypeScript")
            except:
                pass
        
        # Check requirements.txt for Python projects
        requirements_path = os.path.join(repo_path, "requirements.txt")
        if os.path.exists(requirements_path):
            technologies.append("Python")
            try:
                with open(requirements_path, 'r', encoding='utf-8') as f:
                    content = f.read().lower()
                    if "django" in content:
                        technologies.append("Django")
                    if "flask" in content:
                        technologies.append("Flask")
                    if "fastapi" in content:
                        technologies.append("FastAPI")
                    if "tensorflow" in content:
                        technologies.append("TensorFlow")
                    if "pytorch" in content:
                        technologies.append("PyTorch")
            except:
                pass
        
        # Check for other common files
        common_files = {
            "Dockerfile": "Docker",
            "docker-compose.yml": "Docker Compose",
            "Cargo.toml": "Rust",
            "go.mod": "Go",
            "pom.xml": "Maven",
            "build.gradle": "Gradle",
            "composer.json": "PHP/Composer"
        }
        
        for file, tech in common_files.items():
            if os.path.exists(os.path.join(repo_path, file)):
                technologies.append(tech)
        
        return list(set(technologies))
    
    def _get_directory_structure(self, repo_path: str, max_depth: int = 3) -> Dict:
        """Get directory structure as nested dict"""
        def build_tree(path: str, current_depth: int = 0) -> Dict:
            if current_depth >= max_depth:
                return {}
                
            tree = {}
            try:
                for item in os.listdir(path):
                    if item.startswith('.'):
                        continue
                        
                    item_path = os.path.join(path, item)
                    if os.path.isdir(item_path):
                        if item not in ['node_modules', '__pycache__', '.git', 'venv', 'env']:
                            tree[item + "/"] = build_tree(item_path, current_depth + 1)
                    else:
                        tree[item] = "file"
            except PermissionError:
                pass
                
            return tree
        
        return build_tree(repo_path)
    
    def _check_readme_exists(self, repo_path: str) -> bool:
        """Check if README file exists"""
        readme_files = ["README.md", "README.txt", "README.rst", "readme.md", "Readme.md"]
        return any(os.path.exists(os.path.join(repo_path, readme)) for readme in readme_files)
    
    def _detect_license(self, repo_path: str) -> Optional[str]:
        """Detect license type"""
        license_files = ["LICENSE", "LICENSE.txt", "LICENSE.md", "license", "license.txt"]
        
        for license_file in license_files:
            license_path = os.path.join(repo_path, license_file)
            if os.path.exists(license_path):
                try:
                    with open(license_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read().upper()
                        if "MIT" in content:
                            return "MIT"
                        elif "APACHE" in content:
                            return "Apache 2.0"
                        elif "GPL" in content:
                            return "GPL"
                        elif "BSD" in content:
                            return "BSD"
                        else:
                            return "Custom"
                except:
                    pass
        
        return None
    
    def _get_git_history(self, repo: Repo, limit: int = 10) -> List[Dict]:
        """Get recent git commit history"""
        try:
            commits = []
            for commit in repo.iter_commits(max_count=limit):
                commits.append({
                    "hash": commit.hexsha[:8],
                    "message": commit.message.strip(),
                    "author": commit.author.name,
                    "date": commit.committed_datetime.isoformat(),
                })
            return commits
        except:
            return []
    
    def _safe_rmtree(self, path):
        """Safely remove directory tree, handling Windows permission issues"""
        def onerror(func, path, exc_info):
            """
            Error handler for ``shutil.rmtree``.
            If the error is due to access being denied (Windows file permissions),
            it attempts to fix the permission and retry.
            """
            if not os.access(path, os.W_OK):
                # Add write permissions and retry
                os.chmod(path, stat.S_IWUSR | stat.S_IWRITE)
                func(path)
            else:
                raise
        
        try:
            shutil.rmtree(path, onerror=onerror)
        except Exception as e:
            print(f"Warning: Could not remove temporary directory {path}: {e}")
    
    def cleanup(self):
        """Clean up temporary directory"""
        if self.temp_dir and os.path.exists(self.temp_dir):
            self._safe_rmtree(self.temp_dir)
