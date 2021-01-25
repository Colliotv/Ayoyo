import React from 'react';
import { Container, Spinner, Button, Jumbotron, Row } from 'react-bootstrap';

import SettingsPanel from './settings';

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            showSettings: false,
        }

        this.handleOpenSettings = this.handleOpenSettings.bind(this);
        this.handleCloseSettings = this.handleCloseSettings.bind(this);
        this.reloadUser();
    }

    reloadUser() {
        fetch(
            `http://0.0.0.0:8001/get_user_information`, {
                headers: {
                    'authorization': `Bearer ${this.props.token.value}`
                }
            }
        ).then(
            res => {
                console.log(res);
                switch (res.status) {
                    case 200:
                        res.json().then(data => this.setState({user: data}))
                        break;
                    case 404, 401:
                        this.props.onDisconect();
                        break;
                }
            }
        )
    }

    handleOpenSettings() {
        this.setState({showSettings: true});
    }

    handleCloseSettings({shouldRefreshUser=false}) {
        this.setState({showSettings: false});
        if (shouldRefreshUser) {
            this.reloadUser();
        }
    }

    render() {
        if (!!this.state.user) {
            return (
                <Container className="d-flex min-vh-100 justify-content-center align-items-center">
                    <Row>
                        <Jumbotron>
                            <h1>Hello {this.state.user.login}</h1>
                            <p>Happy to see you back, at the moment you may modify your mail (which is {this.state.user.email}), more soon maybe?</p>
                        </Jumbotron>
                    </Row>
                    <Row className="align-items-center justify-content-center">
                        <Button md={4} variant="success" onClick={this.handleOpenSettings}>Modify your contact informations</Button>
                        <Button md={{span: 4, offset: 4}} variant="danger" onClick={this.props.onDisconect}>Log Out</Button>
                    </Row>
                    <SettingsPanel show={this.state.showSettings} onHide={this.handleCloseSettings} user={this.state.user} token={this.props.token}/>
                </Container>
            )    
        } else {
            return (
                <Container className="d-flex min-vh-100 justify-content-center align-items-center">
                    <Spinner animation="grow"/>
                </Container>
            )    
        }
    }

}

export default LandingPage;