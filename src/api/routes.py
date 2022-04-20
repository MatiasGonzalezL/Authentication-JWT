"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
#from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
#from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#register user
@api.route("/signup", methods=["POST"])
def signup():
    response = {'mensaje': '', 'status': ''}
    try:
        #username = request.json.get("username", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        is_active = request.json.get("is_active", None)

        if email != None and password != None:

            existing_user = User.query.filter_by(email=email).first()

            if existing_user:
                response['mensaje'] = 'Este correo ya está en uso'
                response['status'] = 500
            else:
                user=User(email=email, password=password, is_active=True)
                db.session.add(user)
                db.session.commit()
                access_token = create_access_token(identity=user.id)

                return jsonify({ "token" : access_token, "email": user.email}), 200
                
    except Exception as e:
        print(f'registerfailed: {e}')
    return jsonify(response['mensaje']), response['status']


#login user
@api.route("/login", methods=["POST"])
def login():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user= User.query.filter_by(email=email, password=password).first()
    if user == 0:
        return jsonify({"msg": "Bad username or password"}), 401 
    else:
        access_token = create_access_token(identity=email)
        return jsonify({"token": access_token, "email": user.email}), 200


