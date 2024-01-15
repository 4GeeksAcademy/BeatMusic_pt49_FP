import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const EditArtist = () => {
	const { store, actions } = useContext(Context);
    const params = useParams();
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    function sendData(e){
        e.preventDefault()
        actions.createArtist(name, url)
    }

	return (
		<div className="container mt-5">
            <h1 className="text-center mt-3">Edit an Artist</h1>
            <div className="col-md-6">
                <form>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Artist Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="urlInput" className="form-label">Image URL</label>
                        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="form-control" id="urlInput" />
                    </div>
                    <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
		</div>
	);
};

EditArtist.propTypes = {
	match: PropTypes.object
};