import React from "react"
import PropTypes from "prop-types"
import Room from "./Room";
const RoomsList = props => {
    let rooms = props.rooms.map((room) => {
       return (  <Room active={props.activeId === room.id} room={room} handleRoom={props.handleRoom} key={room.id} dia1={props.dia1} />  )
    });
    let newRoomAttrs = {};
    let newRoom = !props.newRoom ?
        (<div className="content_dialog"><button style={{margin: '10px', height: '30px'}} onClick={() => props.handleNew()}>Add a channel</button></div>) :
        (<div className="content_dialog">
            <div className={"dialog"}>
                <div className="right">
                    <input placeholder={"input new room's name"} ref={input => newRoomAttrs.name = input} className="name" />
                    <button onClick={() => props.handleCreateRoom(newRoomAttrs.name.value)}>create</button>
                </div>
            </div>
        </div>);
    return (
        <div className="dialogs">
            {rooms}
            {newRoom}
        </div>
    );
};

export default RoomsList
