import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import Firebase from "../firebasehelper";
import ErrorModal from "./ErrorModal";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { FadeLoader } from "react-spinners";
import CardContainer from "./CardContainer";
import { css } from "@emotion/core";
import {
  getBotMessageGroup,
  getBetweenTimeoutValue,
  getTimeoutValue,
  getInputTimeoutValue,
  addBotMessageGroup,
  addBotMessages,
  clearBotMessages
} from "../Utils/botMessages";
import {
  getUserMessage,
  addUserMessage,
  addUserMessages,
  clearUserMessages
} from "../Utils/userMessages";
import {
  registered_botMessages,
  registered_userMessages,
  registration_botMessages,
  registration_userMessages,
} from "../Constants/messages";
import { saveFirstname,saveTotalSaving } from "../redux/actions";
import {financial,filterRetailers} from "../functions";
import { clearZero, inviteFriend } from "../functions/Auth";
import {  CurrencyOptions } from "../Utils/Constants";
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
let botMessages = {};
  botMessages["Food & Drink"]="What do you spend each month on your beauty and wellbeing please?";
  botMessages["Beauty & Wellbeing"]="What do you spend each month on fashion shopping please?",
  botMessages["Fashion"]="What do you spend each month on your your home and interior design/decoration please?";
  botMessages["Home"]="What do you spend each month on tech and gadgets? Please include any subscription costs or mobile phone leases?";
  botMessages["Tech"]="What's your monthly spend on entertainment? This includes music subscriptions, Spotify, Amazon & of course Netflix.";

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messages = [
      {
        type: "user",
        message: "Hello",
      },
    ];
    this.state = {
      showInput: false,
      messages: [],
      name: "",
      isIphoneX: true,
      brand: "ecosystem",
      modalIsOpen: false,
      uid: props.uid,
      profile: props.profile,
      is_member: false,
      showTravel: false,
      super_admins: [],
      chatbot: {},
      loading:false,
      friends: [],
      territory:"UK"
    };
  }

  componentDidMount() {
    const { logo, restart, uid, profile } = this.props;
    this.setState({ brand: logo });
    if (restart) {
      this.setState({ uid: uid, profile: profile });
      this.restart();
    }
    this.getBotMessageGroup();
  }

  restart = () => {
    this.setState({ messages: [] });
  };
  getBotMessageGroup = () => {
    this.setState({
      showInput: false,
    });
    let messageGroup = getBotMessageGroup();
    console.log("messageGroup",messageGroup);
    if (messageGroup) {
      messageGroup.forEach((message, index) => {
        const timeoutValue =
          getTimeoutValue() + (index ? index * getBetweenTimeoutValue() : 0);
        setTimeout(() => {
          this.setMessageInState(message);
          this.scrollToBottom();
          if (index === messageGroup.length - 1) this.toggleUserInput(true);
        }, timeoutValue);
      });
    }
  };

  scrollToBottom(delay = 0) {
    if (delay) {
      setTimeout(() => {
        animateScroll.scrollToBottom({
          duration: 500,
          smooth: "easeInOutQuad",
        });
      }, delay);
    } else {
      animateScroll.scrollToBottom({
        duration: 500,
        smooth: "easeInOutQuad",
      });
    }
  }
  isFirstLandingonSaving = (profile)=>{
    let token_history = profile.token_history;
    if(token_history){
      let val = token_history.find(item=>item.type==="savingrobot");
      if(val)
        return false;
      else
        return true;
    }
    else{
      return true;
    }
      
  }
  is_alreadyFriendAdded = (friend_list,friend) =>{
    const {brand} = this.state;
    return new Promise((resolve,reject)=>{
        if(friend_list){
          let promises = friend_list.map(async item=>{
            let uid = item.uid;
            let profile = await Firebase.getProfileByUID(uid,brand);
            console.log("profile",profile);
            return profile.phonenumber;
          });
          Promise.all(promises).then(res=>{
            console.log("phone number list",res);
            if(res.includes(friend.phone))
                resolve(true);
            else
                resolve(false);
          }).catch(error=>{
            reject(error);
          })
        }
        else{
            resolve(false);
        }
    });
  }
  setMessages() {
    const { logo, icon,retailers } = this.props;
    const { messages } = this.state;
    return messages.map((message, i) => {
      const firstChild = i !== 0 && messages[i - 1].type !== message.type;
      if(message.type==="card")
        return (
          <CardContainer cards={message.cards} />
        );
      else 
        return (
          <MessageItem
            message={message}
            firstChild={firstChild}
            key={i}
            timeoutValue={getTimeoutValue(message.message)}
            brand={ logo}
            icon={ icon}
          />
        );
      
           
    });
  }

  toggleUserInput(timeout) {
    if (!this.state.showInput) this.scrollToBottom(500);
    const { userMessage } = this.state;
    const showInput = !this.state.showInput;
    if (timeout) {
      setTimeout(() => {
        if (!this.state.showInput) this.scrollToBottom(500);
        this.setState({
          showInput,
          userMessage: showInput ? getUserMessage() : userMessage,
        });
      }, getInputTimeoutValue());
    } else {
      this.setState({
        showInput,
        userMessage: showInput ? getUserMessage() : userMessage,
      });
    }
  }

  setMessageInState(message) {
    const messages = this.state.messages.slice();
    messages.push(message);
    this.setState({ messages });
  }
  addMessage = async (message) => {
    const { brand, uid, profile,friends,territory } = this.state;
    let {totalsaving,retailers} = this.props;
    if (message.inputType === "input" && message.key === "firstname") {
      setTimeout(() => {
        this.scrollToBottom();
        let firstname = message.message;
        this.setMessageInState({
          type: "bot",
          message: `Great, thanks ${firstname}. `,
        });
        this.props.dispatch(saveFirstname(firstname));
        this.getBotMessageGroup();
      }, getBetweenTimeoutValue());

    } else if (message.key === "is_member") {
      if (message.message === "Yes") {
        this.setState({ is_member: true });
        addBotMessages(registered_botMessages);
        addUserMessages(registered_userMessages);
      } else {
        addBotMessages(registration_botMessages);
        addUserMessages(registration_userMessages);
      }
      this.getBotMessageGroup();
    } else if (message.key === "wrong_sms") {
      addUserMessage({
        type: "user",
        inputType: "input",
        placeholder: "6-digits",
        key: "sms",
      });
      addUserMessage({
        type: "user",
        inputType: "input",
        placeholder: "",
        key: "phone",
      });
      addBotMessageGroup([
        {
          type: "bot",
          message: "Please confirm the sms code received.",
        },
      ]);
      addBotMessageGroup([
        {
          type: "bot",
          message: `SMS Code is not matching. Try again.`,
        },
      ]);
      this.getBotMessageGroup();
    } else if (message.key === "no_received") {
      addUserMessage({
        type: "user",
        inputType: "input",
        placeholder: "6-digits",
        key: "sms",
      });
      addUserMessage({
        type: "user",
        inputType: "input",
        placeholder: "",
        key: "phone",
      });
      addBotMessageGroup([
        {
          type: "bot",
          message: "Please confirm the sms code received.",
        },
      ]);
      addBotMessageGroup([
        {
          type: "bot",
          message: `Try again.`,
        },
      ]);
      this.getBotMessageGroup();
    } else if (message.key === "sms") {
      let phone = message.phone;
      let profile = message.profile;
      let is_member = message.is_member;
      if (is_member) {
        this.setState({loading:true});
        Firebase.getProfile(phone, brand).then(async (res) => {
          this.setState({loading:false});
          if (res) {
            this.setState({ uid: res.id });
            this.setState({ profile: res});
            if(res.friends)
              this.setState({friends: res.friends});
            addUserMessage({
              type: "user",
              inputType: "yesno",
              key: "is_invite",
            });
            if(this.isFirstLandingonSaving(res)){
                addBotMessageGroup([
                  {
                    type: "bot",
                    message: "You are successfully logged in.",
                  },
                  {
                    type: "bot",
                    message: `Currently you have ${res.tokens} tokens in your account `+profile.firstname+`, which is equivalent to ${CurrencyOptions[territory]}${(res.tokens/100).toFixed(2)}.`,
                  },
                  {
                    type: "bot",
                    message: `Here’s ${CurrencyOptions[territory]}10 in tokens, to help you start saving.`,
                  },
                  {
                    type: "bot",
                    message: `You now have ${res.tokens + 1000 } tokens in your account, which is equivalent to ${CurrencyOptions[territory]}${((res.tokens + 1000)/100).toFixed(2)}.`,
                  },
                  {
                    type: "bot",
                    message: "Would you like to share your saving result with friends "+profile.firstname+`? You’ll earn ${CurrencyOptions[territory]}5 in tokens per friend.`,
                  },
                  
                ]);
            
                let tokens =(res.tokens|| 0) + 1000;
                profile.tokens = tokens;
                this.setState({profile});
                Firebase.updateUserById(res.id, brand, {
                  tokens: tokens,
                });
                await Firebase.saveTokenHistory(brand, res.id, {
                  created: new Date(),
                  amount: -1000,
                  type: "savingrobot",
                });
            }
            else{
              addBotMessageGroup([
                {
                  type: "bot",
                  message: "You are successfully logged in.",
                },
                {
                  type: "bot",
                  message: `Currently you have ${res.tokens} tokens in your account `+profile.firstname+`, which is equivalent to ${CurrencyOptions[territory]}${(res.tokens/100).toFixed(2)}.`,
                },
                {
                  type: "bot",
                  message: "Would you like to share your saving result with friends "+profile.firstname+`? You’ll earn ${CurrencyOptions[territory]}5 in tokens per friend.`,
                },
              ]);
            }
            this.getBotMessageGroup();
          } else
            this.setState({
              modalIsOpen: true,
              caption: "Error",
              content: `Your phone number is not existing in ${brand}!`,
            });
        });
      } else {
        this.setState({ profile, phone,loading:true });
        let new_profile = {
          dob: profile.dob,
          firstname: profile.firstname,
          phonenumber: profile.phonenumber,
        };
        this.signup(new_profile)
          .then(async (res) => {
            this.setState({loading:false});
            if (res) {
              const uid = res.id;
              this.setState({ uid: uid });
              addUserMessage({
                  type: "user",
                  inputType: "yesno",
                  key: "is_invite",
                });
                addBotMessageGroup([
                  {
                    type: "bot",
                    message: "You are successfully registered.",
                  },
                  {
                    type: "bot",
                    message: `Currently you have 0 tokens in your account.`,
                  },
                  {
                    type: "bot",
                    message: `Here’s ${CurrencyOptions[territory]}10 in tokens, to help you start saving.`,
                  },
                  {
                    type: "bot",
                    message: `You now have 1000 tokens in your account, which is equivalent to ${CurrencyOptions[territory]}10.`,
                  },
                  {
                    type: "bot",
                    message: "Would you like to share your saving result with friends "+profile.firstname+`? You’ll earn ${CurrencyOptions[territory]}5 in tokens per friend.`,
                  },
                ]);
                Firebase.updateUserById(uid, brand, {
                  tokens: 1000,
                });
                await Firebase.saveTokenHistory(brand, uid, {
                  created: new Date(),
                  amount: -1000,
                  type: "savingrobot",
                });
              this.getBotMessageGroup();
              
            } else {
              this.setState({
                modalIsOpen: true,
                already_existing: true,
                caption: "You are already a member",
                content: `This phone number is registered to a member, I will take you to the members area.`,
              });
            }
          })
          .catch((err) => {
            this.setState({
              modalIsOpen: true,
              caption: "Error",
              content: err,
            });
          });
      }
    } else if (message.key === "is_invite") {
      if (message.message === "Yes") {
        addBotMessageGroup([
          {
            type: "bot",
            message: `Ok Please let us know your friend name and phone number please.`,
          },
        ]);
        addUserMessage({
          type: "user",
          inputType: "invite",
          key: "invite",
        });
      } else {
        addBotMessageGroup([
          {
            type: "bot",
            message: `Thank you.`,
          },
        ]);
        addUserMessage({
          type: "user",
            inputType: "static",
            message: `Take me to my Ecosystem,${window.mobileCheck()?"<br>":""} to spend my tokens.`,
            key: "final",
        });
      }
      this.getBotMessageGroup();
    } else if (message.key === "invite") {
      let friend = message.profile.invite;
      
      //let already_added = await this.is_alreadyFriendAdded(friends,friend);
      this.is_alreadyFriendAdded(friends,friend).then(async already_added=>{
        if(already_added){
          addBotMessageGroup([
            {
              type: "bot",
              message: `Sorry, ${friend.firstname} is already your friend.`,
            },
          ]);
          addUserMessage({
            type: "user",
              inputType: "static",
              message: `Take me to my Ecosystem,${window.mobileCheck()?"<br>":""} to spend my tokens.`,
              key: "final",
          });
          this.getBotMessageGroup();
        }
         else{
          try {
              await this.addFriend(friend.firstname,friend.phone);
              addBotMessageGroup([
                {
                  type: "bot",
                  message: `You've earned ${CurrencyOptions[territory]}5 in tokens.`,
                },
                {
                  type: "bot",
                  message: `You now have ${profile.tokens+500} tokens in your account, which is equivalent to ${CurrencyOptions[territory]}${((profile.tokens+500)/100).toFixed(2)}.`,
                },
              ]);
              addUserMessage({
                type: "user",
                  inputType: "static",
                  message: `Take me to my Ecosystem,${window.mobileCheck()?"<br>":""} to spend my tokens.`,
                  key: "final",
              });
              let tokens =profile.tokens + 500;
              profile.tokens = tokens;
              this.setState({profile});
              Firebase.updateUserById(uid, brand, {
                tokens: tokens,
              });
              await Firebase.saveTokenHistory(brand, uid, {
                created: new Date(),
                amount: -500,
                type: "invite",
              });
              this.getBotMessageGroup();
            } catch (error) {
              console.log("error",error);
            }
          }
      });
     
     
    }
    else if(message.key === "bill-price"){
      const {brand} = this.props;
      let profile = message.profile;
      let category = message.category;
      let benefit = message.benefit;
      let territory = brand.territory?brand.territory:"UK";
      this.setState({territory});
      let money = profile[category];
      console.log("money",money);
      let monthly_save = financial(money*benefit);
      let weekly_save =financial(monthly_save/4);
      let tot_save = financial(Number.parseFloat(totalsaving)+Number.parseFloat(monthly_save));
      
      this.props.dispatch(saveTotalSaving(tot_save));

      let retailers_data = retailers.all;
      let deactive = retailers.deactive;
      let cards = [];
      if(retailers_data){
        let result = filterRetailers(retailers_data,deactive,category,territory);
        if(result.length){
          let top_10_cards = [];
          let common_cards = [];
          result.map(item=>{
            let name = item.retailerName;
            let image = item.logo;
            let top10 = item.top10;
            if(top10<21 && top10!=="none")
              top_10_cards.push({name,image,top10});
            else
              common_cards.push({name,image,top10});
          });
          cards = top_10_cards.concat(common_cards);
          cards.splice(6);
          console.log("cards",cards);
        }
      }
      console.log("cards",cards);
        if(category!=="Entertainment"){
          addBotMessageGroup([
            {
              type:"bot",
              message:`Your Ecosystem will save you on average ${CurrencyOptions[territory]}`+weekly_save+` per week and ${CurrencyOptions[territory]}`+monthly_save+" per month with our friends, including:"
            },
            {
              type:"card",
              cards:cards,
              retailerType:category,
            },
            {
              type:"bot",
              message:botMessages[category]
            }
            
          ]);
        }
        else{
          addUserMessage({
            type: "user",
            inputType: "yesno",
            key: "is_member",
          });
          addBotMessageGroup([
            {
              type:"bot",
              message:`Your Ecosystem will save you on average ${CurrencyOptions[territory]}`+weekly_save+` per week and ${CurrencyOptions[territory]}`+monthly_save+" per month with our friends, including:"
            },
            {
              type:"card",
              cards:cards,
              retailerType:category,
            },
            {
              type: "bot",
              message: "Are you already a member?",
            },
          ]);
        }
      this.getBotMessageGroup();
    }
    else if(message.key === "agree"){
      if(message.message==="No"){
        window.location.reload();
      }
      else
        this.getBotMessageGroup();
    }else if(message.key === "final"){
      if(brand!=="Ecosystem")
        window.location.href = 'http://ecosystem.life/'+brand;
      else
        window.location.href = 'http://ecosystem.life';
    }
    else {
      if (!message.finish) {
        setTimeout(() => {
          this.getBotMessageGroup();
        }, 1000);
      }
    }

    this.setMessageInState(message);
    this.toggleUserInput();
  };
  signup = (profile) => {
    const { brand } = this.state;
    return Firebase.signup(profile, brand);
  };
 
  addFriend = (firstname, phonenumber) => {
    const { uid,friends,profile } = this.state;
    const {brand} = this.props;
    let brand_name = brand.name;
    return new Promise((resolve,reject)=>{
      Firebase.addFriend(firstname, phonenumber, brand_name)
      .then((friend) => {
        const friend_id = friend.id;
        Firebase.updateUserById(uid, brand.name, {
          friends: [
            ...friends.map((friend) => ({
              uid: friend.uid,
              firstname: friend.firstname,
            })),
            {
              uid: friend_id,
              firstname: firstname,
            },
          ],
          tokens: (profile.tokens || 0) + 500,
        });
        resolve(friend);
        inviteFriend(firstname, profile.firstname, brand.name, phonenumber,brand.bespokeUrl);
      })
      .catch((error) => {
        reject(error);
      });
    })
    
  };

  goBack = () => {
    // const { uid, profile } = this.props;
    // this.setState({ uid: uid, profile: profile });
    this.restart();
    this.getBotMessageGroup();
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
    window.location.reload();
  };
  render() {
    const { logo } = this.props;
    const {
      showInput,
      userMessage,
      isIphoneX,
      modalIsOpen,
      caption,
      content,
      is_member,
      profile,
      brand,
      uid,
      loading,
    } = this.state;
    return (
      <div className="message-list-wrapper">
        {this.setMessages()}
        {loading && <FadeLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          loading={loading}
        />}
        <div component="div" className="message-input-container">
          {showInput ? (
            <MessageInput
              message={userMessage}
              addMessage={this.addMessage}
              isIphoneX={isIphoneX}
              logo={logo}
              brand={brand}
              is_member={is_member}
              onRestart={this.goBack}
              profile={profile}
              uid={uid}
            />
          ) : null}
        </div>
        <ErrorModal
          caption={caption}
          content={content}
          closeModal={this.closeModal}
          modalIsOpen={modalIsOpen}
        />
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
    firstname: state.firstname,
    totalsaving: state.totalsaving,
    retailers: state.retailers,
    brand: state.brand
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
