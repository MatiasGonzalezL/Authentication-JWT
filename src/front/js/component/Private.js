import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const isLoggedIn = store.isLoggedIn
	let history = useHistory();

	useEffect(() => {
		if (isLoggedIn == false) {
			//Código para enviar a otra vista  
			history.push("/login");
		}
	}, [isLoggedIn]);


	// useEffect(() => {
	// 	actions.privado(store.token);
	// }, []);

	return (
		<Container>
			<div className="privado">
				<h1>Solo se muestra para los usuarios registrados correctamente</h1>
			</div>
		</Container>
	)
}

