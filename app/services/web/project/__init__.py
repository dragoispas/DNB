from flask import Flask, jsonify
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
