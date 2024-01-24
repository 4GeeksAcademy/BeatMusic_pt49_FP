from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    favorite_artist = db.relationship('FavoriteArtist', lazy=True)
    favorite_album = db.relationship('FavoriteAlbum', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class AdminUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<AdminUser {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Album(db.Model):
    __tablename__ = 'album'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    img_url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<Album %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_url": self.img_url
        }

class Artist(db.Model):
    __tablename__ = 'artist'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    img_url = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<Artist %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "img_url": self.img_url
        }
    
class Song(db.Model):
    __tablename__ = 'song'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    length = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<Song %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "length": self.length
        }
    
class FavoriteArtist(db.Model):
    __tablename__ = 'favorite_artist'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='favorite_artist')
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    artist = db.relationship('Artist')

    def __repr__(self):
        return '<FavoriteArtist %r>' % self.artist_id

    def serialize(self):
        return {
            "artist_id": self.artist.id,
            "artist": self.artist.name
        }
    
class FavoriteAlbum(db.Model):
    __tablename__ = 'favorite_album'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='favorite_album')
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=False)
    album = db.relationship('Album')

    def __repr__(self):
        return '<FavoriteAlbum %r>' % self.album_id

    def serialize(self):
        return {
            "album_id": self.album.id,
            "album": self.album.name
        } 