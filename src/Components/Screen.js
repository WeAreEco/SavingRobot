import React, { Component } from "react";
import MessageList from "./MessageList";
import { connect } from "react-redux";
import { saveRetailers,saveBrand } from "../redux/actions";
import Firebase from "../firebasehelper";
import { FadeLoader } from "react-spinners";
import Header from "./Header";
import { css } from "@emotion/core";
import { parse } from "date-fns";

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
      loading: true,
      background: "#fff",
      services_routing: [],
    };
  }
  async componentDidMount() {
    const { name, icon } = this.props;
    const parsed = new URLSearchParams(this.props.location.search);
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
        this.props.dispatch(saveRetailers(result));
      });
    });
    Firebase.getBrandDataByName(name).then(res=>{
        console.log("brand_data",res);
        this.props.dispatch(saveBrand(res));
    })
    const parsed_uid = parsed.get("uid");
    const parsed_iframe = parsed.get("iframe") || false;
    this.setState({from_iframe:parsed_iframe});
    if (parsed_uid) {
      let res = await Firebase.getProfileByUID(parsed_uid, name);
      res.id = parsed_uid;
      let token_history = await Firebase.getTokenHistory(name,parsed_uid)
      if (res) {
        const { eco_id } = res;
        res.token_history = token_history;
        if (eco_id) {
          let eco_data = await Firebase.getEcoUserbyId(eco_id);
          res = { ...res, ...eco_data };
        }

        this.setState({
          profile: res,
          uid: parsed_uid,
          restart: true,
          loading: false,
        });
       
      } else {
        alert("User is not existing.");
        this.setState({ loading: false });
        return;
      }
    }
    else{
      this.setState({ loading: false });
    }
  }
  render() {
    const {
      uid,
      profile,
      restart,
      loading,
      from_iframe
    } = this.state;
    const { name, icon, logo } = this.props;
    return (
      <div>
      {!from_iframe&&<Header name={name} logo={logo}></Header>}
      <div className="app-wrapper"> 
        {!from_iframe&&<div style={{height:90}}></div>}
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
            from_iframe={from_iframe}
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