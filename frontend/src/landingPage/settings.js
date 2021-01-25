import React from 'react';
import { Modal, InputGroup, Button, FormControl } from 'react-bootstrap';

class SettingsPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: this.props.user.email
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    handleSave() {
        fetch(
            `http://0.0.0.0:8001/updateSettings`, {
                method: "POST",
                headers: {
                    'authorization': `Bearer ${this.props.token.value}`
                },
                body: JSON.stringify({
                    email: this.state.email,
                })
            }
        ).then(
            (response) => {
                switch (response.status) {
                    case 200:
                        this.props.onHide({shouldRefreshUser: true});
                        break;
                }
            }
        )
    }

    render() {
        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            backdrop="static"
            keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Contact Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Mail"
                            aria-label="Mail"
                            aria-describedby="basic-addon1"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSave}>Save</Button>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SettingsPanel