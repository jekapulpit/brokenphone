import React from "react"
import PropTypes from "prop-types"
import Room from "./Room";
class RoomsList extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    let rooms = this.props.rooms.map((room) => {
       return (  <Room active={this.props.activeId === room.id} room={room} handleRoom={this.props.handleRoom} key={room.id} dia1={this.props.dia1} />  )
    });
    return (
        <div className="dialogs">
            {rooms}
        </div>
    );
  }
}

export default RoomsList
