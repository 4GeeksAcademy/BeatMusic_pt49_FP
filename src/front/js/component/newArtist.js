import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";

export const NewArtist = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        if (store.authAdmin == true) {
            actions.createArtist(name, url);
            navigate("/admin/listartist");
        } else {
            alert('you need to be loged in ');
        }
    }

    return (
        <div className="container mt-5">
            {store.authAdmin == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-center mt-3">Create new Artist</h1>
                    <div className="col-md-6">
                        <form onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Artist Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="urlInput" className="form-label">Image URL</label>
                                <input value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" id="urlInput" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};