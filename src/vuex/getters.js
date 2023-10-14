export default {
  check: (state) => state.check,
  loadingUI: (state) => state.loading.ui,
  loadingDataTable: (state) => state.loading.DataTable,
  loadingCustomSection: (state) => state.loading.customSection,
  successCreateAccount: (state) => state.success.createContact,

  geterror: (state) => state.error,
  getErrorsList: (state) => state.errorsList,
  errorLogin: (state) => state.errors.login,
  errorPublic: (state) => state.errors.public,
  AuthToken: (state) => state.token,
  AuthedUser: (state) => state.authUser,
  getAuthedUser: (state) => state.authUser,
  localLang: (state) => state.localLang,

  pagingLinks: (state) => state.pagingLinks,
  pagingMeta: (state) => state.pagingMeta,

  
};
