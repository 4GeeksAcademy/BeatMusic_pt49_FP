import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        actions.getFavoriteArtists(params.user_id)
    },[])

    return (
        <div className="text-center mt-5">
            {store.auth == false ? <Navigate to="/" /> :
                <>
                    <h1>Private</h1>
                    <p>Welcome to your private area.</p>
                    <div className="row">
                        <div className="col-3 border border-primary rounded">
                            <h2>Friends</h2>
                        </div>
                        <div className="col-3 border border-primary rounded">
                            <h2>Favorite Artists</h2>
                            <ul className="list-group">
                                {store.favoriteArtists.map((item) => {
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