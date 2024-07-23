from flask import Blueprint, jsonify, request
from datetime import datetime, timezone
from project.models import db, Transaction

transaction_bp = Blueprint("transactions", __name__)


@transaction_bp.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
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
    return jsonify(result)


@transaction_bp.route("/transactions", methods=["POST"])
def add_transaction():
    data = request.get_json()
    amount = data.get("amount")
    currency = data.get("currency")
    sender_id = data.get("sender_id")
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
