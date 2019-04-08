
App.rooms = App.cable.subscriptions.create("RoomsChannel", {
    connected: function() {
    },

    disconnected: function() {
        // Called when the subscription has been terminated by the server
    },

    received: function(data) {
        console.log(data.message);
    },

    send_message: function (data) {
        return this.perform('send_message', data)
    }
});
