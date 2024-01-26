import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const EditArtist = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [name, setName] = useState(store.singleArtist.name)
    const [url, setUrl] = useState(store.singleArtist.img_url)
    const navigate = useNavigate();

    useEffect(() => {
        actions.getSingleArtist(params.artist_id)
        setName(store.singleArtist.name);
        setUrl(store.singleArtist.img_url);
    }, [store.singleArtist])

    function sendData(e) {
        e.preventDefault();
        if (store.authAdmin == true) {
            actions.updateArtist(params.artist_id, name, url)
            navigate("/admin/listartist");
        } else {
            alert('you need to be loged in ');
        }
    }

    return (
        <div className="container mt-5">
            {store.authAdmin == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-center mt-3">Edit an Artist</h1>
                    <div className="col-md-6">
                        <form onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Artist Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="urlInput" className="form-label">Image URL</label>
                                <input value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" id="urlInput" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

EditArtist.propTypes = {
    match: PropTypes.object
};