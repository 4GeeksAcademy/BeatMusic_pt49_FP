"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import requests
from flask import Flask, make_response, request, jsonify, url_for, Blueprint, render_template
from api.models import db, User, Album, Artist, Song, FavoriteArtist, FavoriteAlbum, FavoriteSong, AdminUser, FollowingUsers
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os
import re
import base64
import openai
openai.api_key = "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"
SPOTIFY_CLIENT_ID = os.environ.get('3859789f63b8461c86e0f453ebbecfd1')
SPOTIFY_CLIENT_SECRET = os.environ.get('21d7f7f60938433eac36f6a0e5ff0de9')
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

    return jsonify(results.name), 200

@api.route('/users', methods=['POST'])
def create_user():
    request_body = request.get_json(force=True)
    user = User.query.filter_by(email=request_body["email"]).first()

    if user == None:
        new_user = User(email=request_body["email"], password=request_body["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body = new_user.serialize()
        return jsonify(response_body), 201
    else:
        return jsonify({"msg":"The user already exists."})
    
@api.route('/users/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user_to_update = User.query.filter_by(id=user_id).first()
    body = request.get_json()
    if 'password' in body:
        user_to_update.password = body['password']
    if 'name' in body:
        user_to_update.name = body['name']
    db.session.commit()
    response_body = {
        "msg": "The user has been updated."
    }
    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg":"Could not find email."}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, id=user.id, name=user.name)

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

@api.route('/users/<int:user_id>/favorites/artist', methods=['GET'])
def get_user_favorite_artist(user_id):
    user = User.query.filter_by(id=user_id).first()
    response_body = [item.serialize() for item in user.favorite_artist]
    

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/favorites/album', methods=['GET'])
def get_user_favorite_album(user_id):
    user = User.query.filter_by(id=user_id).first()
    response_body = [item.serialize() for item in user.favorite_album]
    

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/favorites/song', methods=['GET'])
def get_user_favorite_song(user_id):
    user = User.query.filter_by(id=user_id).first()
    response_body = [item.serialize() for item in user.favorite_song]
    

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/friends', methods=['GET'])
def get_user_friends(user_id):
    user = User.query.filter_by(id=user_id).first()
    response_body = [item.serialize() for item in user.following_users]
    

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/favorites/artist/<int:artist_id>', methods=['POST'])
def add_favorite_artist(user_id, artist_id):
    user = User.query.filter_by(id=user_id).first()
    artist = Artist.query.filter_by(id=artist_id).first()
    new_favorite = FavoriteArtist(user=user, artist=artist)
    db.session.add(new_favorite)
    db.session.commit()
    response_body = {
        'msg': 'Favorite artist has been added.'
    }

    return jsonify(response_body), 201

@api.route('/users/<int:user_id>/favorites/album/<int:album_id>', methods=['POST'])
def add_favorite_album(user_id, album_id):
    user = User.query.filter_by(id=user_id).first()
    album = Album.query.filter_by(id=album_id).first()
    new_favorite = FavoriteAlbum(user=user, album=album)
    db.session.add(new_favorite)
    db.session.commit()
    response_body = {
        'msg': 'Favorite album has been added.'
    }

    return jsonify(response_body), 201

@api.route('/users/<int:user_id>/favorites/song/<int:song_id>', methods=['POST'])
def add_favorite_song(user_id, song_id):
    user = User.query.filter_by(id=user_id).first()
    song = Song.query.filter_by(id=song_id).first()
    new_favorite = FavoriteSong(user=user, song=song)
    db.session.add(new_favorite)
    db.session.commit()
    response_body = {
        'msg': 'Favorite song has been added.'
    }

    return jsonify(response_body), 201

@api.route('/users/<int:user_id>/friends/<int:following_id>', methods=['POST'])
def add_favorite_friend(user_id, following_id):
    new_friend = FollowingUsers(user_id=user_id, following_id=following_id)
    db.session.add(new_friend)
    db.session.commit()
    response_body = {
        'msg': 'Friend has been added.'
    }
 
    return jsonify(response_body), 201

@api.route('/users/<int:user_id>/friends/<int:following_id>', methods=['DELETE'])
def remove_favorite_friend(user_id, following_id):
    friend_to_delete = FollowingUsers.query.filter_by(user_id=user_id, following_id=following_id).first()
    db.session.delete(friend_to_delete)
    db.session.commit()
    response_body = {
        'msg': 'Friend has been removed.'
    }

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/favorites/artist/<int:artist_id>', methods=['DELETE'])
def delete_favorite_artist(user_id, artist_id):
    delete_favorite = FavoriteArtist.query.filter_by(user_id=user_id, artist_id=artist_id).first()
    db.session.delete(delete_favorite)
    db.session.commit()
    response_body = {
        'msg': 'Favorite artist has been deleted.'
    }

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/favorites/album/<int:album_id>', methods=['DELETE'])
def delete_favorite_album(user_id, album_id):
    delete_favorite = FavoriteAlbum.query.filter_by(user_id=user_id, album_id=album_id).first()
    db.session.delete(delete_favorite)
    db.session.commit()
    response_body = {
        'msg': 'Favorite album has been deleted.'
    }

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>/favorites/song/<int:song_id>', methods=['DELETE'])
def delete_favorite_song(user_id, song_id):
    delete_favorite = FavoriteSong.query.filter_by(user_id=user_id, song_id=song_id).first()
    db.session.delete(delete_favorite)
    db.session.commit()
    response_body = {
        'msg': 'Favorite song has been deleted.'
    }

    return jsonify(response_body), 200



@api.route('/generate_recommendation', methods=['POST'])
def generate_recommendation():
    spotify_token = get_spotify_access_token()
    try:
        print("Entró a generate_recommendation")
        prompt = request.json['prompt']
        print(f"Prompt recibido: {prompt}")

        # Obtener recomendación de canción de ChatGPT
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        print("Respuesta de OpenAI GPT-3:", response)

        # Verificar si hay errores en la respuesta
        if 'choices' in response and response['choices']:
            # Extraer contenido del mensaje generado por GPT-3
            gpt3_message_content = response['choices'][0]['message']['content']
            
            # Obtener una lista de artistas desde el contenido
            artists_list = re.findall(r'\d+\.\s+([^\n]+)', gpt3_message_content)

            # Podrías usar la primera artista de la lista para obtener información de Spotify
            if artists_list:
                artist_name = artists_list[0]
                artist_info = get_spotify_artist_info(artist_name)
                return jsonify({'artist_info': artist_info})
            else:
                return jsonify({'error': 'No se pudo extraer información de los artistas'}), 500
        else:
            return jsonify({'error': 'Respuesta de OpenAI incompleta o sin opciones'}), 500
    except Exception as e:
        print(f"Error en generate_recommendation: {str(e)}")
        return jsonify({'error': str(e)}), 500

def get_spotify_artist_info(artist_name):
    # Aquí deberías implementar la lógica para obtener información del artista desde la API de Spotify
    # Utiliza el nombre del artista para buscar su ID u otra información relevante
    # Devuelve un diccionario con la información del artista (o maneja el error si no se encuentra)
    # Puedes usar la misma lógica que usaste para obtener información de la pista
    
    # Ejemplo ficticio
    artist_info = {
        'name': artist_name,
        'albums': ['Album 1', 'Album 2'],
        'popularity': 80,
        # Agrega más información según tus necesidades
    }

    return artist_info

def get_spotify_access_token():
   

    try:
        token_url = 'https://accounts.spotify.com/api/token'
        token_data = {'grant_type': 'client_credentials'}
        token_headers = {
            'Authorization': 'Basic ' + base64.b64encode(f'{"3859789f63b8461c86e0f453ebbecfd1"}:{"21d7f7f60938433eac36f6a0e5ff0de9"}'.encode()).decode()
        }

        token_response = requests.post(token_url, headers=token_headers, data=token_data)
        token_response.raise_for_status()
        
        return token_response.json().get('access_token')
    except requests.exceptions.HTTPError as e:
        print(f'Error al obtener el token de acceso de Spotify. Detalles del error: {e.response.text}')
        return None

if __name__ == '__main__':
    app.run(debug=True)

def get_spotify_track_title(track_id):
    # Credenciales de Spotify
    client_id = '3859789f63b8461c86e0f453ebbecfd1'
    client_secret = '21d7f7f60938433eac36f6a0e5ff0de9'

    # Obtener token de acceso de Spotify
    token_url = 'https://accounts.spotify.com/api/token'
    token_data = {'grant_type': 'client_credentials'}
    token_headers = {'Authorization': f'Basic {base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}'}
    
    try:
        token_response = requests.post(token_url, headers=token_headers, data=token_data)
        token_response.raise_for_status()
        token = token_response.json().get('access_token')
        print(f'Token de acceso de Spotify: {token}')  # Imprimir el token para verificar
        # Consultar la información de la pista utilizando el token de acceso
        track_url = f'https://api.spotify.com/v1/tracks/{track_id}'
        headers = {'Authorization': f'Bearer {token}'}
        
        try:
            track_response = requests.get(track_url, headers=headers)
            track_response.raise_for_status()

            track_data = track_response.json()
            track_title = track_data.get('name', 'Título no encontrado')
            return track_title
        except requests.exceptions.HTTPError as track_error:
            print(f'Error al obtener información de la pista: {track_error}')
            return 'Error al obtener información de la pista'
    except requests.exceptions.HTTPError as token_error:
        print(f'Error al obtener el token de acceso de Spotify: {token_error}')
        return 'Error al obtener el token de acceso de Spotify'
