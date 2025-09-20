from .db import db, environment, SCHEMA, add_prefix_for_prod



class Assignment(db.Model):
    __tablename__ = 'assignments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(2), nullable=False)
    quarter = db.Column(db.Integer, nullable=False)
    due_date = db.Column(db.Date, nullable=False)

    class_ = db.relationship("Class", uselist=False, back_populates="assignments")
    grades = db.relationship("Grade", uselist=True, back_populates="assignment", cascade="all, delete-orphan")

    def grade_book(self):
        return {
            "id": self.id,
            "class_id": self.class_id,
            "name": self.name,
            "type": self.type,
            "quarter": self.quarter,
            "due_date": self.due_date,
            "grades": [grade.to_dict() for grade in self.grades]
        }
    
    def grade(self, student_id):

        current_grade = None

        for grade in self.grades:
            gradeInfo = grade.to_dict()
            if gradeInfo['student_id'] == student_id:
                current_grade = gradeInfo['grade']

        return {
            "id": self.id,
            "class_id": self.class_id,
            "name": self.name,
            "type": self.type,
            "quarter": self.quarter,
            "due_date": self.due_date,
            "grade": current_grade
        }
    
    