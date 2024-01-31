import React, { useContext, useState, useEffect, } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Albums = () => {
	const { store, actions } = useContext(Context);
	const favorites = store.favoriteAlbums.map(item => item.album)
	const [searchAlbum, setSearchAlbum] = useState("")
	const filteredAlbums = store.album.filter(item => item.name.toLowerCase().includes(searchAlbum.toLowerCase()))

	useEffect(() => {
        if (store.favoriteAlbums) {
            actions.getFavoriteAlbums(store.userId);
        }
      }, [store.favoriteAlbums]);

	return (
		<div className="container">
			<h1 className="display-2 my-5 link-green">Albums</h1>
			{store.auth == false ? <Navigate to="/" /> :
				<div>
					<input className="form-control mb-2" type="text" placeholder="Search by album name" value={searchAlbum} onChange={(e) => setSearchAlbum(e.target.value)} />
					<ul className="list-group">
						{filteredAlbums.map((item) => {
							return (
								<li key={item.id} className="list-group-item border-0 my-2">
									<div className="row">
										<div className="col-2 d-flex align-items-center justify-content-center">
											<img src={item.img_url} className="img-thumbnail rounded-circle" />
										</div>
										<div className="col-sm-6 col-lg-8 d-flex align-self-center">
											<p className="display-5 fw-bold">{item.name}</p>
										</div>
										<div className="col-sm-2 co-lg-2 d-flex align-items-center justify-content-evenly">
											{favorites.includes(item.name) ?
												<button onClick={() => { actions.deleteFavoriteAlbum(item.id) }} className="btn btn-danger btn-green">Delete Favorite</button> :
												<button onClick={() => { actions.addFavoriteAlbum(item.id) }} className="btn btn-success btn-pink">Add to Favorites</button>
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

export default Albums;