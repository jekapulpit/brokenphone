import React from "react"
import PropTypes from "prop-types"
const Invite = props => {
    return (
        <div onClick={() => props.handleInvite(props.invite.id)} key={props.invite.id} className="content_dialog">
          <div className={props.active ? "dialog active" : "dialog"}>
            <div className="right">
              <div className="name">invite</div>
            </div>
          </div>
        </div>
    );
};

export default Invite
