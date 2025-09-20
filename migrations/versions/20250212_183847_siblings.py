"""siblings

Revision ID: 5c2b49fb87d9
Revises: bae27b244f89
Create Date: 2025-02-12 18:38:47.431265

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '5c2b49fb87d9'
down_revision = 'b4b73c7eb34c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('siblings',
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('sibling_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.ForeignKeyConstraint(['sibling_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('student_id', 'sibling_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE siblings SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('siblings')
