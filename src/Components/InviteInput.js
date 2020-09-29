import React, { Component } from "react";
import ReactSelect from "react-select";
import { clearZero } from "../functions/Auth";
const countryCodeOptions = [
  { value: "+44", label: "+44" },
  { value: "+1", label: "+1" },
];

class InviteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      firstname:"",
      countryCode: { value: "+44", label: "+44" },
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
  handleCountryCode = (countryCode) => {
    this.setState({ countryCode });
  };
  render() {
    const { phone,firstname,countryCode } = this.state;
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
          <div className="message-input-container">
              <ReactSelect
                  value={countryCode}
                  onChange={this.handleCountryCode}
                  options={countryCodeOptions}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      backgroundColor: "white",
                      width: 80,
                      marginLeft: 10,
                    }),
                  }}
                />
                <input
                  type="text"
                  name="phone"
                  className="phone"
                  value={phone}
                  onChange = {this.onChange}
                />
          </div>
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
    let { firstname,phone } = this.state;
    let profile = {};
    profile.firstname = firstname;
    phone = clearZero(phone);
    profile.phone = this.state.countryCode.value + phone;
    addMessage(profile);
  }
}

export default InviteInput;
