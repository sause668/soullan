from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import or_
from app.models import Teacher, Class

teacher_routes = Blueprint('teachers', __name__)


@teacher_routes.route('')
@login_required
def teachers():
    """
    Get all teacher users
    """

    if current_user.type != 'admin':
        return jsonify({"message": "Admin Authorization Required"}), 401
    
    teachers = Teacher.query.all()

    return jsonify([teacher.info() for teacher in teachers])

@teacher_routes.route('/<int:teacher_id>')
@login_required
def teacher_info(teacher_id):
    """
    Get teacher info by ID
    """
    teacher = Teacher.query.filter_by(id=teacher_id).first()

    if not teacher:
            return jsonify({"message": "Teacher not found"}), 404
    
    return jsonify(teacher.search_info()), 200

@teacher_routes.route('/<int:teacher_id>/classes', methods=['GET'])
@login_required
def get_all_teacher_classes(teacher_id):
    """
    Get all teacher classes
    """
    classes = Class.query.filter_by(teacher_id=teacher_id).all()
    return jsonify([class_.teacher_dash() for class_ in classes])
     
@teacher_routes.route('/<int:teacher_id>/gradebook/<int:class_id>', methods=['GET'])
@login_required
def get_class_gradebook(teacher_id, class_id):
    """
    Get class by ID (for gradebook page)
    """
    class_ = Class.query.filter_by(id=class_id, teacher_id=teacher_id).first()

    if not class_:
        return jsonify({"message": "Class not found"}), 404

    return jsonify(class_.grade_book())