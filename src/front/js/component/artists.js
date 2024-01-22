import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Artists = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1 className="text-center my-3">Artists</h1>
			<ul className="list-group">
				{store.artist.map((item) => {
					return (
						<li key={item.id} className="list-group-item">
							<div className="row">
								<div className="col-2 d-flex align-items-center justify-content-center">
									<img src={item.img_url} className="img-thumbnail rounded-circle" />
								</div>
                                <div className="col-8">
									<p className="fs-5 fw-bold">{item.name}</p>
								</div>
								<div className="col-2 d-flex align-items-center justify-content-evenly">
                                    <button className="btn btn-success">Add to Favorites</button>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			<br></br>
		</div>
	);
};