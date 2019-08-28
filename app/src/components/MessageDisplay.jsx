import React from "react";
import Alert from "react-bootstrap/Alert";
import Message from "./Message";

const MessageDisplay = ({username, room}) => {

    const renderMessages = room => {
        if (room === undefined)
            return <Alert variant="info" className="text-center"><h4 className="text-center">Please select a room
                first</h4></Alert>;
        else
        {
            return room.messages.map((message, index) => {
                return <Message key={index} username={username} message={message}/>;
            });
        }
    };

    return <
        div
        className="flex-grow-1 p-3 flex-column"> {renderMessages(room)}
    </div>
};
export default MessageDisplay;