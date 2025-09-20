import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    
    # Gemini AI Configuration
    GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
    GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.0-flash-lite')
    GEMINI_TEMPERATURE = float(os.environ.get('GEMINI_TEMPERATURE', '0.7'))
    GEMINI_MAX_TOKENS = int(os.environ.get('GEMINI_MAX_TOKENS', '2048'))