import { botMessages } from "../Constants/messages";

export const getTimeoutValue = () => {
  return 1000;
};

export const getBetweenTimeoutValue = () => {
  return 2500;
};

export const getInputTimeoutValue = () => {
  return 1500;
};

export const getBotMessageGroup = () => {
  console.log("botMessages",botMessages);
  return botMessages.shift();
};

export const addBotMessageGroup = msgGroup => {
  return botMessages.unshift(msgGroup);
};

export const getRemainingMessages = () => {
  return botMessages.length;
};
export const getBotMessage = message => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(message);
    }, getTimeoutValue(message.message));
  });
};
export const addBotMessages = messages => {
  messages.map(item => {
    return botMessages.push(item);
  });
};
export const clearBotMessages = ()=>{
  botMessages.length = 0;
}