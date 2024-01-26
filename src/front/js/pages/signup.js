import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e) {
        e.preventDefault(email, password)
        actions.signup(email, password)

    }

    return (
        <div className="container mt-5">
            {store.auth == true ? <Navigate to={"/private/" + store.userId} /> :
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                        </div>
                        <Link to="/private">
                            <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
                        </Link>
                    </form>
                </div>
            }
        </div>
    );
};