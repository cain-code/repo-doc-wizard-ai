
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from enum import Enum

class ToneEnum(str, Enum):
    professional = "professional"
    friendly = "friendly"
    technical = "technical"
    fun = "fun"

class AudienceEnum(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"

class FormatEnum(str, Enum):
    readme = "readme"
    markdown = "markdown"
    html = "html"
    pdf = "pdf"

class DocumentationRequest(BaseModel):
    repo_url: HttpUrl
    project_description: Optional[str] = None
    target_audience: AudienceEnum = AudienceEnum.intermediate
    tone: ToneEnum = ToneEnum.professional
    output_format: FormatEnum = FormatEnum.readme
    primary_language: Optional[str] = None
    selected_components: List[str] = [
        "overview",
        "readme",
        "installation",
        "usage",
        "structure",
        "technologies",
        "contributing",
        "license"
    ]

class DocumentationResponse(BaseModel):
    success: bool
    documentation: Optional[str] = None
    error: Optional[str] = None
    metadata: Optional[dict] = None

class RepoAnalysis(BaseModel):
    name: str
    description: Optional[str]
    language: Optional[str]
    technologies: List[str]
    structure: dict
    readme_exists: bool
    license_type: Optional[str]
    git_history: List[dict]
