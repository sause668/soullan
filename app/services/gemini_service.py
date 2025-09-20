"""
Gemini AI Service using Langchain
Handles interactions with Google's Gemini 2.5 Flash model
"""

import os
from typing import Dict, Any, Optional, List
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.messages import HumanMessage, SystemMessage
import json


class GeminiService:
    """Service class for interacting with Gemini 2.5 Flash via Langchain"""
    
    def __init__(self):
        """Initialize the Gemini service with API key from environment"""
        self.api_key = os.getenv('GOOGLE_API_KEY')
        if not self.api_key:
            raise ValueError("GOOGLE_API_KEY environment variable is required")
        
        # Initialize the Gemini model
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash-exp",
            google_api_key=self.api_key,
            temperature=0.7,
            max_output_tokens=2048
        )
        
        # Initialize output parser
        self.output_parser = StrOutputParser()
    
    def create_prompt_template(self, system_prompt: str, human_prompt: str) -> ChatPromptTemplate:
        """Create a prompt template with system and human messages"""
        return ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template(human_prompt)
        ])
    
    def generate_response(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """
        Generate a response using Gemini 2.5 Flash
        
        Args:
            prompt: The user's input prompt
            system_prompt: Optional system prompt for context
            
        Returns:
            Generated response as string
        """
        try:
            if system_prompt:
                messages = [
                    SystemMessage(content=system_prompt),
                    HumanMessage(content=prompt)
                ]
            else:
                messages = [HumanMessage(content=prompt)]
            
            response = self.model.invoke(messages)
            return response.content
            
        except Exception as e:
            return f"Error generating response: {str(e)}"
    
    def generate_with_template(self, template: ChatPromptTemplate, **kwargs) -> str:
        """
        Generate response using a predefined template
        
        Args:
            template: ChatPromptTemplate instance
            **kwargs: Variables to fill in the template
            
        Returns:
            Generated response as string
        """
        try:
            chain = template | self.model | self.output_parser
            response = chain.invoke(kwargs)
            return response
            
        except Exception as e:
            return f"Error generating response with template: {str(e)}"
    
    def generate_structured_response(self, prompt: str, response_format: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a structured response in JSON format
        
        Args:
            prompt: The user's input prompt
            response_format: Dictionary describing the expected response structure
            
        Returns:
            Dictionary containing the structured response
        """
        try:
            format_instruction = f"Respond in the following JSON format: {json.dumps(response_format, indent=2)}"
            full_prompt = f"{prompt}\n\n{format_instruction}"
            
            response = self.generate_response(full_prompt)
            
            # Try to parse as JSON
            try:
                return json.loads(response)
            except json.JSONDecodeError:
                return {
                    "error": "Failed to parse JSON response",
                    "raw_response": response
                }
                
        except Exception as e:
            return {"error": f"Error generating structured response: {str(e)}"}


class PromptTemplates:
    """Collection of predefined prompt templates for common use cases"""
    
    @staticmethod
    def get_educational_assistant_template() -> ChatPromptTemplate:
        """Template for educational assistance"""
        system_prompt = """You are an AI educational assistant specialized in helping students with their learning. 
        You provide clear, helpful explanations and guidance while maintaining a supportive and encouraging tone."""
        
        human_prompt = """Student question: {question}
        
        Please provide a helpful and educational response that:
        1. Directly addresses the student's question
        2. Provides clear explanations
        3. Offers additional learning resources if relevant
        4. Maintains an encouraging tone"""
        
        return ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template(human_prompt)
        ])
    
    @staticmethod
    def get_grade_feedback_template() -> ChatPromptTemplate:
        """Template for providing grade feedback"""
        system_prompt = """You are an AI assistant that provides constructive feedback on student work. 
        You focus on specific areas for improvement while highlighting strengths."""
        
        human_prompt = """Student work: {student_work}
        Grade: {grade}
        Assignment: {assignment_name}
        
        Please provide constructive feedback that:
        1. Acknowledges what the student did well
        2. Identifies specific areas for improvement
        3. Provides actionable suggestions
        4. Maintains a supportive tone"""
        
        return ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template(human_prompt)
        ])
    
    @staticmethod
    def get_behavior_analysis_template() -> ChatPromptTemplate:
        """Template for analyzing student behavior patterns with grades"""
        system_prompt = """You are an AI assistant that analyzes student behavior patterns and academic performance to help educators understand and support their students better. You consider both behavioral observations and academic performance (grades) to provide comprehensive insights."""
        
        human_prompt = """Behavior data: {behavior_data}
        Time period: {time_period}
        Academic performance (grades): {grades_data}
        
        Please analyze this comprehensive data and provide:
        1. Key behavioral patterns and trends
        2. Academic performance patterns and correlations
        3. Potential concerns or positive developments (both behavioral and academic)
        4. Recommendations for educators based on both behavior and academic performance
        5. Suggestions for student support that address both behavioral and academic needs
        6. Any correlations between behavior and academic performance you notice"""
        
        return ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template(human_prompt)
        ])
    
    @staticmethod
    def get_custom_template(system_prompt: str, human_prompt: str) -> ChatPromptTemplate:
        """Create a custom template with provided prompts"""
        return ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_prompt),
            HumanMessagePromptTemplate.from_template(human_prompt)
        ])


# Global instance for easy access
gemini_service = None

def get_gemini_service() -> GeminiService:
    """Get or create the global Gemini service instance"""
    global gemini_service
    if gemini_service is None:
        gemini_service = GeminiService()
    return gemini_service
