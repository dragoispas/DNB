from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(
        db.String(3), nullable=False
    )  # Assuming a 3-character currency code like "USD"
    is_incoming = db.Column(db.Boolean, nullable=False)
    date_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, amount, currency, is_incoming, date_time=None):
        self.amount = amount
        self.currency = currency
        self.is_incoming = is_incoming
        self.date_time = date_time if date_time is not None else datetime.utcnow()

    def __repr__(self):
        return f"<Transaction {self.id}: {self.amount} {self.currency} {'incoming' if self.is_incoming else 'outgoing'} on {self.date_time}>"


@app.route("/")
def hello_world():
    return jsonify(hello="world")


@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()
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


@app.route("/transactions", methods=["POST"])
def add_transaction():
    data = request.get_json()
    amount = data.get("amount")
    currency = data.get("currency")
    is_incoming = data.get("is_incoming")
    date_time = data.get("date_time", datetime.utcnow())

    if not all([amount, currency, is_incoming]):
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
