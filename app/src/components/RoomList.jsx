import React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

const RoomList = ({rooms, activeRoom, handleRoomClicked}) => {
    return <ListGroup variant="flush" className="w-auto text-center room-list mt-2">
        <h4><u>Room List:</u></h4>
        {
            rooms.length >= 1 ?
                rooms.map((val, ind) =>
                    <ListGroupItem key={ind} className="border border-right-0" action
                                   onClick={() => handleRoomClicked(val)}>
                        {
                            activeRoom !== val ? val : <b>{val}</b>
                        }
                    </ListGroupItem>) :
                <p><br/>No rooms found to join! <br/> Search for someone to talk to</p>
        }
    </ListGroup>
};

export default RoomList;