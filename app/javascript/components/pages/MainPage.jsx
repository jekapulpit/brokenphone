import React from "react"
import PropTypes from "prop-types"
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../rooms/Menu";
import ActiveRoom from "../rooms/ActiveRoom";
import ActiveInvite from "../rooms/ActiveInvite";
import SearchWindow from "../search/SearchWindow";
import EmptyRoom from "../rooms/EmptyRoom";

class MainPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          rooms: props.rooms.sort(function(a,b){
              try {
                return new Date(b.last_message.created_at) - new Date(a.last_message.created_at);
              }
              catch {
                  return 1;
              }
          }),
          invites: props.invites,
          newRoom: false,
          activeRoom: { id: null },
          messages: [],
          users: [],
          searchResults: [],
          searching: false,
      };
      this.handleRoom = this.handleRoom.bind(this);
      this.handleSend = this.handleSend.bind(this);
      this.basicScroll = this.basicScroll.bind(this);
      this.handleNew = this.handleNew.bind(this);
      this.handleCreateRoom = this.handleCreateRoom.bind(this);
      this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
      this.handleInvite = this.handleInvite.bind(this);
      this.handleAcceptInvite = this.handleAcceptInvite.bind(this);
      this.handleRejectInvite = this.handleRejectInvite.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.toggleSearch = this.toggleSearch.bind(this);
      this.inviteUser = this.inviteUser.bind(this);
      this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
  }

  componentDidMount(){
    if(this.state.activeRoom.type) {
        fetch(`/api/v4/rooms/${this.state.activeRoom.id}`)
            .then((response) => {return response.json()})
            .then((data) => {this.setState({
                messages: data.messages,
                users: data.users,
            })
        });
    }
    let recv = this.updateState.bind(this);
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
        this.sendNotice(data, 'left');
        this.sendAnswer(null, data.user, true, data.destroyed);
      });
  };

  deleteRoom = (roomId) => {
      let newRooms = this.state.rooms.filter((room) => room.id !== roomId);
      this.setState({
          rooms: newRooms,
      });
      this.handleRoom(newRooms[0].id)
  };

  handleDeleteMessage = (messageId) => {
      fetch(`/api/v4/messages/${messageId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then((response) => {return response.json()})
          .then((data)=>{
              this.deleteMessage({ deletedMessageId: messageId, newLastMessage: data.new_last_message, newRoomId: this.state.activeRoom.id });
          });
  };

  deleteMessage = (data) => {
      App.rooms.delete_message(data);
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

        },

        received: recv,

        send_message: function (data) {
          return this.perform('send_message', data)
        },

        send_invite: function (data) {
            return this.perform('send_invite', data)
        },

        update_invite: function (data) {
            return this.perform('update_invite', data)
        },

        delete_message: function (data) {
            return this.perform('delete_message', data)
        },
    });
  };

  handleReadAll = (roomId) => {
      fetch(`/api/v4/rooms/unreaded/${roomId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then((response) => {return response.json()})
          .then((data) => {
              if(data.readed)
                  this.readAll(roomId)
          })
  };

  handleSend = (message) => {
    let body = JSON.stringify({
        message: {
            recipient_id: this.state.activeRoom.id,
            recipient_type: "Room",
            content: message,
            sender_id: this.props.userId,
            sender_type: "User"
        }
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

  updateState = (data) => {
    if (data.message) {
        let newRoomsState = this.state.rooms.map((room) => {
            if(room.id === data.message.recipient_id) {
                room.last_message = data.message;
                return room;
            }
            else return room;
        });

        this.setState({
            rooms: newRoomsState.sort(function(a,b){
                try {
                    return new Date(b.last_message.created_at) - new Date(a.last_message.created_at);
                }
                catch {
                    return 1;
                }
            })
        });
        if(this.state.activeRoom.id === data.message.recipient_id){
            this.setState({
                messages: this.state.messages.concat(data.message)
            });
            this.basicScroll();
            this.handleReadAll(data.message.recipient_id)
        }
        else
            this.incrementUnreaded(data.message.recipient_id);
    }
    if (data.invite && data.invite.user_id === this.props.user.id) {
        this.setState({
            invites: this.state.invites.concat(data.invite)
        });
    }
    if (data.user && !data.destroyed) {
        let newResults = this.state.searchResults.map((result) => {
            if(result.id === data.user.id)
                result.invited = {status: data.accepted ? 'accepted' : 'rejected'};
            return result
        });
        this.setState({
            searchResults: newResults
        })
    }
    if (data.destroyed) {
        let newResults = this.state.searchResults.map((result) => {
            if(result.id === data.user.id) {
                result.invited = null;
                result.accepted = false;
            }
            return result
        });
        this.setState({
            searchResults: newResults
        })
    }
    if (data.deletedMessageId) {
        let newMessages = this.state.messages.filter((message) => message.id !== data.deletedMessageId );
        let newRoomsState = this.state.rooms.map((room) => {
            if(room.id === data.newRoomId) {
                room.last_message = data.newLastMessage;
                return room;
            }
            else return room;
        });
        this.setState({
            messages: newMessages,
            rooms: newRoomsState
        });
    }
  };

  sendInvite = (invite) => {
      App.rooms.send_invite({invite: invite});
  };

  sendMessage = (message) => {
    App.rooms.send_message({message: message});
  };

  basicScroll = () => {
     let objDiv = document.getElementById('m-list');
     objDiv.scrollTop = 9999;
  };

  handleInvite = (inviteId) => {
      fetch(`/api/v4/invites/${inviteId}`)
          .then((response) => {return response.json()})
          .then((data) => {this.setState({
                  activeRoom: data.invite,
                  messages: [],
                  users: data.users
              });
          });
  };

  sendNotice = (data, status, roomId = this.state.activeRoom.id) => {
      let content;
      switch (status) {
          case 'invited':
              content = `${this.props.user.full_name || this.props.user.email} invited ${data.invite.recipient.full_name || data.invite.recipient.email} to this chat`;
              break;
          case 'joined':
              content = `${data.user.full_name || data.user.email} joined to this chat`;
              roomId = data.room.id;
              break;
          case 'left':
              content = `${data.user.full_name || data.user.email} left from this chat`;
              break;
          case 'rejected':
              content = `${data.user.full_name || data.user.email} rejected invite`;
              break;
          default:
              content = 'ogo';
      }
      let body = JSON.stringify({
          message: {
              recipient_id: roomId,
              recipient_type: "Room",
              content: content,
              sender_id: roomId,
              sender_type: "Room"
          }
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

  incrementUnreaded = (roomId) => {
      let newRoomsState = this.state.rooms.map((room) => {
          if(room.id === roomId) {
              room.unreaded_number = room.unreaded_number + 1;
              return room;
          }
          else return room;
      });
      this.setState({
          rooms: newRoomsState
      })
  };

  readAll = (roomId) => {
      let newRoomsState = this.state.rooms.map((room) => {
          if(room.id === roomId) {
              room.unreaded_number = 0;
              return room;
          }
          else return room;
      });
      this.setState({
          rooms: newRoomsState
      })
  };

  handleRoom = (roomId) => {
    fetch(`/api/v4/rooms/${roomId}`)
      .then((response) => {return response.json()})
      .then((data) => {this.setState({
          activeRoom: data.room,
          messages: data.messages,
          users: data.users,
          searchResults: [],
        });
        this.basicScroll();
        this.handleReadAll(roomId)
      });
  };

  handleAcceptInvite = (inviteId) => {
      fetch(`/api/v4/invites/accept/${inviteId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then((response) => {return response.json()})
          .then((data)=>{
              if(data.accepted) {
                  this.addNewRoom(data.room);
                  this.handleRoom(data.room.id);
                  this.sendAnswer(data.invite, data.user, true);
                  this.sendNotice(data, 'joined');
              }
          })
          .then(() => this.removeInvite(inviteId))
  };

  handleRejectInvite = (inviteId) => {
      fetch(`/api/v4/invites/reject/${inviteId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then((response) => {return response.json()})
          .then((data)=>{
              if(!data.rejected) {
                  this.sendAnswer(data.invite, data.user, false);
                  this.sendNotice(data, 'rejected', data.room.id);
                  this.setState({
                     activeRoom:  { id: null },
                     messages: [],
                     users: []
                  });
              }
          })
          .then(() => this.removeInvite(inviteId))
  };

  sendAnswer = (invite, user, accepted, destroyed = false) => {
      App.rooms.update_invite({invite: invite, user: user, accepted: accepted, destroyed: destroyed});
  };

  inviteUser = (userId, content = 'hey! We need to talk') => {
      let body = JSON.stringify({ invite: {room_id: this.state.activeRoom.id, user_id: userId, content: content} });
      fetch('/api/v4/invite/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body,
      }).then((response) => {return response.json()})
          .then((data)=>{
              if(data.created) {
                  this.updateResults(userId);
                  this.sendInvite(data.invite);
                  this.sendNotice(data, 'invited');
              }
          })
  };

  updateResults = (userId) => {
      let newResults = this.state.searchResults.map((result) => {
          if(result.id === userId)
              result.invited = { status: 'sended' };
          return result
      });
      this.setState({
          searchResults: newResults
      })
  };

  removeInvite = (inviteId) => {
      let newInvites = this.state.invites.filter((invite) => invite.id !== inviteId);
      this.setState({
          invites: newInvites
      })
  };

  handleSearch = (request) => {
      fetch(`/api/v4/users/search/?request=${request}&room_id=${this.state.activeRoom.id}`)
          .then((response) => {return response.json()})
              .then((data) => {
                  this.setState({
                      searchResults: data.results,
                  })
          });
  };

  toggleSearch = () => {
      this.setState({
          searching: !this.state.searching
      })
  };

  render () {
    let activeItem = <EmptyRoom />;
    if(this.state.activeRoom.type) {
        activeItem = this.state.activeRoom.type === 'room' ?
            (<ActiveRoom    handleSend={this.handleSend}
                            handleDeleteRoom={this.handleDeleteRoom}
                            handleDeleteMessage={this.handleDeleteMessage}
                            userId={this.props.userId}
                            toggleSearch={this.toggleSearch}
                            messages={this.state.messages}
                            user={this.props.user}
                            allUsers={this.state.users}
                            room={this.state.activeRoom}
                            dia1={this.props.dia1}
                            avatar={this.props.avatar}
                            scrollToBottom={this.basicScroll}/>) :
            (<ActiveInvite  allUsers={this.state.users}
                            dia1={this.props.dia1}
                            invite={this.state.activeRoom}
                            acceptInvite={this.handleAcceptInvite}
                            rejectInvite={this.handleRejectInvite}
                            avatar={this.props.avatar}
            />);
    }
    return (
        <div className="content">
            <Menu       handleCreateRoom={this.handleCreateRoom}
                        handleNew={this.handleNew}
                        newRoom={this.state.newRoom}
                        user={this.props.user}
                        activeId={this.state.activeRoom.id}
                        activeType={this.state.activeRoom.type}
                        handleInvite={this.handleInvite}
                        handleRoom={this.handleRoom}
                        rooms={this.state.rooms}
                        invites={this.state.invites}
                        dia1={this.props.dia1}
                        avatar={this.props.avatar}/>
            {activeItem}
            <SearchWindow handleSearch={this.handleSearch}
                          toggleSearch={this.toggleSearch}
                          inviteUser={this.inviteUser}
                          searchResults={this.state.searchResults}
                          visible={this.state.searching} />
        </div>
    );
  }
}

export default MainPage
