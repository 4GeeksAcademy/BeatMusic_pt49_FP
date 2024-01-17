import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const EditAlbum = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    actions.getSingleAlbum(params.album_id);
  }, []);

  useEffect(() => {
    if (store.singleAlbum) {
      setName(store.singleAlbum.name);
      setUrl(store.singleAlbum.img_url);
    }
  }, [store.singleAlbum]);

  function sendData(e) {
    e.preventDefault();
    actions.updateAlbum(params.album_id, name, url);
    navigate(`/admin/listalbum`, { replace: true }); // Redirige a la página de inicio después pulsar submit
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mt-3">Edit an Album</h1>
      <div className="col-md-6">
        <form onSubmit={sendData}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Album Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="nameInput"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="urlInput" className="form-label">
              Image URL
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-control"
              id="urlInput"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

EditAlbum.propTypes = {
  match: PropTypes.object,
};