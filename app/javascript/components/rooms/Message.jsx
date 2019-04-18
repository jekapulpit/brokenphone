import React from "react"
import PropTypes from "prop-types"
const Message = props => {
    return (
        <div className={props.fromMe ? "self-message" : "partner-message"}>
          <div className="sender">{props.sender}</div>
          <div className="message">{props.text}</div>
          <div className="sended">{props.sended}</div>
        </div>
    );
};

export default Message
