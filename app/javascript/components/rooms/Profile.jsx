import React from "react"
import PropTypes from "prop-types"
const Profile = props => {
    return (
        <div className="self">
          <img className="image" id="profile-image" src={props.avatar} />
          <div className="name">{props.user.full_name}</div>
          <div className="name">{props.user.email}</div>
          <a href="/users/sign_out" data-method="delete" className="exit" />
        </div>
    );
};

export default Profile
