from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import case, func
from project.models import Transaction, db, User
from flask_jwt_extended import jwt_required, get_jwt_identity

user_bp = Blueprint("users", __name__)


@user_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    result = [
        {
            "id": user.id,
            "name": user.name,
        }
        for user in users
    ]
    return jsonify(result)


@user_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    result = {
        "id": user.id,
        "name": user.name,
    }
    return jsonify(result)


@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    # Get the JWT identity
    current_user_identity = get_jwt_identity()

    # Debugging line to check the identity
    print(f"Current user identity from token: {current_user_identity}")

    # Ensure that the identity is a dictionary and extract the email
    if isinstance(current_user_identity, dict):
        user_email = current_user_identity.get("email")
    else:
        user_email = current_user_identity

    # Retrieve the user object using the identity
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Calculate user's balance using database query
    balance = (
        db.session.query(
            func.sum(
                case(
                    (Transaction.receiver_id == user.id, Transaction.amount),
                    (Transaction.sender_id == user.id, -Transaction.amount),
                )
            )
        )
        .filter(
            (Transaction.sender_id == user.id) | (Transaction.receiver_id == user.id)
        )
        .scalar()
    )

    balance = balance or 0  # Handle None case when no transactions are found

    result = {
        "id": user.id,
        "name": user.name,
        "gender": user.gender,
        "email": user.email,
        "birth_date": user.birth_date,
        "balance": balance,
    }
    return jsonify(result)


@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data.get("name")
    gender = data.get("gender")
    email = data.get("email")
    birth_date = data.get("birth_date")

    if not all([name, gender, email, birth_date]):
        return jsonify({"error": "Missing required fields"}), 400

    new_user = User(name=name, gender=gender, email=email, birth_date=birth_date)
    db.session.add(new_user)
    db.session.commit()

    return (
        jsonify(
            {
                "id": new_user.id,
                "name": new_user.name,
                "gender": new_user.gender,
                "email": new_user.email,
                "birth_date": new_user.birth_date,
            }
        ),
        201,
    )


@user_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    gender = data.get("gender")
    email = data.get("email")
    birth_date = data.get("birth_date")
    password = data.get("password")

    if not all([name, gender, email, birth_date, password]):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    new_user = User(
        name=name, gender=gender, email=email, birth_date=birth_date, password=password
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201
