"""
API routes for Gemini AI integration
Provides endpoints for frontend to interact with Gemini 2.5 Flash via Langchain
"""

from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from ..services.gemini_service import get_gemini_service, PromptTemplates
import json
import traceback

gemini_routes = Blueprint('gemini', __name__)


@gemini_routes.route('/chat', methods=['POST'])
@login_required
def chat():
    """
    General chat endpoint for interacting with Gemini
    
    Expected JSON payload:
    {
        "message": "User's message",
        "system_prompt": "Optional system prompt for context"
    }
    """
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        message = data['message']
        system_prompt = data.get('system_prompt')
        
        gemini_service = get_gemini_service()
        response = gemini_service.generate_response(message, system_prompt)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        current_app.logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@gemini_routes.route('/educational-assistant', methods=['POST'])
@login_required
def educational_assistant():
    """
    Educational assistant endpoint using predefined template
    
    Expected JSON payload:
    {
        "question": "Student's question"
    }
    """
    try:
        data = request.get_json()
        if not data or 'question' not in data:
            return jsonify({'error': 'Question is required'}), 400
        
        question = data['question']
        
        gemini_service = get_gemini_service()
        template = PromptTemplates.get_educational_assistant_template()
        
        response = gemini_service.generate_with_template(
            template, 
            question=question
        )
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        current_app.logger.error(f"Error in educational assistant endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@gemini_routes.route('/grade-feedback', methods=['POST'])
@login_required
def grade_feedback():
    """
    Generate feedback for student grades
    
    Expected JSON payload:
    {
        "student_work": "Description of student work",
        "grade": "Grade received",
        "assignment_name": "Name of assignment"
    }
    """
    try:
        data = request.get_json()
        required_fields = ['student_work', 'grade', 'assignment_name']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        gemini_service = get_gemini_service()
        template = PromptTemplates.get_grade_feedback_template()
        
        response = gemini_service.generate_with_template(
            template,
            student_work=data['student_work'],
            grade=data['grade'],
            assignment_name=data['assignment_name']
        )
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        current_app.logger.error(f"Error in grade feedback endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@gemini_routes.route('/behavior-analysis', methods=['POST'])
@login_required
def behavior_analysis():
    """
    Analyze student behavior patterns with academic performance
    
    Expected JSON payload:
    {
        "behavior_data": "Behavior data to analyze",
        "time_period": "Time period for analysis",
        "grades_data": "Academic performance data (optional)"
    }
    """
    try:
        data = request.get_json()
        if not data or 'behavior_data' not in data:
            return jsonify({'error': 'Behavior data is required'}), 400
        
        behavior_data = data['behavior_data']
        time_period = data.get('time_period', 'Recent period')
        grades_data = data.get('grades_data', 'No grade data provided')
        
        gemini_service = get_gemini_service()
        template = PromptTemplates.get_behavior_analysis_template()
        
        response = gemini_service.generate_with_template(
            template,
            behavior_data=behavior_data,
            time_period=time_period,
            grades_data=grades_data
        )
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        current_app.logger.error(f"Error in behavior analysis endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@gemini_routes.route('/structured-response', methods=['POST'])
@login_required
def structured_response():
    """
    Generate structured JSON response
    
    Expected JSON payload:
    {
        "prompt": "User's prompt",
        "response_format": {
            "field1": "description",
            "field2": "description"
        }
    }
    """
    try:
        data = request.get_json()
        if not data or 'prompt' not in data or 'response_format' not in data:
            return jsonify({'error': 'Prompt and response_format are required'}), 400
        
        prompt = data['prompt']
        response_format = data['response_format']
        
        gemini_service = get_gemini_service()
        response = gemini_service.generate_structured_response(prompt, response_format)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        current_app.logger.error(f"Error in structured response endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@gemini_routes.route('/custom-template', methods=['POST'])
@login_required
def custom_template():
    """
    Use a custom template for generation
    
    Expected JSON payload:
    {
        "system_prompt": "System prompt",
        "human_prompt": "Human prompt template",
        "variables": {
            "var1": "value1",
            "var2": "value2"
        }
    }
    """
    try:
        data = request.get_json()
        required_fields = ['system_prompt', 'human_prompt', 'variables']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        system_prompt = data['system_prompt']
        human_prompt = data['human_prompt']
        variables = data['variables']
        
        gemini_service = get_gemini_service()
        template = PromptTemplates.get_custom_template(system_prompt, human_prompt)
        
        response = gemini_service.generate_with_template(template, **variables)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        current_app.logger.error(f"Error in custom template endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@gemini_routes.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint for Gemini service
    """
    try:
        gemini_service = get_gemini_service()
        # Simple test to verify the service is working
        test_response = gemini_service.generate_response("Hello, are you working?")
        
        return jsonify({
            'status': 'healthy',
            'service': 'gemini',
            'test_response': test_response[:100] + "..." if len(test_response) > 100 else test_response
        })
        
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500


@gemini_routes.route('/templates', methods=['GET'])
@login_required
def get_available_templates():
    """
    Get list of available prompt templates
    """
    templates = {
        'educational_assistant': {
            'description': 'Template for educational assistance',
            'required_variables': ['question']
        },
        'grade_feedback': {
            'description': 'Template for providing grade feedback',
            'required_variables': ['student_work', 'grade', 'assignment_name']
        },
        'behavior_analysis': {
            'description': 'Template for analyzing behavior patterns',
            'required_variables': ['behavior_data', 'time_period']
        }
    }
    
    return jsonify({
        'templates': templates,
        'status': 'success'
    })
