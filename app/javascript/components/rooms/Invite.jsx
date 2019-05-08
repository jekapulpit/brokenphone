import React from "react"
import PropTypes from "prop-types"
const Invite = props => {
    return (
        <div onClick={() => props.handleInvite(props.invite.id)} key={props.invite.id} className="content_dialog">
          <div className={props.active ? "dialog for-invite active" : "dialog for-invite"}>
              <p className="name">{props.invite.content}</p>
          </div>
        </div>
    );
};

export default Invite
