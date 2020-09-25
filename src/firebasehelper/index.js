import * as firebase from "firebase";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBlBJtz1oV7_pWAyjrlkxdJ7ZenisHP5sk",
  projectId: "boltconcierge-2f0f9",
  databaseURL: "https://boltconcierge-2f0f9.firebaseio.com",
  storageBucket: "boltconcierge-2f0f9.appspot.com",
};
function filterArrayByKey(arr, key) {
  var a = arr.reduce(function (accumulator, current) {
    if (checkIfAlreadyExist(current)) {
      return accumulator;
    } else {
      return accumulator.concat([current]);
    }
    function checkIfAlreadyExist(currentVal) {
      return accumulator.some(function (item) {
        return item[key] === currentVal[key];
      });
    }
  }, []);
  return a;
}
class Firebase {
  static initialize() {
    firebase.initializeApp(firebaseConfig);
  }
  //
  static storage() {
    return firebase.storage();
  }
  static getStorage() {
    return firebase.storage;
  }
  static getAllBrands = (callback) => {
    console.log("getAllBrands");
    let path = "brands";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        var res = [];
        if (snapshot.val()) {
          res = snapshot.val();
        }
        callback(res);
      });
  };
  static getTop10Perks = (callback) => {
    let path = "offers/top_10perks";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        let result = [];
        if (snapshot.val()) {
          result = snapshot.val();
        }
        let res = Object.values(result);
        callback(res);
      });
  };
  static getAllOffers = (callback) => {
    let path = "offers/redeem_offers";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        let result = [];
        result = snapshot.val();
        let res = Object.values(result);
        callback(res);
      });
  };
  static getAllRetailers(callback) {
    let path = "retailers/all";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        callback(snapshot.val());
      });
  }
  static getRetailerById(retailerId, callback) {
    let path = `retailers/all/${retailerId}`;
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        callback(snapshot.val());
      });
  }
  static getAllTokens(callback) {
    let path = "retailers/tokens";
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .on("value", (snapshot) => {
          resolve(snapshot.val());
        });
    });
  }
  static getAllDeactiveRetailers = (callback) => {
    let path = "retailers/deactive";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        let result = [];
        if (snapshot.val()) result = snapshot.val();
        callback(result);
      });
  };
  static getAllDeactiveOffers = (callback) => {
    let path = "offers/deactive_offers";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        let result = [];
        if (snapshot.val()) result = snapshot.val();
        console.log("result", result);
        callback(result);
      });
  };
  static getAllTicketsById(user_id, callback) {
    let path = "livechat/" + user_id + "/tickets";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        var res = [];
        if (snapshot.val()) {
          res = snapshot.val();
        }
        callback(res);
      });
  }
  static getServicesRouting = (brand_name, callback) => {
    let path = "brands";
    firebase
      .database()
      .ref(path)
      .orderByChild("name")
      .equalTo(brand_name)
      .on("value", (snapshot) => {
        let result = [];
        result = snapshot.val();
        let res = Object.values(result)[0];
        callback(res.services_routing);
      });
  };
  static getTier1byID = (tier1_id) => {
    let path = "tier1/" + tier1_id;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .once("value", (snapshot) => {
          let result = snapshot.val();
          resolve(result);
        });
    });
  };
  static getCategorybyID = (category_id) => {
    let path = "categories/" + category_id;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .once("value", (snapshot) => {
          let result = snapshot.val();
          resolve(result);
        });
    });
  };
  static getCategoryIDbyTitle = (title) => {
    let path = "categories";
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .orderByChild("topic")
        .equalTo(title)
        .once("value", (snapshot) => {
          let res = [];
          if (snapshot.val()) {
            res = Object.keys(snapshot.val());
          }

          console.log("result in ques", res);
          if (res.length > 0) resolve(res[0]);
          else resolve(false);
        });
    });
  };
  static addFriend = (firstname, phonenumber, brand) => {
    console.log("brand_name",brand);
    console.log("firstname",firstname);
    console.log("phonenumber",phonenumber);
    return new Promise((resolve, reject) => {
      if (brand !== "Ecosystem") {
        firebase
          .firestore()
          .collection(`${brand}`)
          .doc("data")
          .collection("user")
          .where("phonenumber", "==", phonenumber)
          .get()
          .then((snapshot) => {
            if (!snapshot.size) {
              firebase
                .firestore()
                .collection(`${brand}`)
                .doc("data")
                .collection("user")
                .add({
                  firstname,
                  phonenumber,
                  tokens: 300,
                })
                .then((user) => {
                  resolve(user);
                })
                .catch(() => {
                  reject(null);
                });
            } else resolve(null);
          })
          .catch(() => {
            reject(null);
          });
      } else {
        console.log("I am in");
        firebase
          .firestore()
          .collection(`user`)
          .where("phonenumber", "==", phonenumber)
          .get()
          .then((snapshot) => {
            if (!snapshot.size) {
              firebase
                .firestore()
                .collection(`user`)
                .add({
                  firstname,
                  phonenumber,
                  tokens: 300,
                })
                .then((user) => {
                  resolve(user);
                })
                .catch((error) => {
                  reject(error);
                });
            } else reject(null);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };
  static updateUserById(uid, brand, data) {
    return new Promise((resolve, reject) => {
      let fbInstance;
      if (brand === "Ecosystem") {
        fbInstance = firebase.firestore().collection("user");
      } else {
        fbInstance = firebase
          .firestore()
          .collection(brand)
          .doc("data")
          .collection("user");
      }
      fbInstance.doc(`${uid}`).set(data, { merge: true });
    });
  }
  static saveTokenHistory = (brand_name, uid, data) => {
    return new Promise((resolve, reject) => {
      let fbInstance;
      if (brand_name === "Ecosystem") {
        fbInstance = firebase.firestore().collection("user");
      } else {
        fbInstance = firebase
          .firestore()
          .collection(brand_name)
          .doc("data")
          .collection("user");
      }

      fbInstance
        .doc(`${uid}`)
        .collection("token_history")
        .add(data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static signup = (profile, brand) => {
    const { phonenumber } = profile;
    return new Promise((resolve, reject) => {
      if (brand !== "Ecosystem") {
        firebase
          .firestore()
          .collection(`${brand}`)
          .doc("data")
          .collection("user")
          .where("phonenumber", "==", phonenumber)
          .get()
          .then((snapshot) => {
            if (!snapshot.size) {
              firebase
                .firestore()
                .collection(`${brand}`)
                .doc("data")
                .collection("user")
                .add(profile)
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => {
                  reject(err);
                });
            } else resolve(false);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        firebase
          .firestore()
          .collection(`user`)
          .where("phonenumber", "==", phonenumber)
          .get()
          .then((snapshot) => {
            if (!snapshot.size) {
              firebase
                .firestore()
                .collection("user")
                .add(profile)
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => {
                  reject(err);
                });
            } else resolve(false);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };
  static getProfile = (phonenumber, brand) => {
    return new Promise((resolve, reject) => {
      if (brand !== "Ecosystem") {
        console.log("phonenumber", phonenumber);
        console.log("brand", brand);
        firebase
          .firestore()
          .collection(`${brand}`)
          .doc("data")
          .collection("user")
          .where("phonenumber", "==", phonenumber)
          .limit(1)
          .get()
          .then((res) => {
            if (res.size === 0) resolve(false);
            else resolve(res.docs[0]);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        firebase
          .firestore()
          .collection(`user`)
          .where("phonenumber", "==", phonenumber)
          .limit(1)
          .get()
          .then((res) => {
            if (res.size === 0) resolve(false);
            else resolve(res.docs[0]);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };
  static getProfileByUID = (uid, brand) => {
    console.log("uid", uid);
    console.log("brand", brand);
    return new Promise((resolve, reject) => {
      if (brand !== "Ecosystem") {
        firebase
          .firestore()
          .collection(`${brand}`)
          .doc("data")
          .collection("user")
          .doc(uid)
          .get()
          .then((res) => {
            if (res.data()) resolve(res.data());
            else resolve(false);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        firebase
          .firestore()
          .collection(`user`)
          .doc(uid)
          .get()
          .then((res) => {
            if (res.data()) resolve(res.data());
            else resolve(false);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };
  static findAnswer = (item, room, adjective, callback) => {
    let path = "chatbot/quez";
    firebase
      .database()
      .ref(path)
      .orderByChild("item_room_adjective")
      .equalTo(item + "_" + room + "_" + adjective)
      .once("value", (snapshot) => {
        let res = [];
        if (snapshot.val()) {
          res = Object.values(snapshot.val());
        }
        console.log("result in ques", res);
        if (!res.length) {
          firebase
            .database()
            .ref(path)
            .orderByChild("item_room_adjective")
            .equalTo(item + "__" + adjective)
            .once("value", (snapshot) => {
              let result = [];
              if (snapshot.val()) {
                result = Object.values(snapshot.val());
                const ticket = result[0].ticket;
                let sub_path = "chatbot/answers";
                firebase
                  .database()
                  .ref(sub_path)
                  .orderByChild("ticket")
                  .equalTo(ticket)
                  .once("value", (snapshot) => {
                    let result = [];
                    result = Object.values(snapshot.val());
                    callback(result[0]);
                  });
              }
            });
        } else {
          const ticket = res[0].ticket;
          let sub_path = "chatbot/answers";
          firebase
            .database()
            .ref(sub_path)
            .orderByChild("ticket")
            .equalTo(ticket)
            .once("value", (snapshot) => {
              let result = [];
              result = Object.values(snapshot.val());
              callback(result[0]);
            });
        }
      });
  };
  static getAllItem(callback) {
    console.log("getAllItem");
    let path = "chatbot/quez";
    firebase
      .database()
      .ref(path)
      .once("value", (snapshot) => {
        var res = [];

        if (snapshot.val()) {
          res = snapshot.val();
        }
        var a = filterArrayByKey(res, "item");
        let result = a.map((item) => item.item);
        callback(result);
      });
  }
  static getAllRoom(callback) {
    console.log("getAllRoom");
    let path = "chatbot/rooms";
    firebase
      .database()
      .ref(path)
      .once("value", (snapshot) => {
        var res = [];

        if (snapshot.val()) {
          res = snapshot.val();
        }
        callback(res);
      });
  }
  static getAllAdjective(callback) {
    console.log("getAllAdjective");
    let path = "chatbot/quez";
    firebase
      .database()
      .ref(path)
      .once("value", (snapshot) => {
        var res = [];

        if (snapshot.val()) {
          res = snapshot.val();
        }
        var a = filterArrayByKey(res, "adjective");
        let result = a.map((item) => item.adjective);
        callback(result);
      });
  }
  static getAllWellness(callback) {
    console.log("getAllWellness");
    let path = "wellness_tickets";
    firebase
      .database()
      .ref(path)
      .once("value", (snapshot) => {
        var res = [];

        if (snapshot.val()) {
          res = snapshot.val();
        }

        callback(res);
      });
  }
  static getRoomByItem(item, callback) {
    let path = "chatbot/quez";
    firebase
      .database()
      .ref(path)
      .orderByChild("item")
      .equalTo(item)
      .once("value", (snapshot) => {
        let res = [];
        if (snapshot.val()) res = snapshot.val();
        res = Object.values(res);
        console.log("result before filter", res);
        var adjective = res.map((item) => {
          return { value: item.adjective, label: item.adjective.toLowerCase() };
        });
        console.log("adjectives array", adjective);
        if (!res.pop().room) callback(null, adjective);
        else {
          var a = filterArrayByKey(res, "room");
          let result = a.map((item) => item.room);
          callback(result, adjective);
        }
      });
  }
  static getLocationByCuisine(cuisine, callback) {
    let path = "restaurant_foods/";
    firebase
      .database()
      .ref(path)
      .orderByChild("cuisine")
      .equalTo(cuisine)
      .once("value", (snapshot) => {
        let res = [];
        if (snapshot.val()) res = snapshot.val();
        res = Object.values(res);
        var a = filterArrayByKey(res, "location");
        callback(a);
      });
  }
  static getAllLocations(callback) {
    let path = "restaurant_foods/";
    firebase
      .database()
      .ref(path)
      .once("value", (snapshot) => {
        var res = [];
        if (snapshot.val()) {
          res = snapshot.val();
        }
        var a = filterArrayByKey(res, "location");
        callback(a);
      });
  }
  static getAllCuisines(callback) {
    let path = "restaurant_foods/";
    firebase
      .database()
      .ref(path)
      .once("value", (snapshot) => {
        var res = [];
        if (snapshot.val()) {
          res = snapshot.val();
        }
        var a = filterArrayByKey(res, "cuisine");
        let result = a.map((item) => item.cuisine);
        callback(result);
      });
  }
  static readMessage = (uid) => {
    let path = "livechat/" + uid;
    firebase.database().ref(path).update({ unread: null });
  };
  static requestChat = (uid, firstname, brand, ticket) => {
    let data = {
      uid: uid,
      username: firstname,
    };
    if (brand !== "Ecosystem") data.brand = brand;
    let path = "livechat/" + uid;
    firebase.database().ref(path).update(data);
    let ticket_id = "" + ticket.id;
    let child_id = ticket_id.split(".").join("");
    let ticket_path = "livechat/" + uid + "/tickets/" + child_id;
    firebase
      .database()
      .ref(ticket_path)
      .set({
        ticket_id: ticket.id,
        issue: ticket.issue,
        title: ticket.title,
        status: ticket.status,
        time: ticket.time,
        chatbot_QA: ticket.chatbot_QA ?ticket.chatbot_QA:null,
        item: ticket.item ? ticket.item : null,
        room: ticket.room ? ticket.room : null,
        band: ticket.band ? ticket.band : null,
        adjective: ticket.adjective ? ticket.adjective : null,
        response_sla: ticket.response_sla ? ticket.response_sla : null,
        repair_sla: ticket.repair_sla ? ticket.repair_sla : null,
      });
  };
  static getChats(uid, ticket_id, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id + "/content";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        var res = [];
        if (snapshot.val()) {
          res = snapshot.val();
        }
        callback(res);
      });
  }
  static getTicketData(uid, ticket_id, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id;
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        var res = [];

        if (snapshot.val()) {
          res = snapshot.val();
        }
        callback(res);
      });
  }
  static getChatsById(uid, callback) {
    let path = "livechat/" + uid + "/unread";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        var res = null;
        console.log("unread,", snapshot.val());
        if (snapshot.val()) {
          res = snapshot.val();
        }
        callback(res);
      });
  }
  static addMessage(uid, ticket_id, message, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id + "/content";
    var newChild = firebase.database().ref(path).push();
    newChild.set(message, callback(true));
  }
  static getAllSuperAdmins(callback) {
    let path = "agencies/";
    firebase
      .database()
      .ref(path)
      .orderByChild("role")
      .equalTo(0)
      .on("value", (snapshot) => {
        let result = [];
        result = snapshot.val();
        let res = Object.values(result);
        callback(res);
      });
  }
  static getAgencyTyping(uid, ticket_id, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id + "/agency_typing";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        if (snapshot.val()) callback(snapshot.val());
        else callback(false);
      });
  }
  static getLandlordTyping(uid, ticket_id, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id + "/landlord_typing";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        if (snapshot.val()) callback(snapshot.val());
        else callback(false);
      });
  }
  static getContractorTyping(uid, ticket_id, callback) {
    let path =
      "livechat/" + uid + "/tickets/" + ticket_id + "/contractor_typing";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        if (snapshot.val()) callback(snapshot.val());
        else callback(false);
      });
  }
  static getStatus(uid, ticket_id, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id + "/status";
    firebase
      .database()
      .ref(path)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          callback(snapshot.val());
        }
      });
  }
  static terminateChat(uid, ticket_id, feeling, callback) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id;
    firebase
      .database()
      .ref(path)
      .update({ content: null, status: "Closed", feeling: feeling })
      .then(() => {
        callback("success");
      })
      .catch((err) => {
        callback(err);
      });
  }
  static setTypeValue(uid, ticket_id, value) {
    let path = "livechat/" + uid + "/tickets/" + ticket_id;
    firebase.database().ref(path).update({ user_typing: value });
  }

  static getBrandDataByName = (brand_name) => {
    let path = "brands";
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(path)
        .orderByChild("name")
        .equalTo(brand_name)
        .on("value", (snapshot) => {
          let result = [];
          result = snapshot.val();
          let res = Object.values(result).find((result) => !result.deactive);
          resolve(res);
        });
    });
  };
}
Firebase.initialize();
export default Firebase;
