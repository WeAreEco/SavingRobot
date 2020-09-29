import { userMessages } from "../Constants/messages";

export const getUserMessage = () => {
  return userMessages.shift();
};
export const addUserMessage = (message) => {
  userMessages.unshift(message);
};
export const addUserMessages = (messages) => {
  messages.forEach((item) => {
    userMessages.push(item);
  });
};
export const clearUserMessages = ()=>{
  userMessages.length = 0;
}