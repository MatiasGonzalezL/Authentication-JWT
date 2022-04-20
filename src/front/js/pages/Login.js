import React, { useEffect, useContext, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "../../styles/home.css";
import { Context } from '../store/appContext';

export const Login = () => {
    let history = useHistory();
    const { store, actions } = useContext(Context);
    const isLoggedIn = store.isLoggedIn
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isLoggedIn == true) {
            //Código para enviar a otra vista  
            history.push("/private");
        }
    }, [isLoggedIn]);

    const onSubmitHandler = () => {
        actions.createToken(email, password);
    }

    if (store.token != "" && store.token && store.token != undefined) history.push("/");
    return (
        <Container className="formulario">
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" onClick={onSubmitHandler}>
                    Log in
                </Button>
            </Form>
        </Container>
    )
}