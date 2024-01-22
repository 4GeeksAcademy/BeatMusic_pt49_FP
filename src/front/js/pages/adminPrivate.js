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
                    <h1>PrivateAdmin</h1>
                    <br></br>
                    <p>Welcome to your private area.</p>
                    <Link to="/admin/listalbum">
                        <button className="btn btn-primary mx-1">Admin List Album</button>
                    </Link>
                    <Link to="/admin/listartist">
                        <button className="btn btn-primary mx-1">Admin List Artist</button>
                    </Link>
                    <Link to="/admin/listsong">
                        <button className="btn btn-primary mx-1">Admin List Song</button>
                    </Link>
                </>
            }
        </div>
    );
};