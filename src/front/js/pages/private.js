import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    const userArtists = store.favoriteUserArtists.map(item => item.artist)
    const friendArtists = store.favoriteArtists.map(item => item.artist)
    const userAlbums = store.favoriteUserAlbums.map(item => item.album)
    const friendAlbums = store.favoriteAlbums.map(item => item.album)
    const userSongs = store.favoriteUserSongs.map(item => item.song)
    const friendSongs = store.favoriteSongs.map(item => item.song)
    const friends = store.userFriends.map(item => item.following_user_id)
    const artistMatch = actions.matchPercentage(userArtists, friendArtists)
    const albumMatch = actions.matchPercentage(userAlbums, friendAlbums)
    const songMatch = actions.matchPercentage(userSongs, friendSongs)

    useEffect(() => {
        if (store.favoriteArtists) {
            actions.getFavoriteArtists(params.user_id);
        }
      }, [store.favoriteArtists]);

    useEffect(() => {
        if (store.favoriteUserArtists) {
            actions.getFavoriteUserArtists();
        }
    }, [store.favoriteUserArtists]);
    
    useEffect(() => {
        if (store.favoriteAlbums) {
            actions.getFavoriteAlbums(params.user_id);
        }
    }, [store.favoriteAlbums]);

    useEffect(() => {
        if (store.favoriteUserAlbums) {
            actions.getFavoriteUserAlbums();
        }
    }, [store.favoriteUserAlbums]);

    useEffect(() => {
        if (store.favoriteSongs) {
            actions.getFavoriteSongs(params.user_id);
        }
    }, [store.favoriteSongs]);

    useEffect(() => {
        if (store.favoriteUserSongs) {
            actions.getFavoriteUserSongs();
        }
    }, [store.favoriteUserSongs]);

    useEffect(() => {
        if (store.friends) {
            actions.getFriends(params.user_id);
        }
    }, [store.friends]);

    useEffect(() => {
        if (store.userFriends) {
            actions.getUserFriends();
        }
    }, [store.userFriends]);

    useEffect(() => {
        if (params.user_id) {
            actions.getUser(params.user_id);
        }
    }, [params.user_id]);

    return (
        <div className="container mt-5">
            {store.auth == false ? <Navigate to="/" /> :
                <>
                    <div className="row my-5">
                        <div className="col-sm-6 col-lg-10">
                            <h1 className="display-2 link-pink">{store.userId === parseInt(params.user_id) ? "Your Wall" : store.profileName }</h1>
                        </div>
                        <div className="col-sm-6 col-lg-2 link-pink">
                            {store.userId === parseInt(params.user_id) ? null :
                                <h1 className="display-2 link-pink">{actions.totalMatch(artistMatch, albumMatch, songMatch)}%</h1>
                            }
                        </div>
                        <div className="col-sm-6 col-lg-2 link-pink">
                            {store.userId === parseInt(params.user_id)
                                ? null
                                : friends.includes(parseInt(params.user_id))
                                ? <button onClick={()=>{actions.deleteFriend(parseInt(params.user_id))}} className="btn btn-danger btn-green my-3">Unfollow</button>
                                : <button onClick={()=>{actions.addFriend(parseInt(params.user_id))}} className="btn btn-success btn-pink my-3">Follow</button>
                            }
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12 col-lg-2 rounded bg-white">
                            <h2 className="link-pink pt-2">Friends</h2>
                            {store.friends.length == 0 ? <li><p>No Friends yet.</p></li> : store.friends.map((item) => {
                                return (
                                    <li key={item.following_user_id} className="list-group-item border-0">
                                        <div className="row">
                                            <div className="col-12 p-0">
                                                <Link to={"/private/" + item.following_user_id}>
                                                    <span className="fs-5 fw-bold text-black">{item.name}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                        <div className="col-lg-1 bg-black rounded"></div>
                        <div className="col-sm-12 col-lg-9 bg-black rounded">
                            <div className="row">
                                <div className="col-sm-10 d-flex align-self-center">
                                    <h2 className="link-green pt-2">Favorite Artists</h2>
                                </div>
                                <div className="col-sm-2 d-flex align-self-center">
                                    {store.userId === parseInt(params.user_id) ? null :
                                        <p className="link-green m-0">Match: {artistMatch}%</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                    {store.favoriteArtists.length == 0 ? <p className="text-white mx-2">No Favorites yet.</p> : store.favoriteArtists.map((item) => {
                                        return (
                                            <div key={item.artist_id} className="col-auto">
                                                <div className="bg-white p-2 item-fav me-3 my-3">
                                                    <div className="row">
                                                        <div className="col-auto d-flex align-self-center">
                                                            <p className="fs-5 fw-bold m-0">{item.artist}</p>
                                                        </div>
                                                        {store.userId === parseInt(params.user_id) ?
                                                            <div className="col-auto d-flex align-self-center">
                                                                <button onClick={()=> {actions.deleteFavoriteArtist(item.artist_id)}} className="btn btn-danger btn-green">Delete</button>
                                                            </div>
                                                        : null }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="row">
                                <div className="col-sm-10 d-flex align-self-center">
                                    <h2 className="link-green pt-2">Favorite Albums</h2>
                                </div>
                                <div className="col-sm-2 d-flex align-self-center">
                                    {store.userId === parseInt(params.user_id) ? null :
                                        <p className="link-green m-0">Match: {albumMatch}%</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                {store.favoriteAlbums.length == 0 ? <p className="text-white mx-2">No Favorites yet.</p> : store.favoriteAlbums.map((item) => {
                                    return (
                                        <div key={item.album_id} className="col-auto">
                                            <div className="bg-white p-2 item-fav me-3 my-3">
                                                <div className="row">
                                                    <div className="col-auto d-flex align-self-center">
                                                        <p className="fs-5 fw-bold m-0">{item.album}</p>
                                                    </div>
                                                    {store.userId === parseInt(params.user_id) ?
                                                        <div className="col-auto d-flex align-self-center">
                                                            <button onClick={()=> {actions.deleteFavoriteAlbum(item.album_id)}} className="btn btn-danger btn-green">Delete</button>
                                                        </div>
                                                    : null }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="row">
                                <div className="col-sm-10 d-flex align-self-center">
                                    <h2 className="link-green pt-2">Favorite Songs</h2>
                                </div>
                                <div className="col-sm-2 d-flex align-self-center">
                                    {store.userId === parseInt(params.user_id) ? null :
                                        <p className="link-green m-0">Match: {songMatch}%</p>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                {store.favoriteSongs.length == 0 ? <p className="text-white mx-2">No Favorites yet.</p> : store.favoriteSongs.map((item) => {
                                    return (
                                        <div key={item.song_id} className="col-auto">
                                            <div className="bg-white p-2 item-fav me-3 my-3">
                                                <div className="row">
                                                    <div className="col-auto d-flex align-self-center">
                                                        <p className="fs-5 fw-bold m-0">{item.song}</p>
                                                    </div>
                                                    {store.userId === parseInt(params.user_id) ?
                                                        <div className="col-auto d-flex align-self-center">
                                                            <button onClick={()=> {actions.deleteFavoriteSong(item.song_id)}} className="btn btn-danger btn-green">Delete</button>
                                                        </div>
                                                    : null }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

Private.propTypes = {
	match: PropTypes.object
};