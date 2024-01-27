import React, { useContext, useState, useEffect, } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Albums = () => {
	const { store, actions } = useContext(Context);
	const favorites = store.favoriteAlbums.map(item => item.album)

	useEffect(() => {
        if (store.favoriteAlbums) {
            actions.getFavoriteAlbums(store.userId);
        }
      }, [store.favoriteAlbums]);

	return (
		<div className="container">
			<h1 className="text-center my-3">Albums</h1>
			{store.auth == false ? <Navigate to="/" /> :
				<ul className="list-group">
					{store.album.map((item) => {
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
											<button onClick={()=> {actions.addFavoriteAlbum(item.id)}} className="btn btn-success">Add to Favorites</button>
										}
										{favorites.includes(item.name) ?
											<button onClick={()=> {actions.deleteFavoriteAlbum(item.id)}} className="btn btn-danger">Delete from Favorites</button>
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

export default Albums;