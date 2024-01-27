import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Artists from "../component/artists";
import Albums from "../component/albums";
import Songs from "../component/songs";

export const Signup2 = () => {
    const { store, actions } = useContext(Context)
    const [name, setName] = useState('')

    function sendData(e) {
        e.preventDefault(name)
        actions.signup(email, password)
    }

    return (
        <div className="container mt-5">
            <h4>Choose your name and add your favorites. When you're done, press "Submit".</h4>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Name:</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" />
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <Link to={"/private/" + store.userId}>
                        <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
                    </Link>
                </div>
            </div>
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