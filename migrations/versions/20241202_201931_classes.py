"""classes

Revision ID: 2074a18457ce
Revises: fd3c6c116e7e
Create Date: 2024-12-02 20:19:31.048575

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '2074a18457ce'
down_revision = 'fd3c6c116e7e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('classes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('teacher_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('subject', sa.String(length=50), nullable=False),
    sa.Column('grade', sa.Integer(), nullable=False),
    sa.Column('room', sa.Integer(), nullable=False),
    sa.Column('period', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['teacher_id'], ['teachers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE classes SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('classes')
