import React from "react"
import PropTypes from "prop-types"
const Profile = props => {
    return (
        <div className="self">
          <img className="image" id="profile-image" src={props.avatar} />
          <div className="name">{props.user.email}</div>
          <div className="exit" />
        </div>
    );
};

export default Profile
