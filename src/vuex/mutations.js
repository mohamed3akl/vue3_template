export default {
  //Set Loading
  SET_LOADING: (state, { name, value }) => (state.loading[name] = value),
  //Set Success Message
  SET_SUCCESS: (state, { name, value }) => (state.success[name] = value),
  //Set Error Messages
  SET_ERROR: (state, error) => (state.error = error),
  SET_ERRORS_LIST: (state, newList) => (state.errorsList = newList),
  SET_ERRORS: (state, { name, value }) => (state.errors[name] = value),
  SET_CLEAR_ERROR: (state) => (state.error = ""),
  //Set Auth Users
  SET_AUTHORIZATION: (state, token) => (state.token = token),
  SET_AUTH_USER: (state, data) => (state.authUser = data),
  //Set Users UnAuth
  SET_USER_UNAUTHENTICATED: (state) => {
    state.authUser = {
      avatar: null,
      email: null,
      name: null,
      mobile: null,
    };
    state.token = null;
  },
  //Set user Locals i18n
  SET_LOCAL_LANG: (state, data) => {
    state.localLang = data;
  },

  SET_PAGING_LINKS: (state, data) => {
    state.pagingLinks = data;
  },
  SET_PAGING_META: (state, data) => {
    state.pagingMeta = data;
  },
  SET_USER_EMAIL: (state, value) => {
    state.user_email = value;
  },
  SET_USER_OTP: (state, value) => (state.user_otp = value),




  SET_SEARCH_KEY: (state, value) => {
    state.search_key = value;
  },

};
