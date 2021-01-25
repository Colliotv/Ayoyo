import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class RegistrationPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: null,
            email: null,
            password: null,
            repeatPassword: null,

            invalidLogin: false,
            invalidRepeatPassword: false,
        }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleRegistration() {
        const {password, repeatPassword} = this.state;

        if (password !== repeatPassword) {
            this.setState({invalidRepeatPassword: true});
        } else {
            this.setState({invalidRepeatPassword: false});

            fetch(
                `http://0.0.0.0:8001/register`, {
                    method: "POST",
                    body: JSON.stringify({
                        login: this.state.login,
                        email: this.state.email,
                        password: this.state.password,
                    })
                }
                ).then(
                    res => {
                        switch (res.status) {
                            case 200:
                                res.json().then((data) => this.props.onSuccessfulLogin(data))
                                break;
                            case 409:
                                this.setState({invalidLogin: true})
                                break;
                        }
                    }
                )
        }
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
                    <Form.Control.Feedback type='invalid'>This login already exist, sorry {this.state.login} #2</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="mail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' type="mail" onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group controlId="repeatPassword">
                    <Form.Label>Repeat your Password</Form.Label>
                    <Form.Control name='repeatPassword' type="password" isInvalid={this.state.invalidRepeatPassword} onChange={this.handleInputChange}/>
                    <Form.Control.Feedback type='invalid'>Password don't match, bothersome? I know.</Form.Control.Feedback>
                </Form.Group>

                <Button onClick={this.handleRegistration} variant='danger'> Neo! Register!</Button>
            </Form>
        );
    }
}

export default RegistrationPanel;