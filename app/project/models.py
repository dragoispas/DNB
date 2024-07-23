from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import request


db = SQLAlchemy()


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


    @staticmethod
    def get():
        currency = request.args.get('currency')
        is_incoming = request.args.get('is_incoming')
        amount = request.args.get('amount')
        min_amount = 300

        transaction_query = Transaction.query

        if currency:
            transaction_query = transaction_query.filter_by(currency=currency)
        if is_incoming:
            transaction_query = transaction_query.filter_by(is_incoming=is_incoming)
        if amount:
            transaction_query = transaction_query.filter(Transaction.amount >= min_amount)

        transaction_query = transaction_query.all()
        return transaction_query