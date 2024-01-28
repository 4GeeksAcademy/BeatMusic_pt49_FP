import React, { useContext, useState, useEffect, } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Songs = () => {
	const { store, actions } = useContext(Context);
	const favorites = store.favoriteSongs.map(item => item.song)
	const [searchSong, setSearchSong] = useState("")
	const filteredSongs = store.song.filter(item => item.name.toLowerCase().includes(searchSong.toLowerCase()))

	useEffect(() => {
        if (store.favoriteSongs) {
            actions.getFavoriteSongs(store.userId);
        }
      }, [store.favoriteSongs]);

	return (
		<div className="container">
			<h1 className="text-center my-3">Songs</h1>
			{store.auth == false ? <Navigate to="/" /> :
				<div>
					<input className="form-control mb-3" type="text" placeholder="Search by song name" value={searchSong} onChange={(e) => setSearchSong(e.target.value)} />
					<ul className="list-group">
						{filteredSongs.map((item) => {
							return (
								<li key={item.id} className="list-group-item">
									<div className="row">
										<div className="col-6">
											<p className="fs-5 fw-bold">{item.name}</p>
										</div>
										<div className="col-2">
											<p className="fs-5 fw-bold">{item.length}</p>
										</div>
										<div className="col-4 d-flex align-items-center justify-content-evenly">
											{favorites.includes(item.name) ?
												<button onClick={()=> {actions.deleteFavoriteSong(item.id)}} className="btn btn-danger">Delete from Favorites</button> :
												<button onClick={()=> {actions.addFavoriteSong(item.id)}} className="btn btn-success">Add to Favorites</button>
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

export default Songs;