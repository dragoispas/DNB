from flask import Blueprint, jsonify, request
from datetime import datetime
from project.models import db, Transaction


transaction_bp = Blueprint("transactions", __name__)


@transaction_bp.route("/transactions", methods=["GET"])
def get_transactions():

    transactions = Transaction.get()

    result = [
        {
            "id": transaction.id,
            "amount": transaction.amount,
            "currency": transaction.currency,
            "is_incoming": transaction.is_incoming,
            "date_time": transaction.date_time,
        }
        for transaction in transactions
    ]
    return jsonify(result)


@transaction_bp.route("/transactions", methods=["POST"])
def add_transaction():
    data = request.get_json()
    amount = data.get("amount")
    currency = data.get("currency")
    is_incoming = data.get("is_incoming")
    date_time = data.get("date_time", datetime.utcnow())

    if amount is None or currency is None or is_incoming is None:
        return jsonify({"error": "Missing required fields"}), 400

    transaction = Transaction(
        amount=amount,
        currency=currency,
        is_incoming=is_incoming,
        date_time=(
            datetime.fromisoformat(date_time)
            if isinstance(date_time, str)
            else date_time
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
                    "is_incoming": transaction.is_incoming,
                    "date_time": transaction.date_time,
                },
            }
        ),
        201,
    )
