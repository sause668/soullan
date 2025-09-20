"""
Pydantic models for Gemini AI structured responses
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from enum import Enum


class ConcernLevel(int, Enum):
    """Enum for concern levels 1-5"""
    VERY_LOW = 1
    LOW = 2
    MODERATE = 3
    HIGH = 4
    VERY_HIGH = 5


class BehaviorAnalysisResponse(BaseModel):
    """Structured response for behavior analysis"""
    analysis: str = Field(..., description="Detailed behavioral and academic analysis")
    concern_level: int = Field(..., ge=1, le=5, description="Level of concern from 1 (very low) to 5 (very high)")
    
    @validator('concern_level')
    def validate_concern_level(cls, v):
        if not isinstance(v, int) or v < 1 or v > 5:
            raise ValueError('concern_level must be an integer between 1 and 5')
        return v


class GradeFeedbackResponse(BaseModel):
    """Structured response for grade feedback"""
    feedback: str = Field(..., description="Detailed feedback on student work")
    strengths: List[str] = Field(..., description="List of student strengths")
    improvements: List[str] = Field(..., description="List of areas for improvement")
    recommendations: List[str] = Field(..., description="List of actionable recommendations")


class EducationalResponse(BaseModel):
    """Structured response for educational assistance"""
    explanation: str = Field(..., description="Educational explanation and guidance")
    key_concepts: List[str] = Field(..., description="Key concepts covered")
    examples: List[str] = Field(..., description="Relevant examples")
    next_steps: List[str] = Field(..., description="Suggested next learning steps")


class StructuredAnalysisResponse(BaseModel):
    """Generic structured analysis response"""
    summary: str = Field(..., description="Brief summary of the analysis")
    key_findings: List[str] = Field(..., description="Key findings and insights")
    recommendations: List[str] = Field(..., description="Actionable recommendations")
    concerns: Optional[List[str]] = Field(None, description="Any concerns identified")


class ConcernLevelExplanation(BaseModel):
    """Explanation of concern levels"""
    level: int = Field(..., ge=1, le=5)
    description: str = Field(..., description="Description of what this concern level means")
    indicators: List[str] = Field(..., description="Indicators that suggest this concern level")
    recommended_actions: List[str] = Field(..., description="Recommended actions for this concern level")


# Predefined concern level explanations
CONCERN_LEVEL_EXPLANATIONS = {
    1: ConcernLevelExplanation(
        level=1,
        description="Very Low Concern - Student is performing well both behaviorally and academically",
        indicators=[
            "Consistent positive behavior",
            "Good academic performance",
            "Active participation",
            "Positive social interactions"
        ],
        recommended_actions=[
            "Continue current support strategies",
            "Provide positive reinforcement",
            "Monitor for any changes"
        ]
    ),
    2: ConcernLevelExplanation(
        level=2,
        description="Low Concern - Minor issues that are easily addressable",
        indicators=[
            "Occasional behavioral challenges",
            "Slight academic struggles",
            "Minor attention issues",
            "Infrequent disruptions"
        ],
        recommended_actions=[
            "Provide gentle guidance",
            "Offer additional support",
            "Monitor progress closely"
        ]
    ),
    3: ConcernLevelExplanation(
        level=3,
        description="Moderate Concern - Noticeable issues requiring attention",
        indicators=[
            "Regular behavioral challenges",
            "Declining academic performance",
            "Attention difficulties",
            "Social interaction problems"
        ],
        recommended_actions=[
            "Implement targeted interventions",
            "Increase monitoring",
            "Consider additional resources",
            "Communicate with parents/guardians"
        ]
    ),
    4: ConcernLevelExplanation(
        level=4,
        description="High Concern - Significant issues requiring immediate attention",
        indicators=[
            "Frequent behavioral problems",
            "Poor academic performance",
            "Disruptive behavior",
            "Social isolation"
        ],
        recommended_actions=[
            "Immediate intervention required",
            "Involve support staff",
            "Develop comprehensive support plan",
            "Regular check-ins with student"
        ]
    ),
    5: ConcernLevelExplanation(
        level=5,
        description="Very High Concern - Critical issues requiring urgent intervention",
        indicators=[
            "Severe behavioral problems",
            "Failing academic performance",
            "Safety concerns",
            "Crisis situations"
        ],
        recommended_actions=[
            "Immediate crisis intervention",
            "Involve all relevant staff",
            "Consider external resources",
            "Develop emergency support plan"
        ]
    )
}
