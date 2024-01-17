import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const EditArtist = () => {
	const { store, actions } = useContext(Context);
    const params = useParams();
    const [name, setName] = useState(store.singleArtist.name)
    const [url, setUrl] = useState(store.singleArtist.img_url)
    const navigate = useNavigate();
    
    useEffect(()=>{
        actions.getSingleArtist(params.artist_id)
    },[])

    useEffect(() => {
        if (store.singleArtist) {
          setName(store.singleArtist.name);
          setUrl(store.singleArtist.img_url);
        }
      }, [store.singleArtist]);

    function sendData(){
        if (name !== "" && url !== "") {
            actions.updateArtist(params.artist_id, name, url)
            navigate("/admin/listartist");
        } else {
            alert('Complete all fields. Artist has not been saved.');
        }
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