import React, { useContext, useState, useEffect, } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Artists = () => {
	const { store, actions } = useContext(Context);
	const favorites = store.favoriteArtists.map(item => item.artist)

	useEffect(() => {
        if (store.favoriteArtists) {
            actions.getFavoriteArtists(store.userId);
        }
      }, [store.favoriteArtists]);

	return (
		<div className="container">
			<h1 className="text-center my-3">Artists</h1>
			{store.auth == false ? <Navigate to="/" /> :
				<ul className="list-group">
					{store.artist.map((item) => {
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
										{favorites.includes(item.name) ? null :
											<button onClick={()=> {actions.addFavoriteArtist(item.id)}} className="btn btn-success">Add to Favorites</button>
										}
										{favorites.includes(item.name) ?
											<button onClick={()=> {actions.deleteFavoriteArtist(item.id)}} className="btn btn-danger">Delete from Favorites</button>
										: null }
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			}
			<br></br>
		</div>
	);
};

export default Artists;