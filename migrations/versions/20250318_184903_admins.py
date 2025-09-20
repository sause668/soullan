"""admins

Revision ID: 85af3b758d2a
Revises: 5c2b49fb87d9
Create Date: 2025-03-18 18:49:03.647197

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '85af3b758d2a'
down_revision = '5c2b49fb87d9'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('admins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('admins')
