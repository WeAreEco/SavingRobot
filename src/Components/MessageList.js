import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import Firebase from "../firebasehelper";
import ErrorModal from "./ErrorModal";
import { connect } from "react-redux";
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

function UserException(message) {
    this.message = message;
    this.name = 'UserException';
 }
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
  invite = (friend)=>{

    console.log("invite phone",friend.phone);
    const {profile} = this.state;
    addBotMessages([
      [
        {
          type: "bot",
          message:
            `Great your friend ${friend.firstname} is invited.`,
        },
        { type: "bot", message: `Ok thanks ${profile.firstname}, here’s £10 in tokens, to help you start saving.` },
      ],
    ]);
    this.getBotMessageGroup();
  }
  addMessage = async (message) => {
    const { brand, uid, profile } = this.state;
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
        Firebase.getProfile(phone, brand).then((res) => {
          this.setState({loading:false});
          if (res) {
            this.setState({ uid: res.id });
            this.setState({ profile: res.data() });
            if(res.data().friends)
              this.setState({friends: res.data().friends});
            console.log("profile",res.data());
            addUserMessage({
              type: "user",
              inputType: "yesno",
              key: "is_invite",
            });
            addBotMessageGroup([
              {
                type: "bot",
                message: "Great! You are successfully logged in.",
              },
              {
                type: "bot",
                message: `Currently you have ${res.data().tokens} tokens in your wallet `+profile.firstname+"...",
              },
              {
                type: "bot",
                message: "Would you like to share your saving result with friends "+profile.firstname+"? You’ll earn £5 in tokens per friend.",
              },
            ]);
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
        console.log("newprofile",new_profile);
        this.signup(new_profile)
          .then((res) => {
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
                    message: "Great! You are successfully registered.",
                  },
                  {
                    type: "bot",
                    message: "Would you like to share your saving result with friends "+profile.firstname+"? You’ll earn £5 in tokens per friend.",
                  },
                ]);
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
        Firebase.updateUserById(uid, brand, {
          tokens: (profile.tokens || 0) + 1000,
        });
        await Firebase.saveTokenHistory(brand, uid, {
          created: new Date(),
          amount: 1000,
          type: "savingrobot",
        });
        addBotMessageGroup([
          {
            type: "bot",
            message: `Ok thanks ${profile.firstname}, here’s £10 in tokens, to help you start saving.`,
          },
        ]);
        
      }
      this.getBotMessageGroup();
    } else if (message.key === "invite") {
      let friend = message.profile.invite;
      try {
        await this.addFriend(friend.firstname,friend.phone);
        await Firebase.saveTokenHistory(brand, uid, {
          created: new Date(),
          amount: 500,
          type: "invite",
        });
        addBotMessageGroup([
          {
            type: "bot",
            message: `Ok thanks ${profile.firstname}, you've earned £5 in tokens.`,
          },
          {
            type: "bot",
            message: `Here’s £10 in tokens, to help you start saving.`,
          }
        ]);
        this.getBotMessageGroup();
      } catch (error) {
        alert(
          "You cannot invite this user because this phone number is already used."
        );
      }
    }
    else if(message.key === "bill-price"){
      let profile = message.profile;
      let category = message.category;
      let benefit = message.benefit;

      let money = profile[category];
      console.log("money",money);
      let weekly_save = financial(money*benefit);
      let monthly_save =financial(weekly_save*4);
      let tot_save = financial(Number.parseFloat(totalsaving)+Number.parseFloat(monthly_save));
      
      this.props.dispatch(saveTotalSaving(tot_save));

      let retailers_data = retailers.all;
      let deactive = retailers.deactive;
      let cards = [];
      console.log("retailers_data",retailers_data);
      if(retailers_data){
        let result = filterRetailers(retailers_data,deactive,category);
        if(result.length){
          cards = result.map(item=>{
            let name = item.retailerName;
            let image = item.logo;
            return {name,image};
          });
          cards.splice(6);
        }
      }
      if(cards.length!==0){
        if(category!=="Entertainment"){
          addBotMessageGroup([
            {
              type:"bot",
              message:"Your Ecosystem will save you on average £"+weekly_save+" per week and £"+monthly_save+" per month with our friends, including:"
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
              message:"Your Ecosystem will save you on average £"+weekly_save+" per week and £"+monthly_save+" per month with our friends, including:"
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
    }
    else if(message.key === "agree"){
      if(message.message==="No"){
        console.log("Rstart");
        this.restart();
        clearBotMessages();
        clearUserMessages();
      }
      this.getBotMessageGroup();
    }else {
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
    console.log("brand",brand);
    console.log("uid",uid);
    console.log("friends",friends);
    console.log("profile",profile);
    return new Promise((resolve,reject)=>{
      Firebase.addFriend(firstname, phonenumber, brand_name)
      .then((newUser) => {
        const newID = newUser.id;
        console.log("newID",newID);
        Firebase.updateUserById(uid, brand.name, {
          friends: [
            ...friends.map((friend) => ({
              uid: friend.uid,
              firstname: friend.firstname,
            })),
            {
              uid: newID,
              firstname: firstname,
            },
          ],
          tokens: (profile.tokens || 0) + 500,
        });
        resolve(newUser);
        //localStorage.setItem("profile", JSON.stringify(newProfile));
        inviteFriend(firstname, profile.firstname, brand.name, phonenumber,brand.bespokeUrl);
      })
      .catch((error) => {
        console.log("error",error);
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
