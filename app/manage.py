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
    transaction1 = Transaction(amount=100.0, currency="USD", is_incoming=True, date_time=datetime.utcnow())
    transaction2 = Transaction(amount=200.0, currency="EUR", is_incoming=False, date_time=datetime.utcnow())
    transaction3 = Transaction(amount=300.0, currency="RON", is_incoming=False, date_time=datetime.utcnow())
    transaction4 = Transaction(amount=400.0, currency="RON", is_incoming=False, date_time=datetime.utcnow())
    transaction5 = Transaction(amount=500.0, currency="RON", is_incoming=True, date_time=datetime.utcnow())
    transaction6 = Transaction(amount=600.0, currency="EUR", is_incoming=True, date_time=datetime.utcnow())
    transaction7 = Transaction(amount=700.0, currency="USD", is_incoming=False, date_time=datetime.utcnow())

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(transaction4)
    db.session.add(transaction5)
    db.session.add(transaction6)
    db.session.add(transaction7)
    
    db.session.commit()


if __name__ == "__main__":
    cli()
