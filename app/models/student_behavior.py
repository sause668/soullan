from .db import db, environment, SCHEMA, add_prefix_for_prod

class StudentBehavior(db.Model):
    __tablename__ = 'student_behaviors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False)
    attention = db.Column(db.Integer, nullable=False)  # Rating scale 1-10
    learnability = db.Column(db.Integer, nullable=False)  # Rating scale 1-10
    cooperation = db.Column(db.Integer, nullable=False)  # Rating scale 1-10
    notes = db.Column(db.Text, nullable=True)  # Optional notes field
    # created_at = db.Column(db.DateTime, server_default=db.func.now())
    # updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    # Relationships
    student = db.relationship("Student", back_populates="behaviors")
    class_ = db.relationship("Class", back_populates="behaviors")

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'attention': self.attention,
            'learnability': self.learnability,
            'cooperation': self.cooperation,
            'notes': self.notes
        }
    
    def info(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'attention': self.attention,
            'learnability': self.learnability,
            'cooperation': self.cooperation,
            'notes': self.notes,
            'student': self.student.info() if self.student else None,
            'class': self.class_.class_info() if self.class_ else None
        }
