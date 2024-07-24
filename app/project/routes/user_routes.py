from flask import Blueprint, jsonify, request
from project.models import Transaction, db, User

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

    # Calculate user's balance
    transactions = Transaction.filter_transactions(user_id=user_id)
    balance = 0
    for transaction in transactions:
        if transaction.receiver_id == user_id:
            balance += transaction.amount
        elif transaction.sender_id == user_id:
            balance -= transaction.amount

    result = {
        "id": user.id,
        "name": user.name,
        "gender": user.gender,
        "email": user.email,
        "birth_date": user.birth_date,
        "balance": balance,  # Include the calculated balance
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
