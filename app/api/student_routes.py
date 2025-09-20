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
@login_required
def get_class_grades(student_id, class_id):
    """
    Get class by ID (for grades page)
    """
    class_ = Class.query.\
        join(StudentClass, Class.id == StudentClass.class_id).\
        filter_by(student_id=student_id, class_id=class_id).first()
    
    if not class_:
        return jsonify({"message": "Class not found"}), 404
    
    return jsonify(class_.grades(student_id))

