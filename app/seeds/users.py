from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():

    admins = [
        {
            'username': 'adumbledore', 
            'email': 'adumbledore@soulacademy.com', 
            'first_name': 'Albus',
            'last_name': 'Dumbledore',
        }
    ]

    teachers = [
        {
            'username': 'ssnape', 
            'email': 'ssnape@soulacademy.com', 
            'first_name': 'Sliverus',
            'last_name': 'Snape',
        },
        {
            'username': 'cxavier', 
            'email': 'cxavier@soulacademy.com', 
            'first_name': 'Charles',
            'last_name': 'Xavier',
        },
        {
            'username': 'adumbledor',
            'email': 'adumbledor@soulacademy.com',
            'first_name': 'Albus',
            'last_name': 'Dumbledore',
        },
        {
            'username': 'tlannister', 
            'email': 'tlannister@soulacademy.com', 
            'first_name': 'Tywin',
            'last_name': 'Lannister',
        }
    ]

    students = [
        {
            'username': 'hpotter', 
            'email': 'hpotter@soulacademy.com', 
            'first_name': 'Harry',
            'last_name': 'Potter',
        },
        {
            'username': 'rhenry', 
            'email': 'rhenry@soulacademy.com', 
            'first_name': 'Rob',
            'last_name': 'Henry',
        },
        {
            'username': 'llovegood', 
            'email': 'llovegood@soulacademy.com', 
            'first_name': 'Luna',
            'last_name': 'Lovegood',
        },
        {
            'username': 'ggarcia', 
            'email': 'ggarcia@soulacademy.com', 
            'first_name': 'Gloria',
            'last_name': 'Garcia',
        },
        {
            'username': 'cgarcia', 
            'email': 'cgarcia@soulacademy.com', 
            'first_name': 'Chris',
            'last_name': 'Garcia',
        },
        {
            'username': 'hgranger', 
            'email': 'hgranger@soulacademy.com', 
            'first_name': 'Harminie',
            'last_name': 'Granger',
        },
        {
            'username': 'jlannister', 
            'email': 'jlannister@soulacademy.com', 
            'first_name': 'Jamie',
            'last_name': 'Lannister',
        },
        {
            'username': 'rweasley', 
            'email': 'rweasley@soulacademy.com', 
            'first_name': 'Ronald',
            'last_name': 'Weasley',
        },
        {
            'username': 'sstark', 
            'email': 'sstark@soulacademy.com', 
            'first_name': 'Sansa',
            'last_name': 'Stark',
        },
        {
            'username': 'astark', 
            'email': 'astark@soulacademy.com', 
            'first_name': 'Aria',
            'last_name': 'Stark',
        },
        {
            'username': 'gweasley', 
            'email': 'gweasley@soulacademy.com', 
            'first_name': 'Ginny',
            'last_name': 'Weasley',
        },
        {
            'username': 'jsnow', 
            'email': 'jsnow@soulacademy.com', 
            'first_name': 'John',
            'last_name': 'Snow',
        },
        {
            'username': 'tava', 
            'email': 'tava@soulacademy.com', 
            'first_name': 'Tony',
            'last_name': 'Ava',
        },
        {
            'username': 'tsinger', 
            'email': 'tsinger@soulacademy.com', 
            'first_name': 'Tasha',
            'last_name': 'Singer',
        },
        {
            'username': 'aava', 
            'email': 'aava@soulacademy.com', 
            'first_name': 'Angela',
            'last_name': 'Ava',
        },
        {
            'username': 'slacey', 
            'email': 'slacey@soulacademy.com', 
            'first_name': 'Steve',
            'last_name': 'Lacey',
        },
        {
            'username': 'bmckane', 
            'email': 'bmckane@soulacademy.com', 
            'first_name': 'Bruce',
            'last_name': 'McKane',
        },
        {
            'username': 'nsinger', 
            'email': 'nsinger@soulacademy.com', 
            'first_name': 'Natasha',
            'last_name': 'Singer',
        },
        {
            'username': 'gfallen', 
            'email': 'gfallen@soulacademy.com', 
            'first_name': 'Ginger',
            'last_name': 'Fallen',
        },
        {
            'username': 'gbrown', 
            'email': 'gbrown@soulacademy.com', 
            'first_name': 'Gina',
            'last_name': 'Brown',
        },
        {
            'username': 'jgarfield', 
            'email': 'jgarfield@soulacademy.com', 
            'first_name': 'Jerry',
            'last_name': 'Garfield',
        },
        {
            'username': 'szimmerman', 
            'email': 'szimmerman@soulacademy.com', 
            'first_name': 'Sophia',
            'last_name': 'Zimmerman',
        },
        {
            'username': 'ksmith', 
            'email': 'ksmith@soulacademy.com', 
            'first_name': 'Kelsey',
            'last_name': 'Smith',
        },
        {
            'username': 'bkiddo', 
            'email': 'bkiddo@soulacademy.com', 
            'first_name': 'Beatrice',
            'last_name': 'Kiddo',
        },
        {
            'username': 'emiller', 
            'email': 'emiller@soulacademy.com', 
            'first_name': 'Effie',
            'last_name': 'Miller',
        },
        {
            'username': 'hdove', 
            'email': 'hdove@soulacademy.com', 
            'first_name': 'Hillary',
            'last_name': 'Dove',
        },
        {
            'username': 'mmorales', 
            'email': 'mmorales@soulacademy.com', 
            'first_name': 'Miles',
            'last_name': 'Morales',
        },
        {
            'username': 'gstefanie', 
            'email': 'gstefanie@soulacademy.com', 
            'first_name': 'Gwen',
            'last_name': 'Stefanie',
        },
        {
            'username': 'kgates', 
            'email': 'kgates@soulacademy.com', 
            'first_name': 'Kevin',
            'last_name': 'Gates',
        },
        {
            'username': 'kwashington', 
            'email': 'kwashington@soulacademy.com', 
            'first_name': 'Kelly',
            'last_name': 'Washington',
        },
        {
            'username': 'lsmith', 
            'email': 'lsmith@soulacademy.com', 
            'first_name': 'Latoya',
            'last_name': 'Smith',
        },
        {
            'username': 'mscott', 
            'email': 'mscott@soulacademy.com', 
            'first_name': 'Mike',
            'last_name': 'Scott',
        },
        {
            'username': 'jmiller', 
            'email': 'jmiller@soulacademy.com', 
            'first_name': 'Joshua',
            'last_name': 'Miller',
        },
        {
            'username': 'ncannon', 
            'email': 'ncannon@soulacademy.com', 
            'first_name': 'Nick',
            'last_name': 'Cannon',
        },
        {
            'username': 'bwhite', 
            'email': 'bwhite@soulacademy.com', 
            'first_name': 'Barry',
            'last_name': 'White',
        },
        {
            'username': 'yaddams', 
            'email': 'yaddams@soulacademy.com', 
            'first_name': 'Yolanda',
            'last_name': 'Addams',
        },
        {
            'username': 'aford', 
            'email': 'aford@soulacademy.com', 
            'first_name': 'Alisa',
            'last_name': 'Ford',
        },
        {
            'username': 'asimpson', 
            'email': 'asimpson@soulacademy.com', 
            'first_name': 'Ashley',
            'last_name': 'Simpson',
        },
        {
            'username': 'mmiranda', 
            'email': 'mmiranda@soulacademy.com', 
            'first_name': 'Mia',
            'last_name': 'Miranda',
        },
        {
            'username': 'rorzolf', 
            'email': 'rorzolf@soulacademy.com', 
            'first_name': 'Ryan',
            'last_name': 'Orzolf',
        },
        {
            'username': 'ecullen', 
            'email': 'ecullen@soulacademy.com', 
            'first_name': 'Edward',
            'last_name': 'Cullen',
        },
        
    ]

    

    for teacher in teachers:
        db.session.add(User(
            username=teacher['username'], 
            email=teacher['email'], 
            password='password',
            first_name=teacher['first_name'],
            last_name=teacher['last_name'],
            type='teacher',
        ))
        
    for student in students:
        db.session.add(User(
            username=student['username'], 
            email=student['email'], 
            password='password',
            first_name=student['first_name'],
            last_name=student['last_name'],
            type='student',
        ))

    for admin in admins:
        db.session.add(User(
            username=admin['username'], 
            email=admin['email'], 
            password='password',
            first_name=admin['first_name'],
            last_name=admin['last_name'],
            type='admin',
        ))

    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
