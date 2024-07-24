from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

from sqlalchemy import or_

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    birth_date = db.Column(db.Date, nullable=False)

    def __init__(self, name, gender, email, birth_date):
        self.name = name
        self.gender = gender
        self.email = email
        self.birth_date = birth_date

    def __repr__(self):
        return f"<User {self.id}: {self.name}, {self.gender}, {self.email}, {self.birth_date}>"


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(
        db.String(3), nullable=False
    )  # Assuming a 3-character currency code like "USD"
    date_time = db.Column(
        db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False
    )
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    sender = db.relationship(
        "User", foreign_keys=[sender_id], backref="sent_transactions"
    )
    receiver = db.relationship(
        "User", foreign_keys=[receiver_id], backref="received_transactions"
    )

    def __init__(self, amount, currency, sender_id, receiver_id, date_time=None):
        self.amount = amount
        self.currency = currency
        self.sender_id = sender_id
        self.receiver_id = receiver_id
        self.date_time = (
            date_time if date_time is not None else datetime.now(timezone.utc)
        )

    def __repr__(self):
        return f"<Transaction {self.id}: {self.amount} {self.currency} from {self.sender_id} to {self.receiver_id} on {self.date_time}>"

    @staticmethod
    def filter_transactions(
        currency=None,
        sender_id=None,
        receiver_id=None,
        user_id=None,
        start_date=None,
        end_date=None,
        min_amount=None,
    ):
        query = Transaction.query
        if currency:
            query = query.filter_by(currency=currency)
        if sender_id:
            query = query.filter_by(sender_id=sender_id)
        if receiver_id:
            query = query.filter_by(receiver_id=receiver_id)
        if user_id:
            query = query.filter(
                or_(
                    Transaction.sender_id == user_id, Transaction.receiver_id == user_id
                )
            )
        if start_date:
            start_date = datetime.fromisoformat(start_date).replace(tzinfo=timezone.utc)
            query = query.filter(Transaction.date_time >= start_date)
        if end_date:
            end_date = datetime.fromisoformat(end_date).replace(tzinfo=timezone.utc)
            query = query.filter(Transaction.date_time <= end_date)
        if min_amount:
            query = query.filter(Transaction.amount >= float(min_amount))

        return query.all()
