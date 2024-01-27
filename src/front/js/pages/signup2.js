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
        <div className="container mt-5">
            <h4 className="text-center">Choose your name and add your favorites. When you're done, press "Submit".</h4>
            <br></br>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <div className="col-12">
                    <label htmlFor="nameInput" className="form-label">Name:</label>
                </div>
                <div className="col-12">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" />
                </div>
                <div className="col-12">
                    <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
                
            <div className="row">
                <div className="col-md-4">
                    <Artists />
                </div>
                <div className="col-md-4">
                    <Albums />
                </div>
                <div className="col-md-4">
                    <Songs />
                </div>
            </div>
        </div>
    );
};