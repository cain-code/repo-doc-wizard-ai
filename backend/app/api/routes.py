
from fastapi import APIRouter, HTTPException
from app.models.schemas import DocumentationRequest, DocumentationResponse
from app.services.github_service import GitHubService
from app.services.ai_service import AIService

router = APIRouter()

@router.post("/generate-docs", response_model=DocumentationResponse)
async def generate_documentation(request: DocumentationRequest):
    """Generate documentation for a GitHub repository"""
    github_service = GitHubService()
    ai_service = AIService()
    
    try:
        # Clone and analyze repository
        repo_path = github_service.clone_repository(str(request.repo_url))
        repo_analysis = github_service.analyze_repository(repo_path)
        
        # Generate documentation using AI
        documentation = ai_service.generate_documentation(request, repo_analysis)
        
        # Cleanup
        github_service.cleanup()
        
        return DocumentationResponse(
            success=True,
            documentation=documentation,
            metadata={
                "repo_analysis": repo_analysis,
                "request_params": request.dict()
            }
        )
        
    except Exception as e:
        # Cleanup on error
        github_service.cleanup()
        
        return DocumentationResponse(
            success=False,
            error=str(e)
        )

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "GitDocAI API"}
