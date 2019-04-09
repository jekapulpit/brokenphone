import React from "react"
import PropTypes from "prop-types"
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../rooms/Menu";
import ActiveRoom from "../rooms/ActiveRoom";

class MainPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          activeRoom: props.rooms[0]
      };
      this.handleRoom = this.handleRoom.bind(this)
  }

  handleRoom = (roomId) => {
      fetch(`/api/v4/rooms/${roomId}`)
          .then((response) => {return response.json()})
          .then((data) => {this.setState({
              activeRoom: data.room
          })
       });
  };

    render () {
    return (
        <div className="content">
            <Menu handleRoom={this.handleRoom} rooms={this.props.rooms} dia1={this.props.dia1} avatar={this.props.avatar}/>
            <ActiveRoom
                        userId={this.props.userId}
                        room={this.state.activeRoom}
                        dia1={this.props.dia1}
                        avatar={this.props.avatar} />
        </div>
    );
  }
}

export default MainPage
