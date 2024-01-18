import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/admin/listalbum">
						<button className="btn btn-primary mx-1">Admin List Album</button>
					</Link>
					<Link to="/admin/listartist">
						<button className="btn btn-primary mx-1">Admin List Artist</button>
					</Link>
					<Link to="/admin/listsong">
						<button className="btn btn-primary mx-1">Admin List Song</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
