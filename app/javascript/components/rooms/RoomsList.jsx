import React from "react"
import PropTypes from "prop-types"
import Room from "./Room";
class RoomsList extends React.Component {

  constructor(props) {
    super(props)
  }

  render () {
    return (
        <div className="dialogs">
          <Room dia1={this.props.dia1} />
        </div>
    );
  }
}

export default RoomsList
