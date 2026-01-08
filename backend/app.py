from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

app.config["SECRET_KEY"] = "super-secret-key"

USER = {
    "username": "admin",
    "email": "admin@test.com",
    "password": "1234"
}



@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if (
        data.get("email") != USER["email"]
        or data.get("password") != USER["password"]
    ):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "username": USER["username"],
            "email": USER["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user": {
            "username": USER["username"],
            "email": USER["email"]
        }
    })


@app.route("/protected")
def protected():
    return jsonify({"message": "Protected API works"})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
