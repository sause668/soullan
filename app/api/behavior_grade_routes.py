from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, BehaviorGrade, Class, Student
from app.forms import BehaviorGradeForm, BehaviorGradeUpdateForm

behavior_grade_routes = Blueprint('behavior_grades', __name__)


@behavior_grade_routes.route('/classes/<int:class_id>/quarter/<int:quarter>', methods=['GET'])
@login_required
def get_class_behavior_grades(class_id, quarter):
    """
    Get all behavior grades for a class in a specific quarter
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    # Verify the teacher owns this class
    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    if not class_:
        return jsonify({"message": "Class not found"}), 404
    
    # Get behavior grades for all students in this class for the specified quarter
    behavior_grades = BehaviorGrade.query.filter_by(
        class_id=class_id, 
        quarter=quarter
    ).all()
    
    # Format the response
    grades_data = []
    for grade in behavior_grades:
        student_info = grade.student.info()
        grade_data = {
            "id": grade.id,
            "student": student_info,
            "attention": grade.attention,
            "learning_speed": grade.learning_speed,
            "cooperation": grade.cooperation,
            "final_grade": grade.calculate_final_grade(),
            "quarter": grade.quarter,
            "created_at": grade.created_at,
            "updated_at": grade.updated_at
        }
        grades_data.append(grade_data)
    
    return jsonify({
        "class_id": class_id,
        "quarter": quarter,
        "behavior_grades": grades_data
    }), 200


@behavior_grade_routes.route('/students/<int:student_id>/classes/<int:class_id>/quarter/<int:quarter>', methods=['GET'])
@login_required
def get_student_behavior_grades(student_id, class_id, quarter):
    """
    Get behavior grades for a specific student in a class for a specific quarter
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    # Verify the teacher owns this class
    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    if not class_:
        return jsonify({"message": "Class not found"}), 404
    
    # Get behavior grade for the specific student
    behavior_grade = BehaviorGrade.query.filter_by(
        student_id=student_id,
        class_id=class_id, 
        quarter=quarter
    ).first()
    
    if not behavior_grade:
        return jsonify({"message": "Behavior grades not found"}), 404
    
    # Format the response
    student_info = behavior_grade.student.info()
    grade_data = {
        "id": behavior_grade.id,
        "student": student_info,
        "attention": behavior_grade.attention,
        "learning_speed": behavior_grade.learning_speed,
        "cooperation": behavior_grade.cooperation,
        "final_grade": behavior_grade.calculate_final_grade(),
        "quarter": behavior_grade.quarter,
        "created_at": behavior_grade.created_at,
        "updated_at": behavior_grade.updated_at
    }
    
    return jsonify(grade_data), 200


@behavior_grade_routes.route('/students/<int:student_id>/classes/<int:class_id>/quarter/<int:quarter>', methods=['POST'])
@login_required
def create_behavior_grades(student_id, class_id, quarter):
    """
    Create behavior grades for a student in a class for a specific quarter
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    # Verify the teacher owns this class
    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    if not class_:
        return jsonify({"message": "Class not found"}), 404
    
    # Verify the student is in this class
    student = Student.query.get(student_id)
    if not student or class_ not in student.classes:
        return jsonify({"message": "Student not found in this class"}), 404
    
    form = BehaviorGradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        # Check if behavior grades already exist
        existing_grade = BehaviorGrade.query.filter_by(
            student_id=student_id,
            class_id=class_id, 
            quarter=quarter
        ).first()
        
        if existing_grade:
            return jsonify({"message": "Behavior grades already exist for this student and quarter"}), 400
        
        # Create new behavior grade
        behavior_grade = BehaviorGrade(
            student_id=student_id,
            class_id=class_id,
            quarter=quarter,
            attention=form.data['attention'],
            learning_speed=form.data['learning_speed'],
            cooperation=form.data['cooperation']
        )
        
        db.session.add(behavior_grade)
        db.session.commit()
        
        # Return the created behavior grade
        student_info = behavior_grade.student.info()
        grade_data = {
            "id": behavior_grade.id,
            "student": student_info,
            "attention": behavior_grade.attention,
            "learning_speed": behavior_grade.learning_speed,
            "cooperation": behavior_grade.cooperation,
            "final_grade": behavior_grade.calculate_final_grade(),
            "quarter": behavior_grade.quarter,
            "created_at": behavior_grade.created_at,
            "updated_at": behavior_grade.updated_at
        }
        
        return jsonify(grade_data), 201
    
    return jsonify(form.errors), 400


@behavior_grade_routes.route('/<int:behavior_grade_id>', methods=['PUT'])
@login_required
def update_behavior_grades(behavior_grade_id):
    """
    Update behavior grades for a specific behavior grade record
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    # Get the behavior grade
    behavior_grade = BehaviorGrade.query.get(behavior_grade_id)
    if not behavior_grade:
        return jsonify({"message": "Behavior grades not found"}), 404
    
    # Verify the teacher owns the class
    if behavior_grade.class_.teacher_id != current_user.teacher.id:
        return jsonify({"message": "Unauthorized to update these behavior grades"}), 403
    
    form = BehaviorGradeUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        # Update the behavior grades
        behavior_grade.attention = form.data['attention']
        behavior_grade.learning_speed = form.data['learning_speed']
        behavior_grade.cooperation = form.data['cooperation']
        
        db.session.commit()
        
        # Return the updated behavior grade
        student_info = behavior_grade.student.info()
        grade_data = {
            "id": behavior_grade.id,
            "student": student_info,
            "attention": behavior_grade.attention,
            "learning_speed": behavior_grade.learning_speed,
            "cooperation": behavior_grade.cooperation,
            "final_grade": behavior_grade.calculate_final_grade(),
            "quarter": behavior_grade.quarter,
            "created_at": behavior_grade.created_at,
            "updated_at": behavior_grade.updated_at
        }
        
        return jsonify(grade_data), 200
    
    return jsonify(form.errors), 400


@behavior_grade_routes.route('/students/<int:student_id>/classes/<int:class_id>/quarter/<int:quarter>', methods=['PUT'])
@login_required
def update_behavior_grades_by_student(student_id, class_id, quarter):
    """
    Update behavior grades by student, class, and quarter
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    # Verify the teacher owns this class
    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    if not class_:
        return jsonify({"message": "Class not found"}), 404
    
    # Get the behavior grade
    behavior_grade = BehaviorGrade.query.filter_by(
        student_id=student_id,
        class_id=class_id, 
        quarter=quarter
    ).first()
    
    if not behavior_grade:
        return jsonify({"message": "Behavior grades not found"}), 404
    
    form = BehaviorGradeUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        # Update the behavior grades
        behavior_grade.attention = form.data['attention']
        behavior_grade.learning_speed = form.data['learning_speed']
        behavior_grade.cooperation = form.data['cooperation']
        
        db.session.commit()
        
        # Return the updated behavior grade
        student_info = behavior_grade.student.info()
        grade_data = {
            "id": behavior_grade.id,
            "student": student_info,
            "attention": behavior_grade.attention,
            "learning_speed": behavior_grade.learning_speed,
            "cooperation": behavior_grade.cooperation,
            "final_grade": behavior_grade.calculate_final_grade(),
            "quarter": behavior_grade.quarter,
            "created_at": behavior_grade.created_at,
            "updated_at": behavior_grade.updated_at
        }
        
        return jsonify(grade_data), 200
    
    return jsonify(form.errors), 400


@behavior_grade_routes.route('/<int:behavior_grade_id>', methods=['DELETE'])
@login_required
def delete_behavior_grades(behavior_grade_id):
    """
    Delete behavior grades for a specific behavior grade record
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    # Get the behavior grade
    behavior_grade = BehaviorGrade.query.get(behavior_grade_id)
    if not behavior_grade:
        return jsonify({"message": "Behavior grades not found"}), 404
    
    # Verify the teacher owns the class
    if behavior_grade.class_.teacher_id != current_user.teacher.id:
        return jsonify({"message": "Unauthorized to delete these behavior grades"}), 403
    
    db.session.delete(behavior_grade)
    db.session.commit()
    
    return jsonify({"message": "Behavior grades deleted successfully"}), 200
