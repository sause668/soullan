"""grades

Revision ID: b4b73c7eb34c
Revises: 9d9a10fbdf4f
Create Date: 2024-12-02 20:20:10.649525

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'b4b73c7eb34c'
down_revision = '9d9a10fbdf4f'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('grades',
    sa.Column('assignment_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('grade', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['assignment_id'], ['assignments.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('assignment_id', 'student_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE grades SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('grades')
