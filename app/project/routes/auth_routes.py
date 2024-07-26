from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from project.models import User

auth_bp = Blueprint("auth", __name__)

# Initialize JWT Manager
jwt = JWTManager()


@auth_bp.record_once
def configure_jwt(state):
    jwt.init_app(state.app)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity={"email": user.email})
    return jsonify({"message": "Logged in successfully", "token": token}), 200


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"message": "Logged out successfully"}), 200
