import React from "react"
import PropTypes from "prop-types"
import Message from "./Message";
class ActiveRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: []
    };
  }

  componentDidMount(){
    fetch(`/api/v4/rooms/${this.props.room.id}`)
        .then((response) => {return response.json()})
        .then((data) => {this.setState({
            messages: data.messages,
            users: data.users
          })
        });
  }

  render () {
    let messages = this.state.messages.map((message) => {
      return(<Message key={message.id} fromMe={message.sender_id == this.props.userId} text={message.content} />)
    });
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
              {messages}
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
