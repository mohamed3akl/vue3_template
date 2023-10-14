export default {
  //Check if vuex works
  check: "test",
  lang: "ar",
  //Loading
  loading: {
    ui: false,
    DataTable: false,
    customSection: false,
  },
  //Success Messages
  success: {
    createContact: false,
  },
  //Errors
  error: null,
  errorsList: [],
  errors: {
    signup: null,
    public: null,
  },

  //Auth user
  token: null,
  authUser: {
    avatar: null,
    email: null,
    name: null,
    mobile: null,
  },
  //Local i18n
  localLang: null,

  //Forget Password
  user_email: "",
  user_otp: "",
  email_sent: false,
  resetToken: false,

  
  search_key: "",
  pagingLinks: {},
  pagingMeta: {},

};
