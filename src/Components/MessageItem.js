import React, { Component, Fragment } from "react";
import ReactHtmlParser from "react-html-parser";
import { animateScroll } from "react-scroll";
import Loader from "./Loader";

class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      user_img: require("../images/livechat/user.png")
    };
  }

  componentWillMount() {
    const { timeoutValue, message, logo } = this.props;
    const { type } = message;
    setTimeout(
      () => {
        if (type === "bot")
          animateScroll.scrollToBottom({
            duration: 0
          });
        this.setState({
          loaded: true
        });
      },
      type === "bot" ? timeoutValue : 0
    );
  }

  render() {
    const { firstChild, icon } = this.props;
    const { type, message,  } = this.props.message;
    const { loaded, user_img } = this.state;
    return (
      <div
        style={
          type === "bot"
            ? {
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }
            : {
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-end"
            }
        }
      >
        {type === "bot" && (
          <img
            src={icon}
            style={{ width: 40, height: 40 }}
            alt="concierge"
            className="avatar"
          />
        )}

        <div
          className={`message-item-wrapper ${loaded ? "loaded" : ""} ${type} ${
            firstChild ? "first-child" : ""
            }`}
        >
          <Loader />

          <div className="message">
            {ReactHtmlParser(message)}
          </div>
        </div>
        {type === "user" && (
          <img
            src={user_img}
            style={{ width: 40, height: 40 }}
            alt="concierge"
            className="avatar"
          />
        )}
      </div>
    );
  }
}

export default MessageItem;
