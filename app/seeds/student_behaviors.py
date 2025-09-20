from app.models import db, StudentBehavior, environment, SCHEMA
from sqlalchemy.sql import text
import random




def seed_student_behaviors():
    # Get all student-class combinations from the students_classes table
    student_class_combinations = db.session.execute(text("""
        SELECT student_id, class_id 
        FROM students_classes 
        ORDER BY student_id, class_id
    """)).fetchall()
    
    # Behavior notes templates
    behavior_notes = [
        "Excellent focus during group activities",
        "Sometimes needs reminders to stay on task",
        "Very engaged and asks thoughtful questions",
        "Works well independently",
        "Struggles with following directions at times",
        "Shows great improvement in participation",
        "Needs encouragement to speak up in class",
        "Always prepared and ready to learn",
        "Can be disruptive during quiet work time",
        "Demonstrates strong leadership skills",
        "Requires frequent redirection",
        "Collaborates well with peers",
        "Shows initiative in problem-solving",
        "Sometimes rushes through assignments",
        "Very respectful and courteous",
        "Needs help staying organized",
        "Excels at hands-on activities",
        "Can be argumentative with classmates",
        "Shows creativity in projects",
        "Needs to work on time management"
    ]
    
    for student_id, class_id in student_class_combinations:
        # Generate realistic behavior scores (mostly 6-9 range with some variation)
        attention = 3
        if random.random() < 0.5:  # 10% chance of lower scores
            attention = random.randint(1, 2)
        elif random.random() < 0.5:  # 5% chance of higher scores
            attention = random.randint(4, 5)
        
        learnability = 3    
        if random.random() < 0.5:  # 10% chance of lower scores
            learnability = random.randint(1, 2)
        elif random.random() < 0.5:  # 5% chance of higher scores
            learnability = random.randint(4, 5)
            
        cooperation = 3
        if random.random() < 0.5:  # 10% chance of lower scores
            cooperation = random.randint(1, 2)
        elif random.random() < 0.5:  # 5% chance of higher scores
            cooperation = random.randint(4, 5)
        
        # 70% chance of having notes
        notes = random.choice(behavior_notes) if random.random() < 0.3 else None
        
        db.session.add(StudentBehavior(
            student_id=student_id,
            class_id=class_id,
            attention=attention,
            learnability=learnability,
            cooperation=cooperation,
            notes=notes
        ))
    
    db.session.commit()


def undo_student_behaviors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.student_behaviors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM student_behaviors"))
        
    db.session.commit()
