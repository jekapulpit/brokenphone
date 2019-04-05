import React from "react"
import PropTypes from "prop-types"
const Message = props => {
    return (
        <div className={props.fromMe ? "self-message" : "partner-message"}>
          <div className="message">{props.text}</div>
        </div>
    );
};

export default Message
