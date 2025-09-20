from app.models import db, StudentClass, environment, SCHEMA
from sqlalchemy.sql import text



def seed_students_classes():

    algebra = [
        {
            'class_id': 1,
            'student_ids': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            'class_id': 2,
            'student_ids': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        },
        {
            'class_id': 3,
            'student_ids': [22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        {
            'class_id': 4,
            'student_ids': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
        }
    ]

    creative_writing = [
        {
            'class_id': 5,
            'student_ids': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
        },
        {
            'class_id': 6,
            'student_ids': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            'class_id': 7,
            'student_ids': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        },
        {
            'class_id': 8,
            'student_ids': [22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        
    ]

    physics = [
        {
            'class_id': 9,
            'student_ids': [22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        {
            'class_id': 10,
            'student_ids': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
        },
        {
            'class_id': 11,
            'student_ids': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            'class_id': 12,
            'student_ids': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        },
        
    ]
    
    us_history = [
        {
            'class_id': 13,
            'student_ids': [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
        },
        {
            'class_id': 14,
            'student_ids': [22, 23, 24, 25, 26, 27, 28, 29, 30]
        },
        {
            'class_id': 15,
            'student_ids': [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
        },
        {
            'class_id': 16,
            'student_ids': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        
    ]

    def add_students(classes):
        for class_ in classes:
            for student_id in class_['student_ids']:
                db.session.add(StudentClass(
                    class_id=class_['class_id'],
                    student_id=student_id
                ))

    add_students(algebra)
    add_students(creative_writing)
    add_students(physics)
    add_students(us_history)
    

    
    db.session.commit()



def undo_students_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.students_classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM students_classes"))
        
    db.session.commit()