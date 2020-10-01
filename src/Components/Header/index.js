import React from "react";
import { connect } from "react-redux";
import { CurrencyOptions } from "../../Utils/Constants";
import ecosystem_logo from "../../images/ecosystem_logo.png";
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
    const {name,logo,brand} = this.props;
    let territory = brand.territory?brand.territory:"UK";
    return (
      <header id="page-header">
        <div className="content-header">
          <div className="heading">
            <button
              className="header-logo"
              style={{
                backgroundImage: `url(${name==="Ecosystem"?ecosystem_logo:logo})`,
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
            {this.props.totalsaving!==0 && <button type="button" className="btn saving">
            Monthly saving {CurrencyOptions[territory]}{this.props.totalsaving}
            </button>}
            {this.props.totalsaving===0 && this.props.firstname && <button type="button" className="btn" >
                  <i className="fas fa-user"></i>
                  <span className="badge badge-pill">{this.props.firstname}</span>
            </button>}
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
    totalsaving: state.totalsaving,
    brand:state.brand
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
