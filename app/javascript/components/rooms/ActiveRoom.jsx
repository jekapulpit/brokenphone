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

  scrollToBottom() {
    const {thing} = this.refs;
    thing.scrollTop = thing.scrollHeight - thing.clientHeight;
  }

  componentDidMount(){
    fetch(`/api/v4/rooms/${this.props.room.id}`)
        .then((response) => {return response.json()})
        .then((data) => {this.setState({
            messages: data.messages,
            users: data.users
          })
        });
    let recv = this.handleReceive.bind(this);
    this.subscribe(recv);
    setTimeout(this.basicScroll, 500)
  }

  basicScroll = () => {
    let objDiv = document.getElementById('m-list');
    objDiv.scrollTop = 9999;
  };

  subscribe = (recv) => {
    App.rooms = App.cable.subscriptions.create("RoomsChannel", {
      connected: function() {
      },

      disconnected: function() {
        // Called when the subscription has been terminated by the server
      },

      received: recv,

      send_message: function (data) {
        return this.perform('send_message', data)
      }
    });
  };

  handleReceive = (data) => {
    this.setState({
      messages: this.state.messages.concat(data.message)
    });
    this.content.value = '';
    this.content.focus();
    this.scrollToBottom()
  };

  sendMessage = (message) => {
    App.rooms.send_message({message: message});
  };

  handleSend = (message) => {
    let body = JSON.stringify({
      recipient_id: this.props.room.id,
      content: message,
      sender_id: this.props.userId
    });
    fetch('http://localhost:3000/api/v4/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
        .then((data)=>{
          if(data.valid)
            this.sendMessage(data.message)
        })
  };


  render () {
    let messages = this.state.messages.map((message) => {
      return(<Message key={message.id} fromMe={message.sender_id !== this.props.userId} text={message.content} />)
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
            <div id="m-list" ref={`thing`} className="messages">
              {messages}
            </div>
            <div className="send-box">
              <div className="image" style={{ backgroundImage: "url(" + this.props.avatar + ")" }} />
              <input className="input" tabIndex="0" contentEditable="true" role="textbox" ref={input => this.content = input} aria-multiline="true" />
              <input onClick={() => this.handleSend(this.content.value)} type="submit" value="»" className="submit" />
            </div>
          </div>
        </div>
    );
  }
}

export default ActiveRoom
