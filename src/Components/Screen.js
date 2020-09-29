import React, { Component } from "react";
import MessageList from "./MessageList";
import { connect } from "react-redux";
import { saveRetailers,saveBrand } from "../redux/actions";
import Firebase from "../firebasehelper";
import { FadeLoader } from "react-spinners";
import Header from "./Header";
import { css } from "@emotion/core";

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


class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restart: false,
      loading: false,
      background: "#fff",
      services_routing: [],
    };
  }
  async componentDidMount() {
    const { name, icon } = this.props;
    document.title = name;
    let link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = icon;
    document.getElementsByTagName("head")[0].appendChild(link);
    Firebase.getAllRetailers((res) => {
      const retailers = res || [];
      Firebase.getAllDeactiveRetailers((res) => {
        let deactive = [];
        if (res) deactive = res;
        let result = {};
        result.all = retailers;
        result.deactive = deactive;
        console.log("retailers",retailers);
        console.log("deactive",deactive);
        this.props.dispatch(saveRetailers(result));
      });
    });
    Firebase.getBrandDataByName(name).then(res=>{
        this.props.dispatch(saveBrand(res));
    })
  }
  render() {
    const {
      uid,
      profile,
      restart,
      loading,
    } = this.state;
    const { name, icon, logo } = this.props;
    return (
      <div>
      <Header name={name} logo={logo}></Header>
      <div className="app-wrapper"> 
        <div style={{height:70}}></div>
        {loading && (
          <FadeLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            loading={loading}
          />
        )}
        {!loading &&(
          <MessageList
            {...this.props}
            logo={name}
            icon={icon}
            restart={restart}
            uid={uid}
            profile={profile}
          />
        )}
      </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
function mapStateToProps(state) {
  return {
    uid: state.uid,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Screen);