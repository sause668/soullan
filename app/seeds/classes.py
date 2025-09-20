from app.models import db, Class, environment, SCHEMA
from sqlalchemy.sql import text



def seed_classes():

    classes = [
        {
            'teacher_id': 1,
            'name': 'Algebra',
            'subject': 'Math',
            'grade': 8,
            'room': 315,
            'period': 1
        },
        {
            'teacher_id': 1,
            'name': 'Algebra',
            'subject': 'Math',
            'grade': 8,
            'room': 315,
            'period': 2
        },
        {
            'teacher_id': 1,
            'name': 'Algebra',
            'subject': 'Math',
            'grade': 8,
            'room': 315,
            'period': 3
        },
        {
            'teacher_id': 1,
            'name': 'Algebra',
            'subject': 'Math',
            'grade': 8,
            'room': 315,
            'period': 4
        },
        {
            'teacher_id': 2,
            'name': 'Creative Writing',
            'subject': 'Language Arts',
            'grade': 8,
            'room': 302,
            'period': 1
        },
        {
            'teacher_id': 2,
            'name': 'Creative Writing',
            'subject': 'Language Arts',
            'grade': 8,
            'room': 302,
            'period': 2
        },
        {
            'teacher_id': 2,
            'name': 'Creative Writing',
            'subject': 'Language Arts',
            'grade': 8,
            'room': 302,
            'period': 3
        },
        {
            'teacher_id': 2,
            'name': 'Creative Writing',
            'subject': 'Language Arts',
            'grade': 8,
            'room': 302,
            'period': 4
        },
        {
            'teacher_id': 3,
            'name': 'Physics',
            'subject': 'Science',
            'grade': 8,
            'room': 307,
            'period': 1
        },
        {
            'teacher_id': 3,
            'name': 'Physics',
            'subject': 'Science',
            'grade': 8,
            'room': 307,
            'period': 2
        },
        {
            'teacher_id': 3,
            'name': 'Physics',
            'subject': 'Science',
            'grade': 8,
            'room': 307,
            'period': 3
        },
        {
            'teacher_id': 3,
            'name': 'Physics',
            'subject': 'Science',
            'grade': 8,
            'room': 307,
            'period': 4
        },
        {
            'teacher_id': 4,
            'name': 'U.S. History',
            'subject': 'Social Studies',
            'grade': 8,
            'room': 309,
            'period': 1
        },
        {
            'teacher_id': 4,
            'name': 'U.S. History',
            'subject': 'Social Studies',
            'grade': 8,
            'room': 309,
            'period': 2
        },
        {
            'teacher_id': 4,
            'name': 'U.S. History',
            'subject': 'Social Studies',
            'grade': 8,
            'room': 309,
            'period': 3
        },
        {
            'teacher_id': 4,
            'name': 'U.S. History',
            'subject': 'Social Studies',
            'grade': 8,
            'room': 309,
            'period': 4
        }
    ]

    for class_ in classes:
        db.session.add(Class(
            teacher_id=class_['teacher_id'],
            name=class_['name'],
            subject=class_['subject'],
            grade=class_['grade'],
            room=class_['room'],
            period=class_['period']
        ))

    
    db.session.commit()



def undo_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM classes"))
        
    db.session.commit()