from project.routes.transaction_routes import transaction_bp


def register_routes(app):
    app.register_blueprint(transaction_bp)
