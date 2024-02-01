import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import Wave from "../../img/wave.gif";
import Bg from "../../img/bg.jpg";

export const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const jumbotronText = document.querySelector('.fade-in-text');
		jumbotronText.classList.add('fade-in');
	}, []);

	return (
		<>
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
			<div className="row mx-5 mb-5">
				<div className="col-sm-12 col-lg-6 px-2 py-2 " >
					<div className="row card-index mx-5 my-3" style={{
						backgroundImage: `url(${Bg})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center center"
					}}>
						<div className="col mx-5 my-5">
							<h1 className="link-green mt-4 mb-4 display-3">BeatMusic is made for you, by you.</h1>
							<h2 className="text-white tx-shadow mt-5 lh-lg">
								Navigate our extensive music library, discover our channels, or get perfect music recomendations thanks to our AI.
							</h2>
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-lg-6 px-2 py-2">
					<div className="row card-index mx-5 my-3 bg-pink">
						<div className="col mx-5 my-5">
							<h1 className="text-black mt-4 mb-4 display-3">Conect with all your friends.</h1>
							<h2 className="text-white mt-5 lh-lg">
								Check out your friends' favorite music, discover new music through them, and get an instant music match based on your preferences.
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
