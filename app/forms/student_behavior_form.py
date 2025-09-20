from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Optional
from .validators import range


class StudentBehaviorForm(FlaskForm):
    student_id = IntegerField('student_id', validators=[DataRequired()])
    attention = IntegerField('attention', validators=[DataRequired(), range(1, 10)])
    learnability = IntegerField('learnability', validators=[DataRequired(), range(1, 10)])
    cooperation = IntegerField('cooperation', validators=[DataRequired(), range(1, 10)])
    notes = TextAreaField('notes', validators=[Optional()])


class StudentBehaviorUpdateForm(FlaskForm):
    attention = IntegerField('attention', validators=[DataRequired(), range(1, 10)])
    learnability = IntegerField('learnability', validators=[DataRequired(), range(1, 10)])
    cooperation = IntegerField('cooperation', validators=[DataRequired(), range(1, 10)])
    notes = TextAreaField('notes', validators=[Optional()])
