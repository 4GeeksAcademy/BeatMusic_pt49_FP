"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Album, Artist, Song, AdminUser
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)
app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "12345678"  # Change this!
jwt = JWTManager(app)
# Allow CORS requests to this API
CORS(api)
# Setup the Flask-JWT-Extended extension


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

@api.route('/artist', methods=['GET'])
def get_artist():
    results = list(map(lambda item: item.serialize(), Artist.query.all()))

    return jsonify(results), 200

@api.route('/song', methods=['GET'])
def get_song():
    results = list(map(lambda item: item.serialize(), Song.query.all()))

    return jsonify(results), 200

@api.route('/album/<int:album_id>', methods=['GET'])
def get_single_album(album_id):
    album = Album.query.filter_by(id=album_id).first()
    
    return jsonify(album.serialize()), 200

@api.route('/artist/<int:artist_id>', methods=['GET'])
def get_single_artist(artist_id):
    artist = Artist.query.filter_by(id=artist_id).first()
    
    return jsonify(artist.serialize()), 200

@api.route('/song/<int:song_id>', methods=['GET'])
def get_single_song(song_id):
    song = Song.query.filter_by(id=song_id).first()
    
    return jsonify(song.serialize()), 200

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

@api.route('/artist', methods=['POST'])
def create_artist():
    body = request.get_json()
    new_artist = Artist(name=body['name'], img_url=body['img_url'])
    db.session.add(new_artist)
    db.session.commit()
    response_body = {
        'msg': 'New artist has been created.',
        "new_artist": new_artist.name
    }

    return jsonify(response_body), 200

@api.route('/song', methods=['POST'])
def create_song():
    body = request.get_json()
    new_song = Song(name=body['name'], length=body['length'])
    db.session.add(new_song)
    db.session.commit()
    response_body = {
        'msg': 'New song has been created.',
        "new_song": new_song.name
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

@api.route('/artist/<int:artist_id>', methods=['DELETE'])
def delete_artist(artist_id):
    deleted_artist = Artist.query.filter_by(id=artist_id).first()
    db.session.delete(deleted_artist)
    db.session.commit()
    response_body = {
        'msg': 'Artist has been deleted.'
    }

    return jsonify(response_body), 200

@api.route('/song/<int:song_id>', methods=['DELETE'])
def delete_song(song_id):
    deleted_song = Song.query.filter_by(id=song_id).first()
    db.session.delete(deleted_song)
    db.session.commit()
    response_body = {
        'msg': 'Song has been deleted.'
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

@api.route('/artist/<int:artist_id>', methods=['PUT'])
def edit_artist(artist_id):
    artist_to_update = Artist.query.filter_by(id=artist_id).first()
    body = request.get_json()
    artist_to_update.name = body['name']
    artist_to_update.img_url = body['img_url']
    db.session.commit()
    response_body = {
        "msg": "The artist has been updated.",
        "name": artist_to_update.name,
        "img_url": artist_to_update.img_url,
    }
    return jsonify(response_body), 200

@api.route('/song/<int:song_id>', methods=['PUT'])
def edit_song(song_id):
    song_to_update = Song.query.filter_by(id=song_id).first()
    body = request.get_json()
    song_to_update.name = body['name']
    song_to_update.length = body['length']
    db.session.commit()
    response_body = {
        "msg": "The artist has been updated.",
        "name": song_to_update.name,
        "length": song_to_update.length,
    }
    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_users():
    results = list(map(lambda user: user.serialize(), User.query.all()))

    return jsonify(results), 200

@api.route('/adminUsers', methods=['GET'])
def get_adminUsers():
    results = list(map(lambda adminuser: adminuser.serialize(), AdminUser.query.all()))

    return jsonify(results), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    results = User.query.filter_by(id=user_id).first()

    return jsonify(results.serialize()), 200

@api.route('/users', methods=['POST'])
def create_user():
    request_body = request.get_json(force=True)
    user = User.query.filter_by(email=request_body["email"]).first()

    if user == None:
        new_user = User(email=request_body["email"], password=request_body["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body = {
            'msg': 'Your user has been added.'
        }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg":"The user already exists."})

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg":"Could not find email."}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email )
    return jsonify(access_token=access_token)

@api.route("/adminlogin", methods=["POST"])
def admin_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    adminuser = AdminUser.query.filter_by(email=email).first()

    if adminuser == None:
        return jsonify({"msg":"Could not find email."}), 401
    if email != adminuser.email or password != adminuser.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email )
    return jsonify(access_token=access_token)


