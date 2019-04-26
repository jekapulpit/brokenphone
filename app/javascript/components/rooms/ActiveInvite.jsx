import React from "react"
import PropTypes from "prop-types"
const ActiveInvite = props => {
  let names = props.allUsers.map((user) => {return user.full_name}).join(', ');
  return (
        <div className="talk talk-active">
          <div className="message-box">
            <div className="partner">
              <div className="image" style={{ backgroundImage: "url(" + props.dia1 + ")" }}>
                <div className="name" />
              </div>
              <div className="name">
                <div>{names}</div>
              </div>
            </div>
            <div id="m-list" className="messages">
              <button>accept</button>
            </div>
            <div className="send-box" />
          </div>
        </div>
    );
};

export default ActiveInvite
