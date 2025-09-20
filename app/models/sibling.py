from .db import db, environment, SCHEMA, add_prefix_for_prod



class Sibling(db.Model):
    __tablename__ = 'siblings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False, primary_key=True)
    sibling_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, primary_key=True)

    def to_dict(self):
        return {
            'student_id': self.student_id,
            'sibling_id': self.sibling_id
        }