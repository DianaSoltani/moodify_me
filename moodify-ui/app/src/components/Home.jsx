import React, {Component} from "react";
import axios from "axios";
import RoomList from "./RoomList";
import MessageDisplay from "./MessageDisplay";
import SendMessage from "./SendMessage";
import SearchRooms from "./SearchRooms";

class Home extends Component
{
    state = {
        rooms: [],
        joinedRooms: [],
        visibleRooms: [],
        activeRoom: "",
        searchQuery: ""
    };

    registerSocketListeners()
    {
        const {socket, username} = this.props;
        socket.on("connect", (data) => {
            if (data !== undefined)
                console.log(data.username + " has come online");
        });

        socket.on("new_user", (data) => {
            this.setState({rooms: [...this.state.rooms, {roomName: data.username, messages: []}]});
        });

        socket.on("room_opened", ({roomName}) => {
            const usersInRoom = roomName.split(" ");
            if (usersInRoom.includes(username) && !this.state.joinedRooms.includes(roomName))
            {
                this.joinRoom(roomName, false);
                if (this.state.searchQuery === "")
                    this.setState({visibleRooms: this.state.joinedRooms})
            }
            if (!this.state.rooms.find(room => room.roomName === roomName))
                this.setState({rooms: [...this.state.rooms, {roomName: roomName, messages: []}]});
        });

        socket.on("new_message", ({messageData}) => {
            this.setState({
                rooms: this.state.rooms.map(room => {
                    if (room.roomName === messageData.room)
                        room.messages = [...room.messages, messageData.message];
                    return room;
                })
            });
        });
    }

    async componentDidMount()
    {
        this.registerSocketListeners();
        const endpoint = "/" + this.props.username + "/get_rooms";
        let [usersResponse, userRoomsResponse] = await Promise.all([axios.get("/get_users"), axios.get(endpoint)]);
        let users = usersResponse.data.users.filter(user => user !== this.props.username);
        const userRooms = userRoomsResponse.data.rooms;
        for (let i = 0; i < userRooms.length; i++)
        {
            const usersInRoom = userRooms[i].roomName.replace(this.props.username, "").trim().split(" ");
            for (let j = 0; j < usersInRoom.length; j++)
            {
                let matchIndex = users.indexOf(usersInRoom[j]);
                if (matchIndex >= 0)
                    users.splice(matchIndex, 1);
            }
        }
        users = users.map(user => ({roomName: user, messages: []}));
        userRooms.map(room => this.joinRoom(room.roomName, false));
        const userRoomNames = userRooms.map(room => room.roomName);
        this.setState({
            rooms: userRooms.concat(users),
            joinedRooms: userRoomNames,
            visibleRooms: userRoomNames,
        });
    };

    joinRoom = (roomName, setActive) => {
        const isFirstJoin = !this.state.joinedRooms.includes(roomName);
        this.setState({
            activeRoom: setActive ? roomName : this.state.activeRoom,
            joinedRooms: (isFirstJoin ? [...this.state.joinedRooms, roomName] : this.state.joinedRooms)
        });
        this.props.socket.emit("join", {username: this.props.username, room: roomName, is_first_join: isFirstJoin});
    };

    handleRoomClicked = roomClicked => {
        if (roomClicked === this.state.activeRoom)
            return;
        // another user name was likely clicked
        let roomName = roomClicked;
        if (!roomClicked.includes(" "))
        {
            roomName = [this.props.username, roomClicked].sort().join(" ");
            const newRooms = this.state.rooms.filter(room => room.roomName !== roomClicked);
            if (newRooms.map(room => room.roomName).indexOf(roomName) < 0)
                newRooms.push({roomName: roomName, messages: []});
            const newVisibleRooms = this.state.visibleRooms.filter(room => room !== roomClicked);
            newVisibleRooms.push(roomName);
            this.setState({
                rooms: newRooms,
                visibleRooms: newVisibleRooms
            });
        }
        this.joinRoom(roomName, true);
    };

    handleSearched = searchQuery => {
        if (searchQuery === '')
            this.setState({visibleRooms: this.state.joinedRooms});
        else
            this.setState({
                visibleRooms: this.state.rooms
                    .map(room => room.roomName)
                    .filter(roomName => roomName.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            })
    };

    sendMessage(message)
    {
        message = {sender: this.props.username, message: message};
        this.props.socket.emit("new_message", {message: message, room: this.state.activeRoom});
    }

    render()
    {
        return <div id="home" className="flex-grow-1 d-flex flex-column">
            <div className="d-flex flex-grow-1">
                <div className="d-flex flex-column border-right">
                    <SearchRooms search={this.handleSearched}/>
                    <RoomList rooms={this.state.visibleRooms} activeRoom={this.state.activeRoom}
                              handleRoomClicked={this.handleRoomClicked}/>
                </div>
                <MessageDisplay
                    username={this.props.username}
                    room={this.state.rooms.find(room => room.roomName === this.state.activeRoom)}/>
            </div>
            <SendMessage sendMessage={(message) => this.sendMessage(message)} socket={this.props.socket}
                         isRoomSelected={() => {
                             return (this.state.activeRoom !== "")
                         }}/>
        </div>
    }
}


export default Home