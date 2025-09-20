from .db import db, environment, SCHEMA, add_prefix_for_prod



class Admin(db.Model):
    __tablename__ = 'admins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)

    user = db.relationship("User", back_populates="admin")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title
        }
    
    def info(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
    
    def search_info(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'email': self.user.email,
            'title': self.title,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
        }
