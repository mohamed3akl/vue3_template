import vuetify from "@/plugins/vuetify";

const phoneRules = [
  (v) => !!v || vuetify.locale.t("$vuetify.regx.phone"),
  (v) =>
    (v &&
      /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/.test(v) ==
        true) ||
    vuetify.locale.t("$vuetify.regx.valid_phone"),
];

const emailRegx =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/';
const emailRules = [
  (v) => !!v || vuetify.locale.t("$vuetify.regx.email"),
  (v) =>
    (v && emailRegx.test(v) == true) ||
    vuetify.locale.t("$vuetify.regx.valid_email"),
];

const nameRules = [(v) => !!v || vuetify.locale.t("$vuetify.regx.username")];

const passwordRules = [
  (v) => !!v || vuetify.locale.t("$vuetify.regx.passwordRequired"),
];

const identityRules = [
  (v) => !!v || vuetify.locale.t("$vuetify.regx.identity"),
  (v) =>
    (v && v.length == 10) || vuetify.locale.t("$vuetify.regx.valid_identity"),
];

const dateRules = [(v) => !!v || vuetify.locale.t("$vuetify.regx.date")];

const timeRules = [(v) => !!v || vuetify.locale.t("$vuetify.regx.time")];

const requiredRule = [
  (v) => !!v || vuetify.locale.t("$vuetify.input_required"),
];

// export the rules as an object
export {
  phoneRules,
  emailRules,
  nameRules,
  passwordRules,
  identityRules,
  dateRules,
  timeRules,
  requiredRule,
};
