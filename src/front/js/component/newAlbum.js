import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const NewAlbum = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        if (store.auth == true) {
            actions.createAlbum(name, url);
            navigate(`/admin/listalbum`, { replace: true });
        } else {
            alert('you need to be loged in ');
        }

    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mt-3">Create new Album</h1>
            <div className="col-md-6">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Album Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="urlInput" className="form-label">Image URL</label>
                        <input value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" id="urlInput" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};