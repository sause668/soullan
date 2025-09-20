from flask import Blueprint, request
from app.models import User, Teacher, Student, db
from app.forms import LoginForm
from app.forms import SignUpForm, SignUpFormTeacher, SignUpFormStudent
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """

    if not current_user.is_authenticated:
        isLandingPage = request.headers.get('Landing-Page')
        if isLandingPage:
            return {'landing': 'true'}
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    return current_user.to_dict()


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            type=form.data['type'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401

@auth_routes.route('/signup/teacher', methods=['POST'])
def sign_up_teacher():
    """
    Creates a new teacher user and logs them in
    """
    form = SignUpFormTeacher()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            type=form.data['type'],
            password=form.data['password']
        )

        db.session.add(user)
        db.session.commit()

        teacher = Teacher(
            user_id=user.signup_id(),
            primary_grade=form.data['primary_grade'],
            primary_subject=form.data['primary_subject']
        )

        db.session.add(teacher)
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return form.errors, 400


@auth_routes.route('/signup/student', methods=['POST'])
def sign_up_student():
    """
    Creates a new student user and logs them in
    """
    form = SignUpFormStudent()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            type=form.data['type'],
            password=form.data['password']
        )

        db.session.add(user)
        db.session.commit()

        student = Student(
            user_id=user.signup_id(),
            grade=form.data['grade']
        )

        db.session.add(student)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401