// export const serverUrl = 'http://api.flightdrop.co/';
export const serverUrl = "https://flightdrop-backend-jack.herokuapp.com/";

export const botMessages = [
  [
    {
      type: "bot",
      message: "Hi. Welcome to your money saving robot, may I take your first name please?",
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
      message:"What do you spend every month on food and drink? This includes dining out, coffee stops and takeaways... Tell the truth, we won't share any secrets we promise."
    }
  ],
  [
    {
      type:"bot",
      message:"What do you spend each month on your beauty and wellbeing please?"
    }
  ],
  [
    {
      type:"bot",
      message:"What do you spend each month on fashion shopping please?"
    }
  ],
  [
    {
      type:"bot",
      message:"What do you spend each month on your your home and interior design/decoration please?"
    }
  ],
  [
    {
      type:"bot",
      message:"What do you spend each month on tech and gadgets? Please include any subscription costs or mobile phone leases?"
    }
  ],
  [
    {
      type:"bot",
      message:"What's your monthly spend on entertainment? This includes music subscriptions, Spotify, Amazon & of course Netflix firstname..."
    }
  ]
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
    inputType: "yesno",
    key:"agree"
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Food & Drink",
    benefit:0.2,
    placeholder: `£00.00`,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Beauty & Wellbeing",
    benefit:0.09,
    placeholder: `£00.00`,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Fashion",
    benefit:0.1,
    placeholder: `£00.00`,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Home",
    benefit:0.2,
    placeholder: `£00.00`,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Tech",
    benefit:0.15,
    placeholder: `£00.00`,
    maxLength: 7,
  },
  {
    type: "user",
    inputType: "input",
    key: "bill-price",
    category:"Entertainment",
    benefit:0.25,
    placeholder: `£00.00`,
    maxLength: 7,
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
