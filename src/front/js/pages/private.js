import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
    //burnt IDs for burnt friends, friends API not working yet
    const user1Id = 2;
    const user2Id = 3;

    useEffect(() => {
        if (store.favoriteArtists) {
            actions.getFavoriteArtists(params.user_id);
        }
      }, [store.favoriteArtists]);
    
    useEffect(() => {
        if (store.favoriteAlbums) {
            actions.getFavoriteAlbums(params.user_id);
        }
    }, [store.favoriteAlbums]);

    return (
        <div className="text-center mt-5">
            {store.auth == false ? <Navigate to="/" /> :
                <>
                    <h1>Private</h1>
                    <p>Welcome to your private area.</p>
                    <div className="row">
                        <div className="col-3 border border-primary rounded">
                            <h2>Friends</h2>

                                <ul className="list-group">
                                    <li key={user1Id} className="list-group-item">
                                        <div className="row">
                                            <div className="col-10">
                                                <p className="fs-5 fw-bold">Miguel</p>
                                            </div>
                                            <div className="col-2 d-flex align-items-center justify-content-evenly">
                                                <button onClick={()=>{navigate("/private/" + user1Id)}} className="btn btn-primary mx-1">See Profile</button>
                                            </div>
                                        </div>
                                    </li>
                                    <li key={user2Id} className="list-group-item">
                                        <div className="row">
                                            <div className="col-10">
                                                <p className="fs-5 fw-bold">Diego</p>
                                            </div>
                                            <div className="col-2 d-flex align-items-center justify-content-evenly">
                                                <button onClick={()=>{navigate("/private/" + user2Id)}} className="btn btn-primary mx-1">See Profile</button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                        </div>
                        <div className="col-3 border border-primary rounded">
                            <h2>Favorite Artists</h2>
                            <ul className="list-group">
                                {store.favoriteArtists.length == 0 ? <li><p>No Favorites yet.</p></li> : store.favoriteArtists.map((item) => {
                                    return (
                                        <li key={item.artist_id} className="list-group-item">
                                            <div className="row">
                                                <div className="col-10">
                                                    <p className="fs-5 fw-bold">{item.artist}</p>
                                                </div>
                                                <div className="col-2 d-flex align-items-center justify-content-evenly">
                                                    <button onClick={()=> {actions.deleteFavoriteArtist(item.artist_id)}} className="btn btn-danger">Delete from Favorites</button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="col-3 border border-primary rounded">
                            <h2>Favorite Albums</h2>
                            <ul className="list-group">
                                {store.favoriteAlbums.length == 0 ? <li><p>No Favorites yet.</p></li> : store.favoriteAlbums.map((item) => {
                                    return (
                                        <li key={item.album_id} className="list-group-item">
                                            <div className="row">
                                                <div className="col-10">
                                                    <p className="fs-5 fw-bold">{item.album}</p>
                                                </div>
                                                <div className="col-2 d-flex align-items-center justify-content-evenly">
                                                    <button onClick={()=> {actions.deleteFavoriteAlbum(item.album_id)}} className="btn btn-danger">Delete from Favorites</button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="col-3 border border-primary rounded">
                            <h2>Favorite Songs</h2>
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