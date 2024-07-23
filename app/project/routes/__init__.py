from project.routes.transaction_routes import transaction_bp
from project.routes.user_routes import user_bp


def register_routes(app):
    app.register_blueprint(transaction_bp)
    app.register_blueprint(user_bp)
