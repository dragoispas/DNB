from project.routes import register_routes
from project.config import Config
from flask import Flask, jsonify
from flask_cors import CORS
from project.models import User, db
from flask_login import LoginManager
from flask_jwt_extended import JWTManager  # Import JWTManager


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.secret_key = "your_secret_key"  # Set a secret key for session management

    # Initialize Flask-Login
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "login"  # Redirect to login page if not authenticated

    # Initialize JWT
    jwt = JWTManager(app)

    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=["http://localhost:3000"])

    # Register blueprints
    register_routes(app)

    # Set up the user loader callback for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # JWT identity loader
    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.email

    # JWT user lookup loader
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.filter_by(email=identity).one_or_none()

    @app.route("/")
    def hello_world():
        return jsonify(hello="world")

    return app
