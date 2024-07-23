from flask.cli import FlaskGroup

from project import create_app, db
from project.models import Transaction
from datetime import datetime


app = create_app()
cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    transaction = Transaction(
        amount=100.0, currency="USD", is_incoming=True, date_time=datetime.utcnow()
    )
    db.session.add(transaction)
    db.session.commit()


if __name__ == "__main__":
    cli()
