import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Screen from "./Screen";
import { css } from "@emotion/core";

const isJSON = (str) => {
  if (
    /^[\],:{}\s]*$/.test(
      str
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const override = css`
  position: absolute;
  top: 48%;
  left: 48%;
  radius: 2px;
  height: 15px;
  width: 5px;
  display: block;
  margin: 0 auto;
  border-color: grey;
`;
const bolt_logo =
  "https://firebasestorage.googleapis.com/v0/b/boltconcierge-2f0f9.appspot.com/o/brand_logo%2FEcosystemDemo?alt=media&token=8c453fe7-95ac-4124-8e3a-a7d530db48cc";
const bolt_icon =
  "https://firebasestorage.googleapis.com/v0/b/aiconcierge.appspot.com/o/icons%2Fagency_logo.png?alt=media&token=3b61781e-1f2b-4136-b26d-2edbed2a6034";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      brands: [],
      fromMobile: false,
    };
  }
  componentDidMount() {
    //this.setState({ loading: true });
    //console.log("loading");
    // Firebase.getAllBrands((res) => {
    //   this.setState({ loading: false, brands: res });
    //   console.log("loaded");
    // });
    let self = this;
    document.addEventListener("message", function (event) {
      if (isJSON(event.data)) {
        let obj = JSON.parse(event.data);
        let fromMobile = obj.fromMobile;
        self.setState({ fromMobile });
      } else self.setState({ fromMobile: false });
    });
  }
  render() {
    const { loading, brands, fromMobile } = this.state;
    console.log("App Render-------------");
    return (
      <Fragment>
        <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          loading={loading}
        />

        {!loading && (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Screen
                  {...props}
                  name="Ecosystem"
                  logo={bolt_logo}
                  icon={bolt_icon}
                />
              )}
            />
            {/* {brands.map((item, index) => {
              const { logo, name, icon } = item;
              let brand = name.replace(/\s/g, "");
              let path = "/" + brand;
              return (
                <Route
                  path={path}
                  key={index}
                  render={(props) => (
                    <Screen
                      {...props}
                      name={name}
                      logo={logo}
                      icon={icon}
                      fromMobile={fromMobile}
                    />
                  )}
                />
              );
            })} */}
          </Switch>
        )}
      </Fragment>
    );
  }
}

export default App;
