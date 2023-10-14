import axios from "axios";
import store from "../vuex";

let baseURL = import.meta.env.VITE_API;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  // Append lang query param to all requests.
  const lang = localStorage.getItem("locale")
    ? localStorage.getItem("locale")
    : "ar";
  config.params = { ...config.params, lang };

  // Set header auth.
  var token = store.state.token;
  if (token) {
    config.headers.Authorization = token;
  }

  // Show loading indicator.
  store.commit("SET_LOADING", { name: "ui", value: true });
  // Hide errors if still showing when the request is being sent.
  store.commit("SET_ERRORS_LIST", []);
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Hide loading indicator.
    store.commit("SET_LOADING", { name: "ui", value: false });
    return response;
  },
  (error) => {
    // Hide loading indicator.
    store.commit("SET_LOADING", { name: "ui", value: false });

    // Show alert when response status is bad request or not found
    if (error.response.status == 400 || error.response.status == 404) {
      store.dispatch("setErrors", {
        name: "public",
        value: error.response.data.errors,
      });
    } else if (error.response.status == 500) {
      const lang = localStorage.getItem("locale");
      var error;
      if (lang == "en") {
        error = "Something went wrong try later.";
      } else {
        error = "حدث خطأ ما حاول في وقت لاحق.";
      }
      store.dispatch("setErrors", {
        name: "public",
        value: { error },
      });
    }

    return Promise.reject(error);
  }
);

export default api;
