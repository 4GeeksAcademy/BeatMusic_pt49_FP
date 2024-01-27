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
						<Link to={"/private/" + store.userId}>
							<button className="btn btn-primary mx-1">Wall</button>
						</Link>
					}
					{store.auth == false ? null :
						<div className="btn-group mx-1">
							<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Lists
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link to="/artists">
										<button className="dropdown-item">Artists</button>
									</Link>
								</li>
								<li>
									<Link to="/albums">
										<button className="dropdown-item">Albums</button>
									</Link>
								</li>
								<li>
									<Link to="/songs">
										<button className="dropdown-item">Songs</button>
									</Link>
								</li>
							</ul>
						</div>
					}
					{store.auth == true || store.authAdmin == true ? null :
						<Link to="/signup">
							<button className="btn btn-success mx-1">Sign Up</button>
						</Link>
					}
					{store.auth == true || store.authAdmin == true ? null :
						<Link to="/login">
							<button className="btn btn-primary mx-1">Log In</button>
						</Link>
					}
					{store.authAdmin == false ? null :
						<div className="btn-group mx-1">
							<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Admin
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link to="/admin/private">
										<button className="dropdown-item">Admin Lists</button>
									</Link>
								</li>
								<li><hr class="dropdown-divider"/></li>
								<li>
									<button onClick={actions.adminLogout} className="btn btn-danger mx-3">Log Out</button>
								</li>
							</ul>
						</div>
					}
					{store.auth == false ? null :
						<div className="btn-group mx-1">
							<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							{store.username}
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link to="/artists">
										<button className="dropdown-item">Edit Profile</button>
									</Link>
								</li>
								<li><hr class="dropdown-divider"/></li>
								<li>
									<button onClick={actions.logout} className="btn btn-danger mx-3">Log Out</button>
								</li>
							</ul>
						</div>
					}
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
