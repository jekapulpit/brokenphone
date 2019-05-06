import React from "react"
import PropTypes from "prop-types"
const Notification = props => {
    return (
      <div className="self-message center">
        <div className="notification">
          {props.text}
        </div>
      </div>
    );
};

export default Notification
