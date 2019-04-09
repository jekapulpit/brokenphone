import React from "react";
import PropTypes from "prop-types"

const Room = props => {
    return (
        <div onClick={() => {props.handleRoom(props.room.id)}} className="content_dialog">
            <div className="dialog">
                <img className="image" src={props.dia1} />
                <div className="right">
                    <div className="name">Anna Wrote</div>
                    <div className="message">Lorem ipsum dolor.</div>
                </div>
            </div>
        </div>
    );
};

export default Room
