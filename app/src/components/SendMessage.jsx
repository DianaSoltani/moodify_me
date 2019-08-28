import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class SendMessage extends Component
{
    state = {
        message: ""
    };

    onTextEntered = event => {
        this.setState({message: event.target.value});
    };

    onMessageEntered = event => {
        event.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({message: ''});
    };

    render()
    {
        const roomIsSelected = this.props.isRoomSelected();
        return <Form onSubmit={this.onMessageEntered}>
            <Form.Row className="h-auto p-2 m-auto">
                <Col>
                    <Form.Control type="text"
                                  placeholder={roomIsSelected ? "Type Here..." : "Please select a room first"}
                                  onChange={this.onTextEntered}
                                  value={this.state.message} disabled={!roomIsSelected}/>
                </Col>
                <Col md="auto">
                    <Button variant="dark" type="submit" disabled={!roomIsSelected}>Submit</Button>
                </Col>
            </Form.Row>
        </Form>
    }
}

export default SendMessage;