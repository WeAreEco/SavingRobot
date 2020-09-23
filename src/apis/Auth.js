const axios = require("axios");
const wpp_token = "2OXq8tstpZ";
export const signUp = async (
  firstname,
  lastname,
  email,
  password,
  postcode,
  number,
  street,
  city,
  phone,
  dob,
  avatar,
  access_token
) => {
  try {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let token = "Bearer " + access_token;
    const body = JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      phone: phone,
      dob: dob,
      avatar: avatar
    });
    console.log("body", body);
    return fetch(
      proxyurl +
        "https://pin--dev.my.salesforce.com/services/apexrest/v2/CreateUser",
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        body: body
      }
    ).then(res => res.json());

    //let json = await res.json();
    // return json;
  } catch (err) {
    console.log("error_api", err);
    //console.log("error", err);
    return err;
  }
};
export const logIn = async (
  response_type,
  client_id,
  redirect_uri,
  scope,
  display
) => {
  try {
    console.log("response_type", response_type);
    console.log("client_id", client_id);
    console.log("redirect_uri", redirect_uri);
    console.log("scope", scope);
    console.log("display", display);
    return fetch(
      `https://dev-pin.cs106.force.com/members/services/oauth2/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&display=${display}`,
      {
        method: "get"
      }
    );
  } catch (err) {
    return err;
  }
};
export const getWPP = async () => {
  try {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return fetch("http://boltlabs.worldprivilegeplus.com/api/get-merchants", {
      method: "GET",
      headers: {
        Authorization: wpp_token,
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log("res of api call", res);
      res.json();
      console.log("res.json", res.json());
    });

    //let json = await res.json();
    // return json;
  } catch (err) {
    console.log("error_api", err);
    //console.log("error", err);
    return err;
  }
};
export const get_WPP = () => {
  let result = axios.post(
    "https://us-central1-boltconcierge-2f0f9.cloudfunctions.net/WPP"
  );

  let res = result;
  return res;
};
