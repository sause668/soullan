from .db import db, environment, SCHEMA, add_prefix_for_prod
from .student_class import StudentClass

students_classes = StudentClass.__table__

class Class(db.Model):
    __tablename__ = 'classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teachers.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    room = db.Column(db.Integer, nullable=False)
    period = db.Column(db.Integer, nullable=False)

    teacher = db.relationship("Teacher", uselist=False, back_populates="classes")
    students = db.relationship("Student", uselist=True, secondary=students_classes, back_populates="classes")
    assignments = db.relationship("Assignment", uselist=True, back_populates="class_", cascade="all, delete-orphan")
    behaviors = db.relationship("StudentBehavior", uselist=True, back_populates="class_", cascade="all, delete-orphan")

    def teacher_dash(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "num_students": len(self.students)
        }

    def student_dash(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "current_grade": "To be worked on",
            "teacher": self.teacher.info()
        }
    
    def grade_book(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "students": [student.info() for student in self.students],
            "assignments": [assignment.grade_book() for assignment in self.assignments]
        }
    
    def grades(self, student_id):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "current_grade": "To be worked on",
            "assignments": [assignment.grade(student_id) for assignment in self.assignments],
            "teacher": self.teacher.info()
        }
    
    def class_search(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "teacher": self.teacher.info(),
            "students": [student.info() for student in self.students]
        }
    
    def class_info(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "subject": self.subject,
            "grade": self.grade,
            "period": self.period,
            "room": self.room,
            "teacher": self.teacher.info(),
            "students": [student.info() for student in self.students],
            "assignments": [assignment.grade_book() for assignment in self.assignments]
        }
    
    