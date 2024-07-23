from project.routes import register_routes
from project.config import Config
from flask import Flask, jsonify
from flask_cors import CORS
from project.models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=["http://localhost:3000"])

    # Register blueprints
    register_routes(app)

    @app.route("/")
    def hello_world():
        return jsonify(hello="world")

    return app
