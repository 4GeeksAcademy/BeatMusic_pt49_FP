import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, Navigate } from "react-router-dom";

export const ListAlbum = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			{store.authAdmin == false ? <Navigate to="/" /> :
				<>
					<div className="d-flex justify-content-end my-3">
						<Link to="/admin/newalbum">
							<button className="btn btn-success btn-green">Add new album</button>
						</Link>
					</div>
					<ul className="list-group">
						<li className="list-group-item">
							<div className="row">
								<div className="col-2 d-flex align-self-center">
									<p className="fs-5 fw-bold">Picture</p>
								</div>
								<div className="col-2 d-flex align-self-center justify-content-center">
									<p className="fs-5 fw-bold">Album ID</p>
								</div>
								<div className="col-6 d-flex align-self-center">
									<p className="fs-5 fw-bold">Name</p>
								</div>
								<div className="col-2 d-flex align-self-center">
									<p className="fs-5 fw-bold">Edit / Delete</p>
								</div>
							</div>
						</li>
						{store.album.map((item, index) => {
							return (
								<li key={item.id} className="list-group-item">
									<div className="row">
										<div className="col-2 d-flex align-items-center justify-content-center">
											<img src={item.img_url} className="img-thumbnail rounded-circle" />
										</div>
										<div className="col-2 d-flex align-self-center justify-content-center">
											<p className="fs-5 fw-bold">{item.id}</p>
										</div>
										<div className="col-6 d-flex align-self-center">
											<p className="fs-5 fw-bold">{item.name}</p>
										</div>
										<div className="col-2 d-flex align-self-center">
											<Link to={"/admin/editalbum/" + item.id}>
												<button className="btn text-dark">
													<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
														<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
													</svg>
												</button>
											</Link>
											<button className="btn text-dark" data-bs-toggle="modal" data-bs-target={"#deleteModal" + item.id}>
												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
													<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
												</svg>
											</button>
											<div className="modal fade" id={"deleteModal" + item.id} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
												<div className="modal-dialog">
													<div className="modal-content">
														<div className="modal-header">
															<h1 className="modal-title fs-5" id="deleteModalLabel">Are you sure?</h1>
															<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
														</div>
														<div className="modal-body">
															You will delete {item.name} from the list.
														</div>
														<div className="modal-footer">
															<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
															<Link to="/admin/listalbum">
																<button type="button" className="btn btn-danger" onClick={() => actions.deleteAlbum(item.id)} data-bs-dismiss="modal" >Confirm</button>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
					<br></br>
				</>
			}
		</div>
	);
};