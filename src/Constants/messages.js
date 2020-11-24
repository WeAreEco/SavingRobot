// export const serverUrl = 'http://api.flightdrop.co/';
export const serverUrl = "https://flightdrop-backend-jack.herokuapp.com/";

export const botMessages = [
  [
    {
      type: "bot",
      message: "Would you like to find out how much money you will save on your spending across all walks of life?",
    },
  ],

  [
    {
      type:"bot",
      message:"Perfect, let’s get started then, this won’t take us more than 5 minutes."
    },
    {
      type:"bot",
      message:"What do you spend every month on food and drink? This includes dining out, coffee stops and takeaways... Tell the truth, we won't share any secrets we promise."
    }
  ],
];

export const userMessages = [
  {
    type: "user",
    inputType: "yesno",
    key:"agree"
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Food & Drink",
    benefit:0.2,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Beauty & Wellbeing",
    benefit:0.09,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Fashion",
    benefit:0.1,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Home",
    benefit:0.2,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Tech",
    benefit:0.15,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Entertainment",
    benefit:0.25,
    maxLength: 7,
  },
];
export const registration_botMessages = [
  [
    {
      type: "bot",
      message: "Perfect. I need to verify your mobile number now please?",
    },
  ],
  [
    {
      type: "bot",
      message: "Please confirm the sms code received.",
    },
  ],
];
export const registration_userMessages = [
  {
    type: "user",
    inputType: "input",
    placeholder: "",
    key: "phone",
  },
  {
    type: "user",
    inputType: "input",
    placeholder: "6-digits",
    key: "sms",
  },
];
export const registered_botMessages = [
  [
    {
      type: "bot",
      message: "Ok. I need to verify your mobile number now please?",
    },
  ],
  [
    {
      type: "bot",
      message: "Please confirm the sms code received.",
    },
  ],
];
export const registered_userMessages = [
  {
    type: "user",
    inputType: "input",
    placeholder: "",
    key: "phone",
  },
  {
    type: "user",
    inputType: "input",
    placeholder: "6-digits",
    key: "sms",
  },
];
