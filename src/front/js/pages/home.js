import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import Wave from "../../img/wave.gif";

export const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const jumbotronText = document.querySelector('.fade-in-text');
		jumbotronText.classList.add('fade-in');
	}, []);

	return (
		<div className="container-flex" style={{
			backgroundImage: `url(${Wave})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat", 
			backgroundPosition: "center center"
		}}>
			<div className="jumbotron text-center padding-index">
				<h1 className="text-white display-2 fade-in-text">let us vibe to your rhythm</h1>
				<div className="row d-flex justify-content-center logs-div">
					<div className="col-auto">
						<button onClick={() => { navigate("/signup") }} className="btn btn-lg btn-primary mx-4 my-2 btn-green btn-index">
							Sign Up
						</button>
					</div>
					<div className="col-auto">
						<button onClick={() => { navigate("/login") }} className="btn btn-lg btn-primary mx-4 my-2 btn-pink btn-index">
							Sign In
						</button>
					</div>
				</div>
			</div>
			
		</div>
	);
}
