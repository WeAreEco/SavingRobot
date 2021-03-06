import Firebase from "../firebasehelper";

var getMonth = month => {
  switch (month) {
    case "01":
      return "January";
    case "02":
      return "February";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
    default:
      return "January";
  }
};

export const doSMS = async (phoneNumber, pin, brand) => {
  console.log("brand", brand);

  try {
    let url = "";
    url = `https://apricot-mole-2227.twil.io/sms?phoneNumber=${phoneNumber}&pin=${pin}&brand=${brand}`;
    let response = await fetch(url, {
      method: "GET"
    });
    let res = await response.json();
    return res;
  } catch (err) {
    return err;
  }
};
export const ticket_create_SMS = async (
  phoneNumber,
  username,
  ticket_name,
  brand_name
) => {
  try {
    let url = "";
    url = `https://apricot-mole-2227.twil.io/ticket_create?phoneNumber=${phoneNumber}&username=${username}&ticket_name=${ticket_name}&brand_name=${brand_name}`;
    let response = await fetch(url, {
      method: "GET"
    });
    let res = await response.json();
    return res;
  } catch (err) {
    return err;
  }
};
export const clearZero = function(str) {
  if (str.charAt(0) === "0") str = str.replace("0", "");
  return str;
};
export function isDateValidate(date) {
  if (
    date &&
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      date
    )
  )
    return true;
  else return false;
}

export async function getTicketNumber(name) {
  console.log("name", name);
  let category_id = await Firebase.getCategoryIDbyTitle(name);
  console.log("category_id", category_id);
  return category_id;
}
export const getStringfromSeconds = function(time) {
  var t = new Date(parseInt(time));
  var dd = String(t.getDate()).padStart(2, "0");
  var mm = String(t.getMonth() + 1).padStart(2, "0"); //January is 0!
  var month = getMonth(mm);
  t = dd + "th " + month;
  return t;
};
export const inviteFriend = async (
  firstName,
  otherName,
  brand,
  phoneNumber,
  bespokeUrl
) => {
  try {
    let url = "";
    url = `https://apricot-mole-2227.twil.io/invite-friend?phoneNumber=${phoneNumber}&firstName=${firstName}&brand=${brand}&otherName=${otherName}&bespokeUrl=${bespokeUrl}`;
    let response = await fetch(url, {
      method: "GET",
    });
    let res = await response.json();
    return res;
  } catch (err) {
    return err;
  }
};