from .db import db, environment, SCHEMA, add_prefix_for_prod



class Teacher(db.Model):
    __tablename__ = 'teachers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    primary_grade = db.Column(db.Integer, nullable=False)
    primary_subject = db.Column(db.String(50), nullable=False)

    user = db.relationship("User", back_populates="teacher")
    classes = db.relationship("Class", uselist=True, back_populates="teacher", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'primary_grade': self.primary_grade,
            'primary_subject': self.primary_subject
        }
    
    def info(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'primary_grade': self.primary_grade,
            'primary_subject': self.primary_subject,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
    
    def search_info(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'email': self.user.email,
            'primary_grade': self.primary_grade,
            'primary_subject': self.primary_subject,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }
