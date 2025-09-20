from app.models import db, Admin, environment, SCHEMA
from sqlalchemy.sql import text



def seed_admins():

    admins = [
        {
            'user_id': 46,
            'title': 'Principle'
        },
        
    ]

    for admin in admins:
        db.session.add(Admin(
            user_id=admin['user_id'],
            title=admin['title']
        ))

    
    db.session.commit()



def undo_admins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.admins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM admins"))
        
    db.session.commit()