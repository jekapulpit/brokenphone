import React from "react";
import PropTypes from "prop-types"

const Room = props => {

    let lastMessage = props.room.last_message ? props.room.last_message.content : 'no messages';
    lastMessage = lastMessage.length > 20 ? lastMessage.substr(0, 20) + "..." : lastMessage;
    return (
        <div onClick={() => {props.handleRoom(props.room.id)}} className="content_dialog">
            <div className={props.active ? "dialog active" : "dialog"}>
                <img className="image" src={props.dia1} />
                <div className="right">
                    <div className="name">{props.room.name}</div>
                    <div className="message">{lastMessage}</div>
                </div>
            </div>
        </div>
    );
};

export default Room
