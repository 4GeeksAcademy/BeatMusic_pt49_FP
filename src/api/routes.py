"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Artist
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/artist', methods=['GET'])
def get_artist():
    results = list(map(lambda item: item.serialize(), Artist.query.all()))

    return jsonify(results), 200

@api.route('/artist', methods=['POST'])
def create_artist():
    body = request.get_json()
    new_artist = Artist(name=body['name'], img_url=body['img_url'])
    db.session.add(new_artist)
    db.session.commit()
    response_body = {
        'msg': 'New artist has been created.'
    }

    return jsonify(response_body), 200