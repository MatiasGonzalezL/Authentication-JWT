import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import "../../styles/home.css";
import { useHistory } from "react-router-dom";

import { Context } from "../store/appContext";


export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();


    const registerClick = async (e) => {
        e.preventDefault()

        if (username.length != 0 && email.length != 0 && password.length != 0) {
            const data = await actions.signup(email, password)
            console.log(data, "data")
            if (data === 200) {
                return (alert("Registro exitoso"),
                    history.push('/login'))
            } else {
                return <div>Ocurrió un error en el registro</div>
            }
        } else {
            return alert("Se deben llenar todos los campos")
        }
    }

    return (
        <Container className="formulario">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit" onClick={(e) => registerClick(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}