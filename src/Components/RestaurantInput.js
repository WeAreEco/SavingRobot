import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { animateScroll } from "react-scroll";
import Select from "react-select";
import ReactHtmlParser from "react-html-parser";
import Firebase from "../firebasehelper";
const Styles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: 300,
    marginBottom: 20,
  }),
};
export default class RestaurantInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      selectedOption: null,
      locations: props.locations,
      cuisines: props.cuisines,
      cuisine: "",
      location: "",
      show_card: false,
    };
  }

  handleChangeCuisine = (selecteditem) => {
    this.setState({ cuisine: selecteditem });
    Firebase.getLocationByCuisine(selecteditem.value, (res) => {
      let locations = res.map((item) => {
        return { value: item, label: item.location };
      });
      this.setState({ locations });
    });
  };
  onChangeLocation = (selecteditem) => {
    this.setState({ location: selecteditem });
  };
  chooseCuisine = () => {
    this.setState({ show_card: true });
    setTimeout(
      () =>
        animateScroll.scrollToBottom({
          duration: 500,
          smooth: "easeInOutQuad",
        }),
      200
    );
  };
  render() {
    const {
      isFocused,
      location,
      cuisine,
      locations,
      cuisines,
      show_card,
    } = this.state;
    const { isIphoneX, startBooking } = this.props;
    return (
      <Fragment>
        <div
          className="message-input-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "95%",
          }}
        >
          <p style={{ color: "black" }}>What would you like to eat?</p>
          <Select
            value={cuisine}
            onChange={this.handleChangeCuisine}
            options={cuisines}
            styles={Styles}
            placeholder="Cuisine"
            menuPlacement="bottom"
            onFocus={() => {
              this.setState(
                {
                  isFocused: true,
                },
                () => {
                  animateScroll.scrollToBottom({
                    duration: 500,
                    smooth: "easeInOutQuad",
                  });
                }
              );
            }}
            onBlur={() => {
              this.setState({
                isFocused: false,
              });
            }}
          />
          <p style={{ color: "black" }}>Where would you like to dine?</p>
          <Select
            value={location}
            onChange={this.onChangeLocation}
            options={locations}
            styles={Styles}
            placeholder="Location"
            menuPlacement="bottom"
            onFocus={() => {
              this.setState(
                {
                  isFocused: true,
                },
                () => {
                  animateScroll.scrollToBottom({
                    duration: 500,
                    smooth: "easeInOutQuad",
                  });
                }
              );
            }}
            onBlur={() => {
              this.setState({
                isFocused: false,
              });
            }}
          />
          <div
            className={`send-button`}
            onClick={(e) => {
              if (this.handleTouchStart) {
                setTimeout(() => {
                  this.handleTouchStart = false;
                }, 1000);
                e.preventDefault();
                return;
              }
              this.handleTouchStart = true;
              this.chooseCuisine();
            }}
          >
            <img
              src={require("../images/computer-icons-send.png")}
              alt="send-icon"
            />
          </div>
          {show_card && (
            <div
              className="cuisine-card"
              style={{ backgroundColor: location.value.background_colour }}
            >
              <div
                className="logo-part"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ color: location.value.text_colour }}>
                  {cuisine.label}
                </p>
                <img src={location.value.logo} width="80" alt="restaurant" />
              </div>
              <div
                style={{
                  width: "100%",
                  fontSize: 14,
                  lineHeight: 2.2,
                  color: location.value.text_colour,
                }}
              >
                {ReactHtmlParser(
                  `<b>Location</b>: ${location.value.location}<br><b>Tokens</b>: 20% cashback<br><b>Discount</b>: 10%<br><b>Upgrade</b>: Free glass of wine`
                )}
              </div>
              <div style={{ width: "100%", marginTop: 30 }}>
                <center>
                  <button
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      width: 100,
                      borderRadius: 5,
                    }}
                    onClick={() => startBooking(location.value)}
                  >
                    Book
                  </button>
                </center>
              </div>
            </div>
          )}
        </div>
        {isFocused && (
          <div
            style={{
              height: isIphoneX ? 350 : 300,
              backgroundColor: "#ffffff",
              marginLeft: -20,
              marginRight: -20,
            }}
          />
        )}
      </Fragment>
    );
  }
}
