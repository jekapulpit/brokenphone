import React from "react"
import PropTypes from "prop-types"
import Room from "./Room";
const RoomsList = props => {
    let rooms = props.rooms.map((room) => {
       return (  <Room active={props.activeId === room.id} room={room} handleRoom={props.handleRoom} key={room.id} dia1={props.dia1} />  )
    });
    return (
        <div className="dialogs">
            {rooms}
        </div>
    );
};

export default RoomsList
