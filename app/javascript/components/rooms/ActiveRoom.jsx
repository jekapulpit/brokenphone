import React from "react"
import PropTypes from "prop-types"
import Message from "./Message";
class ActiveRoom extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    setTimeout(this.basicScroll, 500)
  }

  basicScroll = () => {
    let objDiv = document.getElementById('m-list');
    objDiv.scrollTop = 9999;
  };


  handleSend = (data) => {
    this.content.value = '';
    this.content.focus();
    if (data.replace(/^\s+|\s+$/g, ''))
      this.props.handleSend(data);
  };

  render () {
    let messages = this.props.messages.map((message) => {
      return(<Message sender={message.senders_name} key={message.id} fromMe={message.sender_id !== this.props.userId} sended={message.created_at} text={message.content} />)
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
