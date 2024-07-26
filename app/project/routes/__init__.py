from project.routes.transaction_routes import transaction_bp
from project.routes.user_routes import user_bp
from project.routes.auth_routes import auth_bp


def register_routes(app):
    app.register_blueprint(transaction_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(auth_bp)
