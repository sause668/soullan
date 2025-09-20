"""students

Revision ID: fd3c6c116e7e
Revises: 4401c116b15d
Create Date: 2024-12-02 20:19:12.559930

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'fd3c6c116e7e'
down_revision = '4401c116b15d'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('students',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('grade', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE students SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('students')
