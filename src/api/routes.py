"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Album
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

@api.route('/album', methods=['GET'])
def get_album():
    results = list(map(lambda item: item.serialize(), Album.query.all()))

    return jsonify(results), 200

@api.route('/album/<int:album_id>', methods=['GET'])
def get_single_album(album_id):
    album = Album.query.filter_by(id=album_id).first()
    
    return jsonify(album.serialize()), 200

@api.route('/album', methods=['POST'])
def create_album():
    body = request.get_json()
    new_album = Album(name=body['name'], img_url=body['img_url'])
    db.session.add(new_album)
    db.session.commit()
    response_body = {
        'msg': 'New album has been created.',
        "new_album": new_album.name
    }

    return jsonify(response_body), 200

@api.route('/album/<int:album_id>', methods=['DELETE'])
def delete_album(album_id):
    deleted_album = Album.query.filter_by(id=album_id).first()
    db.session.delete(deleted_album)
    db.session.commit()
    response_body = {
        'msg': 'Album has been deleted.'
    }

    return jsonify(response_body), 200

@api.route('/album/<int:album_id>', methods=['PUT'])
def edit_album(album_id):
    album_to_update = Album.query.filter_by(id=album_id).first()
    body = request.get_json()
    album_to_update.name = body['name']
    album_to_update.img_url = body['img_url']
    db.session.commit()
    response_body = {
        "msg": "The album has been updated.",
        "name": album_to_update.name,
        "img_url": album_to_update.img_url,
    }
    return jsonify(response_body), 200