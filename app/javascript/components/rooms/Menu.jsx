import React from "react"
import PropTypes from "prop-types"
import Concact from "./Concact";
import RoomsList from "./RoomsList";
class Menu extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    return (
        <div className="menu">
          <Concact avatar={this.props.avatar} />
          <h5>Свежие чаты:</h5>
          <RoomsList activeId={this.props.activeId} handleRoom={this.props.handleRoom} rooms={this.props.rooms} dia1={this.props.dia1}/>
        </div>
    );
  }
}

export default Menu
