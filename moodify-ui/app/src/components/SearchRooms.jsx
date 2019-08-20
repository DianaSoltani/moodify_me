import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class SearchRooms extends Component
{
    state = {
        searchQuery: ""
    };

    onTextEntered = event =>
    {
        this.setState({searchQuery: event.target.value});
    };

    onSearchQueryEntered = event =>
    {
        event.preventDefault();
        this.props.search(this.state.searchQuery);
    };

    render()
    {
        return <Form onSubmit={this.onSearchQueryEntered}>
            <Form.Row className="h-auto p-2 m-auto">
                <Col>
                    <Form.Control type="text" placeholder="Search here..." onChange={this.onTextEntered}
                                  value={this.state.searchQuery}/>
                </Col>
            </Form.Row>
        </Form>
    };
}

export default SearchRooms;