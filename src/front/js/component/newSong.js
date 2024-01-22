import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const NewSong = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    const [length, setLength] = useState('')
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        if (store.authAdmin == true) {
            actions.createSong(name, length);
            navigate("/admin/listsong");
        } else {
            alert('you need to be loged in ');
        }
    }

    return (
        <div className="container mt-5">
            {store.authAdmin == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-center mt-3">Create new Song</h1>
                    <div className="col-md-6">
                        <form onSubmit={sendData}>
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Song Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lengthInput" className="form-label">Song Length</label>
                                <input value={length} onChange={(e) => setLength(e.target.value)} className="form-control" id="lengthInput" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};