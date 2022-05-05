import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hola, te doy la bienvenida a esta página de inicio</h1>
			<p>
				<h2>¿Quieres registrarte para ver que todo funciona? ¡Haz click en el botón!</h2>
			</p>
			<div className="sign">
				{/* {store.message || "Loading message from the backend (make sure your python backend is running)..."} */}
				<Link to="/signup"><button className="btn btn-primary">Registro de usuario nuevo</button></Link>
			</div>
			<hr />
			<div className="logueo">
				<h2>¿Ya tienes un usuario? Entonces ingresa loguéandote</h2>
				<div>
					<Link to="/login">
						<button className="btn btn-primary">Ingresa con tu usuario</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
