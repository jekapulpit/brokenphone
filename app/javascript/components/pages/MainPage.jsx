import React from "react"
import PropTypes from "prop-types"
import Header from "../Header";
import Footer from "../Footer";
class MainPage extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header/>
          some content here
        <Footer/>
      </React.Fragment>
    );
  }
}

export default MainPage
