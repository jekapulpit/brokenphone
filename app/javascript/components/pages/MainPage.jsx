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
          rooms: props.rooms,
          activeRoom: props.rooms[0],
          messages: [],
          users: []
      };
      this.handleRoom = this.handleRoom.bind(this)
      this.handleSend = this.handleSend.bind(this)
      this.basicScroll = this.basicScroll.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v4/rooms/${this.state.activeRoom.id}`)
      .then((response) => {return response.json()})
      .then((data) => {this.setState({
            messages: data.messages,
            users: data.users
        })
      });
    let recv = this.updateMessages.bind(this);
    this.subscribe(recv);
  }

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

  handleSend = (message) => {
    let body = JSON.stringify({
        recipient_id: this.state.activeRoom.id,
        recipient_type: "Room",
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
        .then((data) => {
            if(data.valid)
                this.sendMessage(data.message)
        })
  };

  updateMessages = (data) => {
    let newRoomsState = this.state.rooms.map((room) => {
        if(room.id === data.message.recipient_id) {
            room.last_message = data.message;
            return room;
        }
        else return room;
    });

    this.setState({
        rooms: newRoomsState
    });

    if(this.state.activeRoom.id === data.message.recipient_id){
        this.setState({
            messages: this.state.messages.concat(data.message)
        });
        this.basicScroll()
    }
  };

  sendMessage = (message) => {
    App.rooms.send_message({message: message});
  };

  basicScroll = () => {
     let objDiv = document.getElementById('m-list');
     objDiv.scrollTop = 9999;
  };

  handleRoom = (roomId) => {
    fetch(`/api/v4/rooms/${roomId}`)
      .then((response) => {return response.json()})
      .then((data) => {this.setState({
          activeRoom: data.room,
          messages: data.messages,
          users: data.users
        });
        this.basicScroll()
      });
  };

    render () {
    return (
        <div className="content">
            <Menu handleRoom={this.handleRoom} rooms={this.state.rooms} dia1={this.props.dia1} avatar={this.props.avatar}/>
            <ActiveRoom handleSend={this.handleSend}
                        userId={this.props.userId}
                        messages={this.state.messages}
                        room={this.state.activeRoom}
                        dia1={this.props.dia1}
                        avatar={this.props.avatar}
                        scrollToBottom={this.basicScroll}/>
        </div>
    );
  }
}

export default MainPage
