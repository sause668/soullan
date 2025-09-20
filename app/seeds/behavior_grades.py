from app.models import db, BehaviorGrade, Class, Student, environment, SCHEMA
from sqlalchemy.sql import text


def seed_behavior_grades():
    """Seed behavior grades for all students in all classes"""
    
    # Get all classes and their students
    classes = Class.query.all()
    
    for class_ in classes:
        for student in class_.students:
            # Create behavior grades for all 4 quarters
            for quarter in range(1, 5):
                # Generate some variety in behavior grades (1-5 scale)
                # Using student ID and quarter to create consistent but varied data
                base_score = (student.id + quarter) % 5 + 1
                
                attention = base_score
                learning_speed = (base_score + 1) % 5 + 1 if (base_score + 1) % 5 != 0 else 5
                cooperation = (base_score + 2) % 5 + 1 if (base_score + 2) % 5 != 0 else 5
                
                behavior_grade = BehaviorGrade(
                    student_id=student.id,
                    class_id=class_.id,
                    quarter=quarter,
                    attention=attention,
                    learning_speed=learning_speed,
                    cooperation=cooperation
                )
                
                db.session.add(behavior_grade)
    
    db.session.commit()


def undo_behavior_grades():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.behavior_grades RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM behavior_grades"))
        
    db.session.commit()
