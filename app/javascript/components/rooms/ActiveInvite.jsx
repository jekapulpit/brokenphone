import React from "react"
import PropTypes from "prop-types"
import Notification from "./Notification";
const ActiveInvite = props => {
  //let names = props.allUsers.map((user) => {return user.full_name}).join(', ');
  return (
        <div className="talk talk-active">
          <div className="message-box">
            <div className="partner">
              <div className="image" style={{ backgroundImage: "url(" + props.dia1 + ")" }}>
                <div className="name" />
              </div>
              <div className="name">
                <div />
              </div>
            </div>
            <div id="m-list" className="messages">
              <Notification text={'You was invited into this chat room!'}/>
            </div>
            <div className="send-box" >
              <button onClick={() => props.acceptInvite(props.invite.id)}>accept</button>
            </div>
          </div>
        </div>
    );
};

export default ActiveInvite
