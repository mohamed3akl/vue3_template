import axios from "axios";
import http from "../service/api";
import router from "../router";
import { setTimeout } from "core-js";
import store from "../vuex";

export default {
  ////////////////////////
  // Auth functions
  /////////////////////

  // LOGOUT

  logoutUser: ({ commit }) => {
    new Promise((response) => {
      if (store.state.authUser.user_type == 3) {
        router.push({ name: "AdminLogain" });
      } else {
        router.push({ name: "login" });
      }
      delete axios.defaults.headers.common["Authorization"];
      commit("SET_USER_UNAUTHENTICATED");

      response();
    });
  },

  fetchUserProfile: ({ commit, dispatch }) => {
    http
      .get("/profile")
      .then((res) => {
        commit("SET_AUTH_USER", res.data.data);
      })
      .catch((error) => {
        dispatch("logoutUser");
        router.push({ name: "login" });
      });
  },

  UPDATE_PROFILE: ({ commit }, { name, mobile, email, new_password }) =>
    new Promise((resolve) => {
      http
        .put("/profile", { name, mobile, email, new_password })
        .then((res) => {
          if (res.status === 200) {
            commit("SET_AUTH_USER", res.data.data);
            router.push({ name: "Home" });
            commit("SET_SUCCESS", {
              name: "createContact",
              value: "تم تحديث بياناتك بنجاح",
            });
            setTimeout(() => {
              commit("SET_SUCCESS", { name: "createContact", value: false });
            }, 4000);
            resolve();
          }
        })
        .catch(() => {});
    }),
  ////////////////////////
  // Auth functions
  /////////////////////

  /////////////////
  // Lookups
  //////////////////
  

  clearError: ({ commit }) => commit("SET_CLEAR_ERROR"),

  setErrors: ({ commit }, payload) => {
    commit("SET_ERRORS_LIST", payload.value);
    setTimeout(() => {
      commit("SET_ERRORS_LIST", []);
    }, 6000);
  },

  setSuccess: ({ commit }, payload) => {
    commit("SET_SUCCESS", payload);
    setTimeout(() => {
      commit("SET_SUCCESS", {
        name: payload.name,
        value: false,
      });
    }, 6000);
  },
  
};
