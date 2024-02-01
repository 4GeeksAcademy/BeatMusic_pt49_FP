import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import Artists from "../component/artists";
import Albums from "../component/albums";
import Songs from "../component/songs";

export const Signup2 = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [name, setName] = useState('')

    function sendData(e) {
        e.preventDefault(name)
        actions.editProfileName(name)
        navigate("/private/" + store.userId)
    }

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center text-white">Choose your name and add your favorites.</h1>
                <h1 className="text-center text-white">When you're done, press "Submit".</h1>
                <br></br>
                <form onSubmit={sendData} className="row justify-content-center">
                    <div className="col-auto">
                        <label htmlFor="nameInput" className="form-label text-white">Name:</label>
                    </div>
                    <div className="col-auto">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" required />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary btn-pink">Submit</button>
                    </div>
                </form>
            </div>
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-lg-6">
                        <Artists />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <Albums />
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <Songs />
                    </div>
                </div>
            </div>
        </>
    );
};