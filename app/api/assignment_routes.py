from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Assignment, Grade, Class
from app.forms import AssignmentForm, GradeForm
from datetime import datetime

assignment_routes = Blueprint('assignments', __name__)


@assignment_routes.route('/<int:assignment_id>', methods=['PUT'])
@login_required
def edit_assignment(assignment_id):
    """
    Edit an assignment
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = AssignmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        assignment_edit = Assignment.query.filter_by(id=assignment_id).first()

        if not assignment_edit or assignment_edit.class_.teacher_id != current_user.teacher.id:
                return jsonify({"message": "Assignment not found"}), 404

        assignment_edit.name = form.data['name']
        assignment_edit.type = form.data['type']
        assignment_edit.quarter = form.data['quarter']

        due_date = form.data['due_date'].split('-')
        assignment_edit.due_date = datetime(int(due_date[0]), int(due_date[1]), int(due_date[2]))
        

        db.session.commit()

        class_ = Class.query.filter_by(id=assignment_edit.class_.id, teacher_id=current_user.teacher.id).first()
        
        return jsonify(class_.grade_book()), 201

    return form.errors, 400
    


@assignment_routes.route('/<int:assignment_id>', methods=['DELETE'])
@login_required
def delete_assignment(assignment_id):
    """
    Delete an assignment
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    assignment_delete = Assignment.query.filter_by(id=assignment_id).first()

    if not assignment_delete or assignment_delete.class_.teacher_id != current_user.teacher.id:
            return jsonify({"message": "Assignment not found"}), 404
    
    db.session.delete(assignment_delete)
    db.session.commit()

    class_ = Class.query.filter_by(id=assignment_delete.class_.id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 200



@assignment_routes.route('/<int:assignment_id>/grades/<int:student_id>', methods=['POST'])
@login_required
def create_grade(assignment_id, student_id):
    """
    Create a Grade
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = GradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        if not Assignment.query.filter_by(id=assignment_id).first():
            return jsonify({"message": "Assignment not found"}), 404
        
        grade_new = Grade(
            assignment_id=assignment_id,
            student_id=student_id,
            grade=form.data['grade']
        )

        db.session.add(grade_new)
        db.session.commit()

        class_ = Class.query.filter_by(id=grade_new.assignment.class_.id, teacher_id=current_user.teacher.id).first()
        
        return jsonify(class_.grade_book()), 201

    return form.errors, 400
    

@assignment_routes.route('/<int:assignment_id>/grades/<int:student_id>', methods=['PUT'])
@login_required
def edit_grade(assignment_id, student_id):
    """
    Edit a Grade
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    form = GradeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if not Assignment.query.filter_by(id=assignment_id).first():
                return jsonify({"message": "Assignment not found"}), 404
        
        grade_edit = Grade.query.filter_by(assignment_id=assignment_id, student_id=student_id).first()

        if not grade_edit:
                return jsonify({"message": "Grade not found"}), 404

        grade_edit.grade = form.data['grade']
        
        db.session.commit()

        class_ = Class.query.filter_by(id=grade_edit.assignment.class_.id, teacher_id=current_user.teacher.id).first()
        
        return jsonify(class_.grade_book()), 201
    
    return form.errors, 400



@assignment_routes.route('/<int:assignment_id>/grades/<int:student_id>', methods=['DELETE'])
@login_required
def delete_grade(assignment_id, student_id):
    """
    Delete a Grade
    """
    if current_user.type != 'teacher':
        return jsonify({"message": "Teacher Authorization Required"}), 401
    
    if not Assignment.query.filter_by(id=assignment_id).first():
            return jsonify({"message": "Assignment not found"}), 404
    
    grade_delete = Grade.query.filter_by(assignment_id=assignment_id, student_id=student_id).first()

    if not grade_delete:
            return jsonify({"message": "Grade not found"}), 404

    class_id = grade_delete.assignment.class_.id
    db.session.delete(grade_delete)
    db.session.commit()

    class_ = Class.query.filter_by(id=class_id, teacher_id=current_user.teacher.id).first()
    
    return jsonify(class_.grade_book()), 200


