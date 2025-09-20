"""assignments

Revision ID: 9d9a10fbdf4f
Revises: bae28b244f87
Create Date: 2024-12-02 20:20:00.836753

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '9d9a10fbdf4f'
down_revision = 'bae28b244f87'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('assignments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('type', sa.String(length=2), nullable=False),
    sa.Column('quarter', sa.Integer(), nullable=False),
    sa.Column('due_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE assignments SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('assignments')
