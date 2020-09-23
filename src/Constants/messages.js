// export const serverUrl = 'http://api.flightdrop.co/';
export const serverUrl = "https://flightdrop-backend-jack.herokuapp.com/";

export const botMessages = [
  [
    {
      type: "bot",
      message: "May I take your first name please?",
    },
  ],
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
      message:"How much do you spend weekly on dining out and entertainment?"
    }
  ],
];

export const userMessages = [
  {
    type: "user",
    inputType: "input",
    key: "firstname",
    placeholder: "First Name Only",
    isNext: true,
  },
  {
    type: "user",
    inputType: "static",
    message:"Ok",
  },
  {
    type: "user",
    inputType: "input",
    key: "money"
  }
];
export const registration_botMessages = [
  [
    {
      type: "bot",
      message: "I'm your new personal concierge.",
    },
    {
      type: "bot",
      message: "Your wish is my command.",
    },
    {
      type: "bot",
      message:
        "I'm going to credit you membership access for 30 days so you can have a look around, to start saving time and money.",
    },
    {
      type: "bot",
      message: "May I take your first name please?",
    },
  ],
  [
    {
      type: "bot",
      message: "What is your date of birth?",
    },
  ],

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
    key: "firstname",
    placeholder: "First Name Only",
    isNext: true,
  },
  {
    type: "user",
    inputType: "date",
    key: "dob",
  },
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
