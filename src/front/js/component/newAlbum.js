import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const NewAlbum = () => {
	const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const navigate = useNavigate();

    function sendData(){
        if (name !== "" && url !== "") {
            actions.createAlbum(name, url);
            navigate("/admin/listalbum");
        } else {
            alert('Complete all fields. Album has not been saved.');
        }
    }

	return (
		<div className="container mt-5">
            <h1 className="text-center mt-3">Create new Album</h1>
            <div className="col-md-6">
                <form>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Album Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="urlInput" className="form-label">Image URL</label>
                        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="form-control" id="urlInput" />
                    </div>
                    <button onClick={sendData} type="button" className="btn btn-primary">Submit</button>
                </form>
            </div>
		</div>
	);
};