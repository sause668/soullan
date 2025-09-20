from flask_wtf import FlaskForm
from wtforms import IntegerField
from .validators import range

class GradeForm(FlaskForm):
    grade = IntegerField('grade', validators=[range(0, 100)])
    
