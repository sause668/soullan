from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class BehaviorGrade(db.Model):
    __tablename__ = 'behavior_grades'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    quarter = db.Column(db.Integer, nullable=False)
    attention = db.Column(db.Integer, nullable=True)  # 1-5 scale
    learning_speed = db.Column(db.Integer, nullable=True)  # 1-5 scale
    cooperation = db.Column(db.Integer, nullable=True)  # 1-5 scale
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    student = db.relationship("Student", uselist=False, back_populates="behavior_grades")
    class_ = db.relationship("Class", uselist=False, back_populates="behavior_grades")

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "class_id": self.class_id,
            "quarter": self.quarter,
            "attention": self.attention,
            "learning_speed": self.learning_speed,
            "cooperation": self.cooperation,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def calculate_final_grade(self):
        """Calculate the final behavior grade as average of the three components"""
        grades = [self.attention, self.learning_speed, self.cooperation]
        valid_grades = [grade for grade in grades if grade is not None]
        
        if not valid_grades:
            return None
            
        average = sum(valid_grades) / len(valid_grades)
        # Convert 1-5 scale to 0-100 scale for consistency with other grades
        return round(average * 20)

    @classmethod
    def get_or_create(cls, student_id, class_id, quarter):
        """Get existing behavior grade or create new one"""
        behavior_grade = cls.query.filter_by(
            student_id=student_id,
            class_id=class_id,
            quarter=quarter
        ).first()
        
        if not behavior_grade:
            behavior_grade = cls(
                student_id=student_id,
                class_id=class_id,
                quarter=quarter
            )
            db.session.add(behavior_grade)
            db.session.commit()
            
        return behavior_grade
