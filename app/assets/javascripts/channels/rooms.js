App.rooms = App.cable.subscriptions.create("RoomsChannel", {
  connected: function() {
    console.log('client connected')
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    // Called when there's incoming data on the websocket for this channel
  },

  send_message: function (data) {
      this.perform('send_msg', data)
  }
});
