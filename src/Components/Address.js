import React, { Component } from "react";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      name: "",
      city: "",
      postcode: "",
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  isFull = () => {
    const { number, name, city, postcode } = this.state;
    if (number && name && city && postcode) return true;
    else return false;
  };
  render() {
    const { number, name, city, postcode } = this.state;
    const { logo } = this.props;
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
        <div className="addressbox">
          <input
            name="number"
            className="address"
            placeholder="Street No"
            width="100%"
            value={number}
            onChange={this.onChange}
          />
          <input
            name="name"
            className="address"
            placeholder="Street Name"
            width="100%"
            value={name}
            onChange={this.onChange}
          />
          <input
            name="city"
            className="address"
            placeholder="City/Town"
            width="100%"
            value={city}
            onChange={this.onChange}
          />
          <input
            name="postcode"
            className="address"
            placeholder="PostCode"
            width="100%"
            value={postcode}
            onChange={this.onChange}
          />
        </div>
        <div
          className={`send-button ${this.isFull() ? "" : "disabled"} ${
            logo === "ecosystem" ? "" : "notbolt"
          }`}
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
  addMessage = () => {
    const { addMessage, message } = this.props;
    const { number, name, city, postcode } = this.state;
    const address = number + ", " + name + ", " + city + ", " + postcode;
    addMessage(address);
  };
}

export default Address;
