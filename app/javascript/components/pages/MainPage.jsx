import React from "react"
import PropTypes from "prop-types"
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../rooms/Menu";
import ActiveRoom from "../rooms/ActiveRoom";
import ActiveInvite from "../rooms/ActiveInvite";

class MainPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          rooms: props.rooms,
          invites: props.invites,
          newRoom: false,
          activeRoom: props.rooms[0],
          messages: [],
          users: []
      };
      this.handleRoom = this.handleRoom.bind(this);
      this.handleSend = this.handleSend.bind(this);
      this.basicScroll = this.basicScroll.bind(this);
      this.handleNew = this.handleNew.bind(this);
      this.handleCreateRoom = this.handleCreateRoom.bind(this);
      this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
      this.handleInvite = this.handleInvite.bind(this)
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

  handleNew = () => {
      this.setState({
          newRoom: true
      })
  };

  handleCreateRoom = (newRoomsName) => {
      let body = JSON.stringify({ room: { name: newRoomsName } });
      fetch('/api/v4/rooms', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body,
      }).then((response) => {return response.json()})
          .then((data)=>{
              if(data.valid)
                  this.addNewRoom(data.room)
          })
  };

  handleDeleteRoom = (roomId) => {
    fetch(`/api/v4/rooms/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {return response.json()})
      .then((data)=>{
        this.deleteRoom(roomId);
    });
  };

  deleteRoom = (roomId) => {
      let newRooms = this.state.rooms.filter((room) => room.id !== roomId);
      this.setState({
          rooms: newRooms,
      });
      this.handleRoom(newRooms[0].id)
  };

  addNewRoom = (room) => {
      this.setState({
          newRoom: false,
          rooms: this.state.rooms.concat(room)
      });
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

  handleSend = (message) => {
    let body = JSON.stringify({
        recipient_id: this.state.activeRoom.id,
        recipient_type: "Room",
        content: message,
        sender_id: this.props.userId
      });
    fetch('/api/v4/messages', {
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

  handleInvite = (inviteId) => {
     console.log('invite accepted');
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
    let activeItem = this.state.activeRoom.type === 'room' ?
        (<ActiveRoom    handleSend={this.handleSend}
                        handleDeleteRoom={this.handleDeleteRoom}
                        userId={this.props.userId}
                        messages={this.state.messages}
                        user={this.props.user}
                        allUsers={this.state.users}
                        room={this.state.activeRoom}
                        dia1={this.props.dia1}
                        avatar={this.props.avatar}
                        scrollToBottom={this.basicScroll}/>) :
        (<ActiveInvite  allUsers={this.state.users}
                        dia1={this.props.dia1}
                        avatar={this.props.avatar}
                        handleInvite={this.handleInvite}/>);
    return (
        <div className="content">
            <Menu       handleCreateRoom={this.handleCreateRoom}
                        handleNew={this.handleNew}
                        newRoom={this.state.newRoom}
                        user={this.props.user}
                        activeId={this.state.activeRoom.id}
                        handleRoom={this.handleRoom}
                        rooms={this.state.rooms}
                        invites={this.state.invites}
                        dia1={this.props.dia1}
                        avatar={this.props.avatar}/>
            {activeItem}
        </div>
    );
  }
}

export default MainPage
