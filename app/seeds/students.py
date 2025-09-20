from app.models import db, Student, environment, SCHEMA
from sqlalchemy.sql import text



def seed_students():

    students = [
        {
            'user_id': 5,
            'grade': 8
        },
        {
            'user_id': 6,
            'grade': 8
        },
        {
            'user_id': 7,
            'grade': 8
        },
        {
            'user_id': 8,
            'grade': 8
        },
        {
            'user_id': 9,
            'grade': 8
        },
        {
            'user_id': 10,
            'grade': 8
        },
        {
            'user_id': 11,
            'grade': 8
        },
        {
            'user_id': 12,
            'grade': 8
        },
        {
            'user_id': 13,
            'grade': 8
        },
        {
            'user_id': 14,
            'grade': 8
        },
        {
            'user_id': 15,
            'grade': 8
        },
        {
            'user_id': 16,
            'grade': 8
        },
        {
            'user_id': 17,
            'grade': 8
        },
        {
            'user_id': 18,
            'grade': 8
        },
        {
            'user_id': 19,
            'grade': 8
        },
        {
            'user_id': 20,
            'grade': 8
        },
        {
            'user_id': 21,
            'grade': 8
        },
        {
            'user_id': 22,
            'grade': 8
        },
        {
            'user_id': 23,
            'grade': 8
        },
        {
            'user_id': 24,
            'grade': 8
        },
        {
            'user_id': 25,
            'grade': 8
        },
        {
            'user_id': 26,
            'grade': 8
        },
        {
            'user_id': 27,
            'grade': 8
        },
        {
            'user_id': 28,
            'grade': 8
        },
        {
            'user_id': 29,
            'grade': 8
        },
        {
            'user_id': 30,
            'grade': 8
        },
        {
            'user_id': 31,
            'grade': 8
        },
        {
            'user_id': 32,
            'grade': 8
        },
        {
            'user_id': 33,
            'grade': 8
        },
        {
            'user_id': 34,
            'grade': 8
        },
        {
            'user_id': 35,
            'grade': 8
        },
        {
            'user_id': 36,
            'grade': 8
        },
        {
            'user_id': 37,
            'grade': 8
        },
        {
            'user_id': 38,
            'grade': 8
        },
        {
            'user_id': 39,
            'grade': 8
        },
        {
            'user_id': 40,
            'grade': 8
        },
        {
            'user_id': 41,
            'grade': 8
        },
        {
            'user_id': 42,
            'grade': 8
        },
        {
            'user_id': 43,
            'grade': 8
        },
        {
            'user_id': 44,
            'grade': 8
        },
        {
            'user_id': 45,
            'grade': 8
        },
        
    ]

    for student in students:
        db.session.add(Student(
            user_id=student['user_id'],
            grade=student['grade']
        ))
    
    db.session.commit()



def undo_students():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.students RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM students"))
        
    db.session.commit()