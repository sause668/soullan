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
    
    def info(self, student_id=None):
        """
        Return behavior info, optionally filtered by student_id
        If student_id is provided, only return if it matches the behavior's student_id
        """
        if student_id and self.student_id != student_id:
            return None
        
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'attention': self.attention,
            'learnability': self.learnability,
            'cooperation': self.cooperation,
            'notes': self.notes
        }

    def info_limited(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'attention': self.attention,
            'learnability': self.learnability,
            'cooperation': self.cooperation,
        }

    def grade(self, student_id):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'class_id': self.class_id,
            'attention': self.attention,
            'learnability': self.learnability,
            'cooperation': self.cooperation,
        }