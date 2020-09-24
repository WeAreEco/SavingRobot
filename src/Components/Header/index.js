import React from "react";
import { connect } from "react-redux";
import logo from "../../images/ecosystem_logo.png";
import "./index.css";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
   
  }

  render() {
    return (
      <header id="page-header">
        <div className="content-header">
          <div className="heading">
            <button
              className="header-logo"
              style={{
                backgroundImage: `url(${logo})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                width: 180,
                height: 60,
              }}
            >
            </button> 
            {this.props.firstname && <div className="user_section">
                <button type="button" className="btn saving">
                    <span className="badge badge-pill">£{this.props.totalsaving}</span>
                </button>
                <button type="button" className="btn user" >
                  <i className="fas fa-user"></i>
                  <span className="badge badge-pill">{this.props.firstname}</span>
                </button>
            </div>}
            
          </div>
        </div>
      </header>
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
    firstname: state.firstname,
    totalsaving: state.totalsaving
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
