import React from "react"
import PropTypes from "prop-types"
const Message = props => {
    return (
        <div className={props.fromMe ? "self-message" : "partner-message"}>
          <div className="message">
              <div className="sender">{props.sender}</div>
              {props.text}
              <div className="sended">{props.sended}</div>
              <button onClick={() => {props.handleDeleteMessage(props.messageId)}}>delete</button>
          </div>
        </div>
    );
};

export default Message
