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
        e.preventDefault()
        actions.editProfileName(name)
        navigate("/private/" + store.userId)
    }
    function sendPassword(e) {
        e.preventDefault()
        if (password === repeatPassword) {
            actions.editPassword(password)
            navigate("/private/" + store.userId)
        } else {
            alert("Passwords do not match");
        }
    }

    return (
        <div className="container mt-5">
            {store.auth == false ? <Navigate to="/" /> :
                <>
                    <h1 className="text-center">Account Settings</h1>
                    <br></br>
                    <h3>Change your name.</h3>
                    <form onSubmit={sendName} className="row align-items-center my-3">
                        <div className="col-2">
                            <label htmlFor="nameInput" className="form-label">Name:</label>
                        </div>
                        <div className="col-auto">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" required />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <h3 className="mt-5">Change your password.</h3>  
                    <form onSubmit={sendPassword} className="row align-items-center my-3">
                        <div className="col-2">
                            <label htmlFor="passwordInput" className="form-label">New Password:</label>
                        </div>
                        <div className="col-auto">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" required />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    <form className="row align-items-center my-2">
                        <div className="col-2">
                            <label htmlFor="repeatPasswordInput" className="form-label">Repeat Password:</label>
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