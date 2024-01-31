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
            <h1 className="display-2 my-5 link-green">Artists</h1>
            {store.auth == false ? <Navigate to="/" /> :
                <div>
                    <input className="form-control mb-2" type="text" placeholder="Search by artist name" value={searchArtist} onChange={(e) => setSearchArtist(e.target.value)} />
                    <ul className="list-group">
                        {filteredArtists.map((item) => {
                            return (
                                <li key={item.id} className="list-group-item border-0 my-2">
                                    <div className="row">
                                        <div className="col-sm-4 col-lg-2 d-flex align-self-center">
                                            <img src={item.img_url} className="img-thumbnail rounded-circle" />
                                        </div>
                                        <div className="col-sm-6 col-lg-8 d-flex align-self-center">
                                            <h1 className="display-5 fw-bold">{item.name}</h1>
                                        </div>
                                        <div className="col-sm-2 co-lg-2 d-flex align-self-center justify-content-evenly">
                                            {favorites.includes(item.name) ?
                                                <button onClick={() => { actions.deleteFavoriteArtist(item.id) }} className="btn btn-danger btn-green">Delete Favorite</button> :
                                                <button onClick={() => { actions.addFavoriteArtist(item.id) }} className="btn btn-success btn-pink">Add to Favorites</button>
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
