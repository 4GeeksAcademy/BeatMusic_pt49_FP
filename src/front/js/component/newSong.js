import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const NewSong = () => {
	const { store, actions } = useContext(Context);
    const [name, setName] = useState('')
    const [length, setLength] = useState('')
    const navigate = useNavigate();

    function sendData(){
        if (name !== "" && length !== "") {
            actions.createSong(name, length);
            navigate("/admin/listsong");
        } else {
            alert('Complete all fields. Song has not been saved.');
        }
    }

	return (
		<div className="container mt-5">
            <h1 className="text-center mt-3">Create new Song</h1>
            <div className="col-md-6">
                <form>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Song Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="nameInput" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lengthInput" className="form-label">Song Length</label>
                        <input value={length} onChange={(e)=>setLength(e.target.value)} className="form-control" id="lengthInput" />
                    </div>
                    <button onClick={sendData} type="button" className="btn btn-primary">Submit</button>
                </form>
            </div>
		</div>
	);
};