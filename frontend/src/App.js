import React from 'react';

import { Container, Collapse, Col, Row } from 'react-bootstrap';
import './App.css';

import AuthenticationPanel from './authentication/authentication';
import RegistrationPanel from './authentication/registration';
import LandingPage from './landingPage/landingPage';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      token: null
    }
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleDisconection = this.handleDisconection.bind(this)
  }

  handleDisconection() {
    this.setState({token:null, isLoggedIn: false});
  }

  handleSuccessfulLogin(token) {
    this.setState({token, isLoggedIn: true});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    if (!isLoggedIn) {
      return (
        <Container className="d-flex min-vh-100 justify-content-center align-items-center">
          <Col md={4}>
            <AuthenticationPanel onSuccessfulLogin={this.handleSuccessfulLogin}/>
          </Col>
          <Col md={{span: 4, offset: 4}}>
            <RegistrationPanel onSuccessfulLogin={this.handleSuccessfulLogin}/>
          </Col>
        </Container>
      )
    } else {
      return (
        <LandingPage token={this.state.token} onDisconect={this.handleDisconection}/>
      )
    }
  }
}

export default App;
