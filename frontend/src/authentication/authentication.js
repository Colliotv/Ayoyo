import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AuthenticationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            invalidLogin: false,
            invalidPassword: false,
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLogin() {
        fetch(
            `http://0.0.0.0:8001/authenticate?login=${this.state.login}&password=${this.state.password}`
            ).then(
                res => {
                    switch (res.status) {
                        case 200:
                            console.log(res)
                            res.json().then((data) => this.props.onSuccessfulLogin(data))
                            break;
                        case 401:
                            this.setState({
                                invalidPassword: true,
                                invalidLogin: false
                            });
                            break;
                        case 404:
                            this.setState({
                                invalidPassword: false,
                                invalidLogin: true
                            });
                            break;
                    }
                }
            )
    }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="login">
                    <Form.Label>Login</Form.Label>
                    <Form.Control name='login' type="text" isInvalid={this.state.invalidLogin} placeholder="Enter Login" onChange={this.handleInputChange} />
                    <Form.Control.Feedback type='invalid'>This login is unkonw, Typo maybe?</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="login">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" isInvalid={this.state.invalidPassword} onChange={this.handleInputChange}/>
                    <Form.Control.Feedback type='invalid'>Wrong password, two more try and your pc explode</Form.Control.Feedback>
                </Form.Group>

                <Button onClick={this.handleLogin} variant='primary'> Enter the Matrix!</Button>
            </Form>
        );
    }
}

export default AuthenticationPanel;