import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const EditSong = () => {
	const { store, actions } = useContext(Context);
    const params = useParams();
    const [name, setName] = useState(store.singleSong.name)
    const [length, setLength] = useState(store.singleSong.length)
    const navigate = useNavigate();
    
    useEffect(()=>{
        actions.getSingleSong(params.song_id)
    },[])

    useEffect(() => {
        if (store.singleSong) {
          setName(store.singleSong.name);
          setLength(store.singleSong.length);
        }
      }, [store.singleSong]);

    function sendData(){
        if (name !== "" && length !== "") {
            actions.updateSong(params.song_id, name, length)
            navigate("/admin/listsong");
        } else {
            alert('Complete all fields. Song has not been saved.');
        }
    }

	return (
		<div className="container mt-5">
            <h1 className="text-center mt-3">Edit a Song</h1>
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
                    <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
		</div>
	);
};

EditSong.propTypes = {
	match: PropTypes.object
};