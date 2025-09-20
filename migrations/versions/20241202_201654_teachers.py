"""teachers

Revision ID: 4401c116b15d
Revises: ffdc0a98111c
Create Date: 2024-12-02 20:16:54.631107

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '4401c116b15d'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('teachers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('primary_grade', sa.Integer(), nullable=False),
    sa.Column('primary_subject', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE teachers SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('teachers')
