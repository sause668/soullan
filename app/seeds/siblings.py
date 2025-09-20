from app.models import db, Sibling, environment, SCHEMA
from sqlalchemy.sql import text



def seed_siblings():

    students = [
        {
            'id': 4,
            'siblingId': 9
        },
        {
            'id': 5,
            'siblingId': 8
        },
        {
            'id': 8,
            'siblingId': 15
        },
        {
            'id': 11,
            'siblingId': 12
        },
        {
            'id': 9,
            'siblingId': 14
        },
        {
            'id': 9,
            'siblingId': 16
        },
        {
            'id': 10,
            'siblingId': 13
        },
        {
            'id': 10,
            'siblingId': 16
        },
        {
            'id': 12,
            'siblingId': 13
        },
        {
            'id': 12,
            'siblingId': 14
        },
        {
            'id': 13,
            'siblingId': 19
        },
        {
            'id': 15,
            'siblingId': 17
        },
        {
            'id': 14,
            'siblingId': 22
        },
        {
            'id': 18,
            'siblingId': 18
        },
        {
            'id': 23,
            'siblingId': 35
        },
        {
            'id': 31,
            'siblingId': 27
        },
        {
            'id': 25,
            'siblingId': 37
        },
        {
            'id': 33,
            'siblingId': 29
        }
    ]

    for student in students:
        db.session.add(Sibling(
            student_id=student['id'],
            sibling_id=student['siblingId']
        ))
    
    db.session.commit()



def undo_siblings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.siblings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM siblings"))
        
    db.session.commit()