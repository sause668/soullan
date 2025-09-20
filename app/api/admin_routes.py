from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import or_
from app.models import Admin

admin_routes = Blueprint('admins', __name__)


@admin_routes.route('')
@login_required
def admins():
    """
    Get all admin users
    """

    if current_user.type != 'admin':
        return jsonify({"message": "Admin Authorization Required"}), 401
    
    admins = Admin.query.all()

    return jsonify([admin.info() for admin in admins])

@admin_routes.route('/<int:admin_id>')
@login_required
def admin_info(admin_id):
    """
    Get admin info by ID
    """
    admin = Admin.query.filter_by(id=admin_id).first()

    if not admin:
            return jsonify({"message": "Admin not found"}), 404
    
    return jsonify(admin.search_info()), 200