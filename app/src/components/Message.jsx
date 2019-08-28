import React from "react";

const Message = ({username, message}) => {
    const messageBubbleStyle = {
        borderRadius: "18px",
        padding: "5px",
        clear: "both",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginBottom: "3px",
    };
    const sentMessageStyle = {
        float: "right",
        background: "#bfbdb4",
        borderBottomRightRadius: "5px"
    };
    const receivedMessageStyle = {
        float: "left",
        background: "#332bff",
        color: "#fff",
        borderBottomLeftRadius: "5px"
    };

    return <div
        style={{...messageBubbleStyle, ...(username === message.sender ? sentMessageStyle : receivedMessageStyle)}}>{message.message}</div>
};

export default Message;