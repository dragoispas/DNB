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
    transaction = Transaction(
        amount=100.0,
        currency="USD",
        date_time=datetime.now(timezone.utc),
        sender_id=1,
        receiver_id=2,
    )
    db.session.add(transaction)
    db.session.commit()


@cli.command("seed_users")
def seed_users():
    users = [
        User(
            name="Alice",
            gender="Female",
            email="alice@example.com",
            birth_date=datetime(1990, 1, 1),
        ),
        User(
            name="Bob",
            gender="Male",
            email="bob@example.com",
            birth_date=datetime(1985, 5, 15),
        ),
        User(
            name="Charlie",
            gender="Male",
            email="charlie@example.com",
            birth_date=datetime(1992, 8, 20),
        ),
        User(
            name="Diana",
            gender="Female",
            email="diana@example.com",
            birth_date=datetime(1988, 3, 10),
        ),
        User(
            name="Eve",
            gender="Female",
            email="eve@example.com",
            birth_date=datetime(1995, 12, 5),
        ),
    ]

    for user in users:
        db.session.add(user)
    db.session.commit()


if __name__ == "__main__":
    cli()
