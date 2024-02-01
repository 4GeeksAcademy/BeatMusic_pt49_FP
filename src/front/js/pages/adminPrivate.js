import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, Navigate } from "react-router-dom";

export const AdminPrivate = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            {store.authAdmin == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-white">Private Admin Area</h1>
                    <br></br>
                    <p className="text-white">Select what you'd like to manage.</p>
                    <br></br>
                    <Link to="/admin/listartist">
                        <button className="btn btn-primary btn-green my-2 mx-2">Admin List Artist</button>
                    </Link>
                    <Link to="/admin/listalbum">
                        <button className="btn btn-primary btn-green my-2 mx-2">Admin List Album</button>
                    </Link>
                    <Link to="/admin/listsong">
                        <button className="btn btn-primary btn-green my-2 mx-2">Admin List Song</button>
                    </Link>
                </>
            }
        </div>
    );
};