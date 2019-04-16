import React from "react"
import PropTypes from "prop-types"
import Profile from "./Profile";
import RoomsList from "./RoomsList";
const Menu = props => {
    return (
        <div className="menu">
          <Profile user={props.user} avatar={props.avatar} />
          <h5>Свежие чаты:</h5>
          <RoomsList newRoom={props.newRoom} activeId={props.activeId} handleRoom={props.handleRoom} rooms={props.rooms} dia1={props.dia1}/>
        </div>
    );
};

export default Menu
