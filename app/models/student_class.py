from .db import db, environment, SCHEMA, add_prefix_for_prod



class StudentClass(db.Model):
    __tablename__ = 'students_classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('classes.id')), nullable=False, primary_key=True)

    def to_dict(self):
        return {
            'student_id': self.student_id,
            'class_id': self.class_id
        }