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
          room: props.room
      };
  }

  render () {
    return (
        <div className="content">
            <Menu dia1={this.props.dia1} avatar={this.props.avatar}/>
            <ActiveRoom userId={this.props.userId} room={this.state.room} dia1={this.props.dia1} avatar={this.props.avatar} />
        </div>
    );
  }
}

export default MainPage
