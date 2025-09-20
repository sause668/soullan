from flask.cli import AppGroup
from .users import seed_users, undo_users
from .admins import seed_admins, undo_admins
from .teachers import seed_teachers, undo_teachers
from .students import seed_students, undo_students
from .siblings import seed_siblings, undo_siblings
from .classes import seed_classes, undo_classes
from .students_classes import seed_students_classes, undo_students_classes
from .assignments import seed_assignments, undo_assignments
from . grades import seed_grades, undo_grades
from .student_behaviors import seed_student_behaviors, undo_student_behaviors

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    undo_student_behaviors()
    undo_grades()
    undo_assignments()
    undo_students_classes()
    undo_classes()
    undo_siblings()
    undo_students()
    undo_teachers()
    undo_admins()
    undo_users()

    seed_users()
    seed_admins()
    seed_teachers()
    seed_students()
    seed_classes()
    seed_siblings()
    seed_students_classes()
    seed_assignments()
    seed_grades()
    seed_student_behaviors()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_student_behaviors()
    undo_grades()
    undo_assignments()
    undo_students_classes()
    undo_classes()
    undo_siblings()
    undo_students()
    undo_teachers()
    # undo_admins()
    undo_users()
