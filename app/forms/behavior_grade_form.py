from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from .validators import range

class BehaviorGradeForm(FlaskForm):
    attention = IntegerField('attention', validators=[range(1, 5)])
    learning_speed = IntegerField('learning_speed', validators=[range(1, 5)])
    cooperation = IntegerField('cooperation', validators=[range(1, 5)])
    quarter = IntegerField('quarter', validators=[range(1, 4)])

class BehaviorGradeUpdateForm(FlaskForm):
    attention = IntegerField('attention', validators=[range(1, 5)])
    learning_speed = IntegerField('learning_speed', validators=[range(1, 5)])
    cooperation = IntegerField('cooperation', validators=[range(1, 5)])
