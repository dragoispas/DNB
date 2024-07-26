from flask import Blueprint, jsonify, request
from datetime import datetime, timezone
from project.models import db, Transaction

transaction_bp = Blueprint("transactions", __name__)


@transaction_bp.route("/transactions", methods=["GET"])
def get_transactions():

    currency = request.args.get("currency")
    sender_id = request.args.get("sender_id")
    receiver_id = request.args.get("receiver_id")
    user_id = request.args.get("user_id")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    min_amount = request.args.get("min_amount")

    transactions = Transaction.filter_transactions(
        currency=currency,
        sender_id=sender_id,
        receiver_id=receiver_id,
        user_id=user_id,
        start_date=start_date,
        end_date=end_date,
        min_amount=min_amount,
    )

    # transactions = Transaction.query.all()
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
