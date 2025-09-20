from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired
from .validators import length, range


class ClassForm(FlaskForm):
    name = StringField('name', validators=[InputRequired(), length(100)])
    subject = StringField('subject', validators=[InputRequired(50)])
    grade = IntegerField('grade', validators=[InputRequired(), range(6, 8)])
    room = IntegerField('room', validators=[InputRequired(), range(100, 350)])
    period = IntegerField('period', validators=[InputRequired(), range(1, 4)])

