import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";

export const UserSettings = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [name, setName] = useState(store.username)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    function sendName(e) {
        e.preventDefault(name)
        actions.editProfileName(name)
        navigate("/private/" + store.userId)
    }
    function sendPassword(e) {
        e.preventDefault(password)
        if (password === repeatPassword) {
            actions.editPassword(password)
            navigate("/private/" + store.userId)
        } else {
            alert("Passwords do not match");
        }
    }

    return (
        <div className="container my-4">
            {store.auth == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-center text-white">Account Settings</h1>
                    <br></br>
                    <h3 className="text-white mt-5" >Change your name.</h3>
                    <form onSubmit={sendName} className="row align-items-center my-4">
                        <div className="col-2">
                            <label htmlFor="nameInput" className="form-label text-white">Name:</label>
                        </div>
                        <div className="col-auto">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" required />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary btn-pink">Submit</button>
                        </div>
                    </form>
                    <h3 className="mt-5 text-white">Change your password.</h3>  
                    <form onSubmit={sendPassword} className="row align-items-center my-4">
                        <div className="col-2">
                            <label htmlFor="passwordInput" className="form-label text-white">New Password:</label>
                        </div>
                        <div className="col-auto">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" required />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary btn-pink">Submit</button>
                        </div>
                    </form>
                    <form className="row align-items-center my-2">
                        <div className="col-2">
                            <label htmlFor="repeatPasswordInput" className="form-label text-white">Repeat Password:</label>
                        </div>
                        <div className="col-auto">
                            <input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" className="form-control" id="repeatPasswordInput" required />
                        </div>
                    </form>
                </>
            }
        </div>
    );
};