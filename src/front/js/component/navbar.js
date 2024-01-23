import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.auth == false ? null :
						<Link to="/artists">
							<button className="btn btn-primary mx-1">Artist List</button>
						</Link>
					}
					{store.auth == true ? null :
						<Link to="/signup">
							<button className="btn btn-success">Sign Up</button>
						</Link>
					}
					{store.auth == true ? null :
						<Link to="/login">
							<button className="btn btn-primary mx-2">Log In</button>
						</Link>
					}
					{store.auth == false ? null :
						<button onClick={actions.logout} className="btn btn-danger">Log Out</button>
					}
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
