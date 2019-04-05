import React from "react"
import PropTypes from "prop-types"
import Message from "./Message";
class ActiveRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    fetch('/api/v4/technologies')
        .then((response) => {return response.json()})
        .then((data) => {this.setState({
          technologies: data.technologies,
          totalPages: data.totalPages,
          loading: false })
        });
  }

  render () {
    return (
        <div className="talk talk-active">
          <div className="message-box">
            <div className="partner">
              <div className="image" style={{ backgroundImage: "url(" + this.props.dia1 + ")" }}>
                <div className="name">AW</div>
              </div>
              <div className="name">
                <div>Anna Wrote</div>
                <div className="timeout">была в сети 5 минут назад</div>
              </div>
            </div>
            <div className="messages">
              <Message fromMe={false} text={"provet"} />
              <Message fromMe={true} text={"poka"}/>
            </div>
            <div className="send-box">
              <div className="image" style={{ backgroundImage: "url(" + this.props.avatar + ")" }} />
              <div className="input" tabIndex="0" contentEditable="true" role="textbox" aria-multiline="true" />
              <input type="submit" value="»" className="submit" />
            </div>
          </div>
        </div>
    );
  }
}

export default ActiveRoom
