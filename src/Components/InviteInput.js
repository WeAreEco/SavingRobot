import React, { Component } from "react";

class InviteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      firstname:""
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  isFull = () => {
    const { phone,firstname } = this.state;
    if (phone && firstname) return true;
    else return false;
  };
  render() {
    const { phone,firstname } = this.state;
    return (
        <div
        className="message-input-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div className="invitationbox">
          <input
            name="firstname"
            placeholder="FirstName"
            width="100%"
            value={firstname}
            onChange={this.onChange}
          />
          <input
            name="phone"
            placeholder="+44"
            width="100%"
            value={phone}
            onChange={this.onChange}
          />
        </div>
        <div
          className={`send-button ${this.isFull() ? "" : "disabled"}`}
          onClick={(e) => {
            if (this.isFull()) {
              if (this.handleTouchStart) {
                setTimeout(() => {
                  this.handleTouchStart = false;
                }, 1000);
                e.preventDefault();
                return;
              }
              this.handleTouchStart = true;
              this.addMessage();
            } else alert("All fields are required");
          }}
        >
          <img
            src={require("../images/computer-icons-send.png")}
            alt="send-icon"
          />
        </div>
        </div>
    );
  }
  addMessage = ()=>{
    const { addMessage, message } = this.props;
    const { firstname,phone } = this.state;
    let profile = {};
    profile.firstname = firstname;
    profile.phone = phone;
    addMessage(profile);
  }
}

export default InviteInput;
