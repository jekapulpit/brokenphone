import React from "react"
import PropTypes from "prop-types"
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../rooms/Menu";
import ActiveRoom from "../rooms/ActiveRoom";
class MainPage extends React.Component {

  constructor(props) {
      super(props)
  }

  render () {
    return (
        <div className="content">
            <Menu dia1={this.props.dia1} avatar={this.props.avatar}/>
            <ActiveRoom dia1={this.props.dia1} avatar={this.props.avatar} />
        </div>
    );
  }
}

export default MainPage
