import React, { Component } from "react";

class YesNoButton extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        <div
          className={`message-item-wrapper`}
          onClick={() => this.props.setSelectedOption("Yes")}
        >
          <div className="message">Yes</div>
        </div>
        <div
          className={`message-item-wrapper`}
          onClick={() => this.props.setSelectedOption("No")}
        >
          <div className="message">No</div>
        </div>
      </div>
    );
  }
}

export default YesNoButton;
