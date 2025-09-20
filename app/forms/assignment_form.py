from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from .validators import length, range, isDate


class AssignmentForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), length(50)])
    type = StringField('type', validators=[DataRequired(), length(2)])
    quarter = IntegerField('quarter', validators=[DataRequired(), range(1, 4)])
    due_date = StringField('due_date', validators=[DataRequired(), isDate])
    
