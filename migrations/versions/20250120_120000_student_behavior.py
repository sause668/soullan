"""student_behavior

Revision ID: 9a1b2c3d4e5f
Revises: 85af3b758d2a
Create Date: 2025-01-20 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '9a1b2c3d4e5f'
down_revision = '85af3b758d2a'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('student_behaviors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.Column('attention', sa.Integer(), nullable=False),
    sa.Column('learnability', sa.Integer(), nullable=False),
    sa.Column('cooperation', sa.Integer(), nullable=False),
    sa.Column('notes', sa.Text(), nullable=True),
    # sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    # sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE student_behaviors SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('student_behaviors')
