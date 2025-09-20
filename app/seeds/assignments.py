from app.models import db, Assignment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_assignments():

    algebra = {
        'quarters': [
            {
                'quarter': 1,
                'assignments': [
                    {
                        'name': 'Exponents Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 8, 19),
                    },
                    {
                        'name': 'Exponents Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 8, 22),
                    },
                    {
                        'name': 'Exponents Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 8, 26),
                    },
                    {
                        'name': 'Square Root Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 3),
                    },
                    {
                        'name': 'Square Root Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 5),
                    },
                    {
                        'name': 'Square Root Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 9, 9),
                    },
                    {
                        'name': 'Exponents & Square Root Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 16),
                    },
                    {
                        'name': 'Exponents & Square Root Test',
                        'type': 'T',
                        'due_date': datetime(2024, 9, 18),
                    },
                    {
                        'name': 'Expressions Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 23),
                    },
                    {
                        'name': 'Expressions Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 25),
                    },
                    {
                        'name': 'Expressions Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 1),
                    },
                    {
                        'name': 'Expressions Project',
                        'type': 'P',
                        'due_date': datetime(2024, 10, 11),
                    },
                    {
                        'name': 'Quarter 1 Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 16),
                    },
                    {
                        'name': 'Quarter 1 Test',
                        'type': 'T',
                        'due_date': datetime(2024, 10, 18),
                    },
                ]
            },
            {
                'quarter': 2,
                'assignments': [
                    {
                        'name': 'Transition Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 10, 21),
                    },
                    {
                        'name': 'Transition Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 24),
                    },
                    {
                        'name': 'Transition Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 28),
                    },
                    {
                        'name': 'Reflection Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 11, 4),
                    },
                    {
                        'name': 'Reflection Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 6),
                    },
                    {
                        'name': 'Reflection Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 11, 12),
                    },
                    {
                        'name': 'Transition & Reflection Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 19),
                    },
                    {
                        'name': 'Transition & Reflection Test',
                        'type': 'T',
                        'due_date': datetime(2024, 11, 21),
                    },
                ]
            },
            
        ],
        'class_ids': [1, 2, 3, 4]
    }

    creative_writing = {
        'quarters': [
            {
                'quarter': 1,
                'assignments': [
                    {
                        'name': 'Characters Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 8, 19),
                    },
                    {
                        'name': 'Characters Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 8, 22),
                    },
                    {
                        'name': 'Characters Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 8, 26),
                    },
                    {
                        'name': 'Plot Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 3),
                    },
                    {
                        'name': 'Plot Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 5),
                    },
                    {
                        'name': 'Plot Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 9, 9),
                    },
                    {
                        'name': 'Story Elements Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 16),
                    },
                    {
                        'name': 'Story Elements Test',
                        'type': 'T',
                        'due_date': datetime(2024, 9, 18),
                    },
                    {
                        'name': 'Point of View Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 23),
                    },
                    {
                        'name': 'Point of View Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 25),
                    },
                    {
                        'name': 'Point of View Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 1),
                    },
                    {
                        'name': 'Short Story Project',
                        'type': 'P',
                        'due_date': datetime(2024, 10, 11),
                    },
                    {
                        'name': 'Quarter 1 Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 16),
                    },
                    {
                        'name': 'Quarter 1 Test',
                        'type': 'T',
                        'due_date': datetime(2024, 10, 18),
                    },
                ]
            },
            {
                'quarter': 2,
                'assignments': [
                    {
                        'name': 'Narrative Nonfiction Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 10, 21),
                    },
                    {
                        'name': 'Narrative Nonfiction Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 24),
                    },
                    {
                        'name': 'Narrative Nonfiction Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 28),
                    },
                    {
                        'name': 'Personal Essays Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 11, 4),
                    },
                    {
                        'name': 'Personal Essays Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 6),
                    },
                    {
                        'name': 'Personal Essays Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 11, 12),
                    },
                    {
                        'name': 'Types of Nonfiction Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 19),
                    },
                    {
                        'name': 'Types of Nonfiction Test',
                        'type': 'T',
                        'due_date': datetime(2024, 11, 21),
                    },
                ]
            },
            
        ],
        'class_ids': [5, 6, 7, 8]
    }

    physics = {
        'quarters': [
            {
                'quarter': 1,
                'assignments': [
                    {
                        'name': 'Velocity Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 8, 19),
                    },
                    {
                        'name': 'Velocity Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 8, 22),
                    },
                    {
                        'name': 'Velocity Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 8, 26),
                    },
                    {
                        'name': 'Acceleration Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 3),
                    },
                    {
                        'name': 'Acceleration Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 5),
                    },
                    {
                        'name': 'Acceleration Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 9, 9),
                    },
                    {
                        'name': 'Motion Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 16),
                    },
                    {
                        'name': 'Motion Test',
                        'type': 'T',
                        'due_date': datetime(2024, 9, 18),
                    },
                    {
                        'name': 'Force Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 23),
                    },
                    {
                        'name': 'Force Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 25),
                    },
                    {
                        'name': 'Force Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 1),
                    },
                    {
                        'name': 'Motion Project',
                        'type': 'P',
                        'due_date': datetime(2024, 10, 11),
                    },
                    {
                        'name': 'Quarter 1 Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 16),
                    },
                    {
                        'name': 'Quarter 1 Test',
                        'type': 'T',
                        'due_date': datetime(2024, 10, 18),
                    },
                ]
            },
            {
                'quarter': 2,
                'assignments': [
                    {
                        'name': 'Planes & Levers Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 10, 21),
                    },
                    {
                        'name': 'Planes & Levers Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 24),
                    },
                    {
                        'name': 'Planes & Levers Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 28),
                    },
                    {
                        'name': 'Wheels and Pulleys Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 11, 4),
                    },
                    {
                        'name': 'Wheels and Pulleys Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 6),
                    },
                    {
                        'name': 'Wheels and Pulleys Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 11, 12),
                    },
                    {
                        'name': 'Simple Machines Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 19),
                    },
                    {
                        'name': 'Simple Machines Test',
                        'type': 'T',
                        'due_date': datetime(2024, 11, 21),
                    },
                ]
            },
            
        ],
        'class_ids': [9, 10, 11, 12]
    }

    us_history = {
        'quarters': [
            {
                'quarter': 1,
                'assignments': [
                    {
                        'name': 'Roanoke Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 8, 19),
                    },
                    {
                        'name': 'Roanoke Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 8, 22),
                    },
                    {
                        'name': 'Roanoke Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 8, 26),
                    },
                    {
                        'name': 'Jamestown Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 3),
                    },
                    {
                        'name': 'Jamestown Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 5),
                    },
                    {
                        'name': 'Jamestown Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 9, 9),
                    },
                    {
                        'name': 'First Colonies Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 16),
                    },
                    {
                        'name': 'First Colonies Test',
                        'type': 'T',
                        'due_date': datetime(2024, 9, 18),
                    },
                    {
                        'name': 'Plymouth Rock Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 9, 23),
                    },
                    {
                        'name': 'Plymouth Rock Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 9, 25),
                    },
                    {
                        'name': 'Plymouth Rock Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 1),
                    },
                    {
                        'name': 'First Colonies Project',
                        'type': 'P',
                        'due_date': datetime(2024, 10, 11),
                    },
                    {
                        'name': 'Quarter 1 Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 16),
                    },
                    {
                        'name': 'Quarter 1 Test',
                        'type': 'T',
                        'due_date': datetime(2024, 10, 18),
                    },
                ]
            },
            {
                'quarter': 2,
                'assignments': [
                    {
                        'name': 'French & Indian War Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 10, 21),
                    },
                    {
                        'name': 'French & Indian War Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 10, 24),
                    },
                    {
                        'name': 'French & Indian War Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 10, 28),
                    },
                    {
                        'name': 'Boston Tea Party Classwork',
                        'type': 'CW',
                        'due_date': datetime(2024, 11, 4),
                    },
                    {
                        'name': 'Declaration of Independence Homework',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 6),
                    },
                    {
                        'name': 'Declaration of Independence Quiz',
                        'type': 'Q',
                        'due_date': datetime(2024, 11, 12),
                    },
                    {
                        'name': 'Revolutionary War Review',
                        'type': 'HW',
                        'due_date': datetime(2024, 11, 19),
                    },
                    {
                        'name': 'Revolutionary War Test',
                        'type': 'T',
                        'due_date': datetime(2024, 11, 21),
                    },
                ]
            },
            
        ],
        'class_ids': [13, 14, 15, 16]
    }

    def add_assignments(class_):
        for quarter in class_['quarters']:
            for assignment in quarter['assignments']:
                for class_id in class_['class_ids']:
                    db.session.add(Assignment(
                        class_id=class_id,
                        name=assignment['name'],
                        type=assignment['type'],
                        quarter=quarter['quarter'],
                        due_date=assignment['due_date']
                    ))
                
    
    add_assignments(algebra)
    add_assignments(creative_writing)
    add_assignments(physics)
    add_assignments(us_history)
    
    

    
    db.session.commit()



def undo_assignments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.assignments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM assignments"))
        
    db.session.commit()