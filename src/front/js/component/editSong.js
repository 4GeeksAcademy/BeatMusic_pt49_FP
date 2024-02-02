import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const EditSong = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [name, setName] = useState("")
    const [length, setLength] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        actions.getSingleSong(params.song_id);
    }, []);
    
    useEffect(() => {
        setName(store.singleSong.name || "");
        setLength(store.singleSong.length || "");
    }, [store.singleSong]);

    function sendData(e) {
        e.preventDefault();
        if (store.authAdmin == true) {
            actions.updateSong(params.song_id, name, length)
            navigate("/admin/listsong");
        } else {
            alert('you need to be loged in ');
        }
    }

    return (
        <div className="container mt-3">
            {store.authAdmin == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-center my-4 link-green">Edit a Song</h1>
                    <div className="col-md-6">
                        <form onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label text-white">Song Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lengthInput" className="form-label text-white">Song Length</label>
                                <input value={length} onChange={(e) => setLength(e.target.value)} className="form-control" id="lengthInput" required />
                            </div>
                            <button type="submit" className="btn text-white btn-green">Submit</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

EditSong.propTypes = {
    match: PropTypes.object
};