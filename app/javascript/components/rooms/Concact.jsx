import React from "react"
import PropTypes from "prop-types"
const Concact = props => {
    return (
        <div className="self">
          <img className="image" id="profile-image" src={props.avatar} />
          <div className="name">Berru Lgusya</div>
          <div className="exit" />
        </div>
    );
}

export default Concact
