import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const AdminPrivate = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            {store.auth == false ? <Navigate to="/" /> :
                <>
                    <h1>PrivateAdmin</h1>
                    <br></br>
                    <p>Welcome to your private area.</p>
                </>
            }
        </div>
    );
};