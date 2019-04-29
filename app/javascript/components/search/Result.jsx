import React from "react"
import PropTypes from "prop-types"
const Result = props => {
    let acceptance = {};
    if (props.userInfo.invited || props.userInfo.accepted) {
        acceptance = props.userInfo.accepted ? (<p className="accepted">accepted</p>) : (<p className="sended">sended</p>);
    }
    else
        acceptance = (<button onClick={() => {props.inviteUser(props.userInfo.id, 'dasdaasda')}}>invite</button>);
    return (
        <div className="result">
          <div className="person-data">
            <h2>{props.userInfo.full_name}</h2>
            <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
            {acceptance}
          </div>
        </div>
    );
};

export default Result
