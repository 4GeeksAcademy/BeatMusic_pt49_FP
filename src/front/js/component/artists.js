import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Artists = () => {
    const { store, actions } = useContext(Context);
    const favorites = store.favoriteArtists.map(item => item.artist)
    const [searchArtist, setSearchArtist] = useState("")
	const filteredArtists = store.artist.filter(item => item.name.toLowerCase().includes(searchArtist.toLowerCase()))

    useEffect(() => {
        if (store.favoriteArtists) {
            actions.getFavoriteArtists(store.userId);
        }
    }, [store.favoriteArtists]);

    return (
        <div className="container">
            <h1 className="text-center my-3">Artists</h1>
            {store.auth == false ? <Navigate to="/" /> :
                <div>
                    <input className="form-control mb-3" type="text" placeholder="Search by artist name" value={searchArtist} onChange={(e) => setSearchArtist(e.target.value)} />
                    <ul className="list-group">
                        {filteredArtists.map((item) => {
                            return (
                                <li key={item.id} className="list-group-item">
                                    <div className="row">
                                        <div className="col-2 d-flex align-items-center justify-content-center">
                                            <img src={item.img_url} className="img-thumbnail rounded-circle" />
                                        </div>
                                        <div className="col-6">
                                            <p className="fs-5 fw-bold">{item.name}</p>
                                        </div>
                                        <div className="col-4 d-flex align-items-center justify-content-evenly">
                                            {favorites.includes(item.name) ?
                                                <button onClick={() => { actions.deleteFavoriteArtist(item.id) }} className="btn btn-danger">Delete from Favorites</button> :
                                                <button onClick={() => { actions.addFavoriteArtist(item.id) }} className="btn btn-success">Add to Favorites</button>
											}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            }
            <br></br>
        </div>
    );
};

export default Artists;
