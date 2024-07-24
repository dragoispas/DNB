from flask import Blueprint, jsonify, request
from project.models import db, User

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
        "gender": user.gender,
        "email": user.email,
        "birth_date": user.birth_date,
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
