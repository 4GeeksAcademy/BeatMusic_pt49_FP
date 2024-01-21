import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const AdminLogin = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e) {
        e.preventDefault()
        actions.adminLogin(email, password)
    }

    return (
        <div className="container mt-5">
            {store.auth == true ? <Navigate to="/admin/private" /> :
                <div className="col-md-6">
                    <p>Admin Login</p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                        </div>
                        <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            }

        </div>
    );
};