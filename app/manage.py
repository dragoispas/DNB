import random
from flask.cli import FlaskGroup

from project import create_app, db
from project.models import Transaction, User
from datetime import datetime, timedelta, timezone


app = create_app()
cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_transactions")
def seed_transactions():
    # Get the list of user IDs from the User model
    users = User.query.all()
    user_ids = [user.id for user in users]

    # Generate transactions
    transactions = []
    start_date = datetime(2021, 1, 1, tzinfo=timezone.utc)
    for i in range(10000):  # Number of transactions to seed
        amount = random.uniform(10.0, 1000.0)
        currency = "EUR"
        date_time = start_date + timedelta(days=random.randint(0, 365))
        sender_id = random.choice(user_ids)
        receiver_id = random.choice([uid for uid in user_ids if uid != sender_id])

        transaction = Transaction(
            amount=amount,
            currency=currency,
            date_time=date_time,
            sender_id=sender_id,
            receiver_id=receiver_id,
        )
        transactions.append(transaction)

    # Bulk insert all transactions
    db.session.bulk_save_objects(transactions)
    db.session.commit()
    print(f"Seeded {len(transactions)} transactions.")


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
