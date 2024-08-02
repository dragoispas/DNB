from flask import Blueprint, jsonify, request
from datetime import datetime, timezone

from flask_jwt_extended import get_jwt_identity, jwt_required
from project.models import User, db, Transaction

transaction_bp = Blueprint("transactions", __name__)


@transaction_bp.route("/transactions", methods=["GET"])
@jwt_required()
def get_transactions():

    # Get the JWT identity
    current_user_identity = get_jwt_identity()

    # Ensure that the identity is a dictionary and extract the email
    if isinstance(current_user_identity, dict):
        user_email = current_user_identity.get("email")
    else:
        user_email = current_user_identity

    # Retrieve the user object using the identity
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    currency = request.args.get("currency")
    sender_id = request.args.get("sender_id")
    receiver_id = request.args.get("receiver_id")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    min_amount = request.args.get("min_amount")
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    # Use the filter_transactions method to get the filtered query
    transactions_query = Transaction.filter_transactions(
        currency=currency,
        sender_id=sender_id,
        receiver_id=receiver_id,
        user_id=user.id,
        start_date=start_date,
        end_date=end_date,
        min_amount=min_amount,
    )

    # Apply pagination
    pagination = transactions_query.paginate(page=page, per_page=per_page)
    transactions = pagination.items

    # Format the result
    result = [
        {
            "id": transaction.id,
            "amount": transaction.amount,
            "currency": transaction.currency,
            "date_time": transaction.date_time,
            "sender_id": transaction.sender_id,
            "receiver_id": transaction.receiver_id,
        }
        for transaction in transactions
    ]

    # Include pagination info in the response
    return jsonify(
        {
            "total_pages": pagination.pages,
            "total_items": pagination.total,
            "current_page": page,
            "per_page": per_page,
            "transactions": result,
        }
    )


@transaction_bp.route("/transactions", methods=["POST"])
@jwt_required()
def add_transaction():

    current_user_identity = get_jwt_identity()

    if isinstance(current_user_identity, dict):
        user_email = current_user_identity.get("email")
    else:
        user_email = current_user_identity

    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    amount = data.get("amount")
    currency = data.get("currency")
    sender_id = user.id
    receiver_id = data.get("receiver_id")
    date_time = data.get("date_time")

    if amount is None or currency is None or sender_id is None or receiver_id is None:
        return jsonify({"error": "Missing required fields"}), 400

    transaction = Transaction(
        amount=amount,
        currency=currency,
        sender_id=sender_id,
        receiver_id=receiver_id,
        date_time=(
            datetime.fromisoformat(date_time).replace(tzinfo=timezone.utc)
            if isinstance(date_time, str)
            else datetime.now(timezone.utc)
        ),
    )
    db.session.add(transaction)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Transaction added",
                "transaction": {
                    "id": transaction.id,
                    "amount": transaction.amount,
                    "currency": transaction.currency,
                    "date_time": transaction.date_time,
                    "sender_id": transaction.sender_id,
                    "receiver_id": transaction.receiver_id,
                },
            }
        ),
        201,
    )
