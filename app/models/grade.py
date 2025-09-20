from .db import db, environment, SCHEMA, add_prefix_for_prod



class Grade(db.Model):
    __tablename__ = 'grades'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    assignment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('assignments.id')), primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), primary_key=True)
    grade = db.Column(db.Integer, nullable=False)

    assignment = db.relationship("Assignment", uselist=False, back_populates="grades")
    
    def to_dict(self):
        return {
            "assignment_id": self.assignment_id,
            "student_id": self.student_id,
            "grade": self.grade
        }