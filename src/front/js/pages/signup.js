import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";
import Wave from "../../img/wave.gif";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function sendData(e) {
        e.preventDefault();
        actions.signup(email, password);
    }

    return (
        <>
            <div className="py-15 py-xl-20 d-flex flex-column container-flex level-3 min-vh-100" style={{
                backgroundImage: `url(${Wave})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat", 
                backgroundPosition: "center center"
		    }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center padding-index">
                        <div className="col-md-10 col-lg-8 col-xl-5">
                            {store.auth === true ? (
                                <Navigate to="/signup2" />
                            ) : (
                                <div className="card">
                                    <div className="card-header bg-white text-center border-0 pb-0">
                                        <h5 className="fs-4 my-4">Sign Up</h5>
                                    </div>
                                    <div className="card-body bg-white">
                                        <div className="d-grid">
                                        </div>
                                        <form onSubmit={sendData}>
                                            <div className="form-floating mb-2">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="floatingInput">Email address</label>
                                            </div>
                                            <div className="form-floating mb-2">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingPassword"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="floatingPassword">Password</label>
                                            </div>
                                            <div className="d-grid mt-3">
                                                <button type="submit" className="btn btn-lg btn-primary btn-green">
                                                    Go!
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer border-0 bg-white inverted text-center">
                                        <p className="text-secondary">
                                            Already have an account? <a href="/login" className="link-green">Log In</a>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
