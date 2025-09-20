from app.models import db, Teacher, environment, SCHEMA
from sqlalchemy.sql import text



def seed_teachers():

    teachers = [
        {
            'user_id': 1,
            'primary_grade': 7,
            'primary_subject': 'Math'
        },
        {
            'user_id': 2,
            'primary_grade': 7,
            'primary_subject': 'Language Arts'
        },
        {
            'user_id': 3,
            'primary_grade': 7,
            'primary_subject': 'Science'
        },
        {
            'user_id': 4,
            'primary_grade': 7,
            'primary_subject': 'Social Studies'
        },
        
    ]

    for teacher in teachers:
        db.session.add(Teacher(
            user_id=teacher['user_id'],
            primary_grade=teacher['primary_grade'],
            primary_subject=teacher['primary_subject']
        ))

    
    db.session.commit()



def undo_teachers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teachers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teachers"))
        
    db.session.commit()