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
			<h1 className="display-2 my-5 link-green">Songs</h1>
			{store.auth == false ? <Navigate to="/" /> :
				<div>
					<input className="form-control mb-2" type="text" placeholder="Search by song name" value={searchSong} onChange={(e) => setSearchSong(e.target.value)} />
					<ul className="list-group">
						{filteredSongs.map((item) => {
							return (
								<li key={item.id} className="list-group-item border-0 my-2">
									<div className="row">
										<div className="col-sm-6 col-lg-8 d-flex align-self-center">
											<h2 className="fw-bold">{item.name}</h2>
										</div>
										<div className="col-sm-4 col-lg-2 d-flex align-self-center">
											<p className="fs-5 fw-bold m-0">{item.length}</p>
										</div>
										<div className="col-sm-2 co-lg-2 d-flex align-self-center justify-content-evenly">
											{favorites.includes(item.name) ?
												<button onClick={()=> {actions.deleteFavoriteSong(item.id)}} className="btn text-white btn-green">Delete Favorite</button> :
												<button onClick={()=> {actions.addFavoriteSong(item.id)}} className="btn text-white btn-pink">Add to Favorites</button>
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