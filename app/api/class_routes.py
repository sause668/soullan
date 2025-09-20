from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Class, StudentClass, Student, Assignment
from app.forms import ClassForm, AssignmentForm
from datetime import datetime

class_routes = Blueprint('classes', __name__)

@class_routes.route('', methods=['GET'])
@login_required
def get_all_classes():
    """
    Get all classes (For class search)
    """
    classes = Class.query.all()
    return jsonify([class_.class_search() for class_ in classes])
      

@class_routes.route('/<int:class_id>', methods=['GET'])
@login_required
def get_class_by_id(class_id):
    """
    Get class by ID (for class page)
    """
    class_ = Class.query.filter_by(id=class_id,).first()

    if not class_:
        return jsonify({"message": "Class not found"}), 404

    return jsonify(class_.class_info())
    
@class_routes.route('', methods=['POST'])
@login_required
def create_class():
    """
    Create a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        class_new = Class(
            teacher_id=current_user.teacher.id,
            name=form.data['name'],
            subject=form.data['subject'],
            grade=form.data['grade'],
            room=form.data['room'],
            period=form.data['period']
        )

        db.session.add(class_new)
        db.session.commit()

        classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
        return jsonify([class_.teacher_dash() for class_ in classes]), 201

    return form.errors, 400

    
@class_routes.route('/<int:class_id>', methods=['PUT'])
@login_required
def edit_class(class_id):
    """
    Edit a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        class_edit = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()

        if not class_edit:
            return jsonify({"message": "Class not found"}), 404
        
        class_edit.name = form.data['name']
        class_edit.subject = form.data['subject']
        class_edit.grade = form.data['grade']
        class_edit.period = form.data['period']
        class_edit.room = form.data['room']

        db.session.commit()

        classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
        return jsonify([class_.teacher_dash() for class_ in classes]), 201
    
    return form.errors, 400
    
    

@class_routes.route('/<int:class_id>', methods=['DELETE'])
@login_required
def delete_class(class_id):
    """
    Delete a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    class_delete = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()

    if not class_delete:
            return jsonify({"message": "Class not found"}), 404
    
    db.session.delete(class_delete)
    db.session.commit()

    classes = Class.query.filter_by(teacher_id=current_user.teacher.id).all()
    return jsonify([class_.teacher_dash() for class_ in classes]), 200
    
    

@class_routes.route('/<int:class_id>/students/<int:student_id>', methods=['POST'])
@login_required
def add_student(class_id, student_id):
    """
    Add a student to a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401

    if not Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first():
        return jsonify({"message": "Class not found"}), 404
    
    if not Student.query.filter_by(id=student_id).first():
        return jsonify({"message": "Student not found"}), 404
    
    if StudentClass.query.filter_by(class_id=class_id, student_id=student_id).first():
        return jsonify({"message": "Student already in class"}), 401
    
    add_student = StudentClass(
         student_id=student_id,
         class_id=class_id
    )

    db.session.add(add_student)
    db.session.commit()

    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 201
    
    


@class_routes.route('/<int:class_id>/students/<int:student_id>', methods=['DELETE'])
@login_required
def remove_student(class_id, student_id):
    """
    Remove a student from a class
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401

    if not Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first():
            return jsonify({"message": "Class not found"}), 404
    
    if not Student.query.filter_by(id=student_id).first():
            return jsonify({"message": "Student not found"}), 404
    
    remove_student = StudentClass.query.filter_by(class_id=class_id, student_id=student_id).first()

    if not remove_student:
            return jsonify({"message": "Student is not in this class"}), 404

    db.session.delete(remove_student)
    db.session.commit()

    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 200
    


@class_routes.route('/<int:class_id>/assignments', methods=['POST'])
@login_required
def create_assignment(class_id):
    """
    Create an assignment
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = AssignmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        if not Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first():
                return jsonify({"message": "Class not found"}), 404

        due_date = form.data['due_date'].split('-')
        
        assignment_new = Assignment(
            class_id=class_id,
            name=form.data['name'],
            type=form.data['type'],
            quarter=form.data['quarter'],
            due_date= datetime(int(due_date[0]), int(due_date[1]), int(due_date[2]))
        )

        db.session.add(assignment_new)
        db.session.commit()

        class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
        
        return jsonify(class_.grade_book()), 201

    return form.errors, 400
    

 
