import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const isLoggedIn = store.isLoggedIn;
	const tokenLogout = actions.deleteToken

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{!isLoggedIn ?
					<Link to="/">
						<span className="navbar-brand mb-0 h1">Home</span>
					</Link> : <></>}
				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
				<div>
					{!isLoggedIn ? <></> :
						<Link to="/">
							<button className="btn btn-primary" onClick={tokenLogout}>Logout</button>
						</Link>}
				</div>
			</div>
		</nav>
	);
};
