from flask.cli import FlaskGroup

from project import create_app, db
from project.models import Transaction, User
from datetime import datetime, timezone


app = create_app()
cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    # Create a sample transaction
    transactions = [
        Transaction(
            amount=100.0,
            currency="EUR",
            date_time=datetime(2021, 1, 1, 10, 0, 0, tzinfo=timezone.utc),
            sender_id=1,
            receiver_id=2,
        ),
        Transaction(
            amount=200.0,
            currency="EUR",
            date_time=datetime(2021, 2, 1, 11, 30, 0, tzinfo=timezone.utc),
            sender_id=2,
            receiver_id=1,
        ),
        Transaction(
            amount=300.0,
            currency="EUR",
            date_time=datetime(2021, 3, 1, 9, 15, 0, tzinfo=timezone.utc),
            sender_id=3,
            receiver_id=1,
        ),
        Transaction(
            amount=400.0,
            currency="EUR",
            date_time=datetime(2021, 4, 1, 14, 45, 0, tzinfo=timezone.utc),
            sender_id=3,
            receiver_id=2,
        ),
    ]

    for transaction in transactions:
        db.session.add(transaction)
    db.session.commit()


@cli.command("seed_users")
def seed_users():
    users = [
        {
            "name": "Alice",
            "gender": "Female",
            "email": "alice@example.com",
            "birth_date": "1985-01-01",
            "password": "pass",
        },
        {
            "name": "Bob",
            "gender": "Male",
            "email": "bob@example.com",
            "birth_date": "1990-02-02",
            "password": "pass",
        },
        {
            "name": "Charlie",
            "gender": "Non-binary",
            "email": "charlie@example.com",
            "birth_date": "1995-03-03",
            "password": "pass",
        },
    ]

    for user_data in users:
        user = User(
            name=user_data["name"],
            gender=user_data["gender"],
            email=user_data["email"],
            birth_date=user_data["birth_date"],
            password=user_data["password"],
        )
        db.session.add(user)
    db.session.commit()


if __name__ == "__main__":
    cli()
