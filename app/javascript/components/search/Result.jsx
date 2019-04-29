import React from "react"
import PropTypes from "prop-types"
const Result = props => {
    return (
        <div className="result">
          <div className="person-data">
            <h2>fullname</h2>
            <p>email</p>
          </div>
          <div className="invite-button">
            <button>invite</button>
          </div>
        </div>
    );
};

export default Result
