from wtforms.validators import ValidationError
import re

def length(max=50):
    
    def _length(form, field): 
        if len(field.data) > max:
            raise ValidationError(f'Maximum {max} characters')
        
    return _length

def range(min=0, max=5):
    
    def _range(form, field): 
        val = int(field.data)
        if val < min or val > max:
            raise ValidationError(f'Must be between {min} and {max}')
        
    return _range

def isDate(form, field): 
    if re.match('^/d{4}-/d{2}-/d{2}$', field.data):
        raise ValidationError(f'Improper date')
