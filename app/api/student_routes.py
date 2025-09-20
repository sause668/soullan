from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import or_
from app.models import Student, User
from app.models import Class
from app.models import StudentClass

student_routes = Blueprint('students', __name__)


@student_routes.route('')
@login_required
def users():
    """
    Get all student users
    """
    search = request.args.get('search')
    if search:
        students = Student.query.\
            join(User, Student.user_id == User.id).\
            filter((User.first_name.ilike(f'{search}%')) | (User.last_name.ilike(f'{search}%')))

        return jsonify([student.info() for student in students])
    else: 
        students = Student.query.all()
        return jsonify([student.info() for student in students])


@student_routes.route('/<int:student_id>')
@login_required
def student_info(student_id):
    """
    Get student info by ID
    """
    student = Student.query.filter_by(id=student_id).first()

    if not student:
            return jsonify({"message": "Student not found"}), 404
    
    return jsonify(student.search_info()), 200

@student_routes.route('/<int:student_id>/classes', methods=['GET'])
@login_required
def get_all_student_classes(student_id):
    """
    Get all student class by ID
    """
    classes = Class.query.\
        join(StudentClass, Class.id == StudentClass.class_id).\
        filter_by(student_id=student_id).all()
    return jsonify([class_.grades(student_id) for class_ in classes])
     
@student_routes.route('/<int:student_id>/grades/<int:class_id>', methods=['GET'])

def get_class_grades(student_id, class_id):
    """
    Get class by ID (for grades page)
    """
    class_ = Class.query.\
        join(StudentClass, Class.id == StudentClass.class_id).\
        filter_by(student_id=student_id, class_id=class_id).first()
    
    if not class_:
        return jsonify({"message": "Class not found"}), 404

    class_info = class_.grades(student_id)

    # Prepare data for behavior analysis
    behavior_data = None
    grades_data = None
    
    # Extract behavior data if available
    if class_info.get('behaviors'):
        # Get the most recent behavior record for this student
        latest_behavior = class_info.get('behaviors')
        # for behavior in class_info['behaviors']:
        #     if behavior and behavior.get('student_id') == student_id:
        #         latest_behavior = behavior
        #         break
        
        if latest_behavior:
            behavior_data = {
                'Att': latest_behavior.get('attention'),
                'Learn': latest_behavior.get('learnability'), 
                'Coop': latest_behavior.get('cooperation')
            }
    
    # Extract grades data if available
    if class_info.get('assignments'):
        grades_data = {}
        for assignment in class_info['assignments']:
            if assignment.get('grade') is not None:
                grades_data[assignment.get('name', 'Unknown Assignment')] = assignment.get('grade')
    
    # Call behavior analysis if we have data
    ai_response = 'No behavior or grade data available for analysis'
    
    if behavior_data or grades_data:
        try:
            from ..services.gemini_service import get_gemini_service, PromptTemplates
            
            gemini_service = get_gemini_service()
            template = PromptTemplates.get_behavior_analysis_template()
            
            # Prepare the data for the template
            behavior_str = behavior_data if behavior_data else 'No behavior data available'
            grades_str = grades_data if grades_data else 'No grade data available'
            
            response = gemini_service.generate_with_template(
                template,
                behavior_data=behavior_str,
                time_period='Current quarter',
                grades_data=grades_str
            )
            
            ai_response = response
            
        except Exception as e:
            ai_response = f'Error generating AI analysis: {str(e)}'

    class_info['ai_response'] = ai_response
    print(class_info['ai_response'])
    
    return jsonify(class_info)

