<template>
  <div class="loginPage">
    <div class="background"></div>
    <div class="loginBody">
      <v-row>
        <v-col lg="7" md="8" sm="12">
          <div class="loginDiv">
            <div class="head">
              <img src="@/assets/img/geneoLogo.png" />
              <lang-switch />
            </div>
            <div class="body">
              <h1>{{ $vuetify.locale.t("$vuetify.register_new_account") }}</h1>
              <v-alert type="error" v-if="$store.state.errors.signup">{{
                $store.state.errors.signup
              }}</v-alert>
              <v-form ref="form" v-model="valid">
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.username")
                }}</label>
                <v-text-field
                  v-model="username"
                  :rules="nameRules"
                  required
                  density="default"
                  variant="solo"
                  single-line
                  :placeholder="$vuetify.locale.t('$vuetify.your_username')"
                ></v-text-field>
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.email_address")
                }}</label>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  type="email"
                  required
                  density="default"
                  variant="solo"
                  single-line
                  placeholder="useremail@mail.com"
                ></v-text-field>
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.password")
                }}</label>
                <v-text-field
                  v-model="password"
                  density="default"
                  :rules="passwordRules"
                  required
                  variant="solo"
                  single-line
                  :placeholder="$vuetify.locale.t('$vuetify.your_password')"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <div v-if="password.length" class="password-errors">
                  <p
                    class="validateValid"
                    :style="{
                      color: validatePassword.isLongEnough ? 'green' : 'red',
                    }"
                  >
                    <v-icon class="me-2"
                      >mdi-{{
                        validatePassword.isLongEnough ? "check" : "close"
                      }}</v-icon
                    >
                    {{ $vuetify.locale.t("$vuetify.regx.password.length") }}
                  </p>
                  <p
                    class="validateValid"
                    :style="{
                      color: validatePassword.hasSpecialChar ? 'green' : 'red',
                    }"
                  >
                    <v-icon class="me-2"
                      >mdi-{{
                        validatePassword.hasSpecialChar ? "check" : "close"
                      }}</v-icon
                    >
                    {{
                      $vuetify.locale.t("$vuetify.regx.password.hasSpecialChar")
                    }}
                  </p>
                  <p
                    class="validateValid"
                    :style="{
                      color: validatePassword.hasUppercase ? 'green' : 'red',
                    }"
                  >
                    <v-icon class="me-2"
                      >mdi-{{
                        validatePassword.hasUppercase ? "check" : "close"
                      }}</v-icon
                    >
                    {{
                      $vuetify.locale.t("$vuetify.regx.password.hasUppercase")
                    }}
                  </p>
                  <p
                    class="validateValid"
                    :style="{
                      color: validatePassword.hasLowercase ? 'green' : 'red',
                    }"
                  >
                    <v-icon class="me-2"
                      >mdi-{{
                        validatePassword.hasLowercase ? "check" : "close"
                      }}</v-icon
                    >
                    {{
                      $vuetify.locale.t("$vuetify.regx.password.hasLowercase")
                    }}
                  </p>
                  <p
                    class="validateValid"
                    :style="{
                      color: validatePassword.noMatchEmailOrUsername
                        ? 'green'
                        : 'red',
                    }"
                  >
                    <v-icon class="me-2"
                      >mdi-{{
                        validatePassword.noMatchEmailOrUsername
                          ? "check"
                          : "close"
                      }}</v-icon
                    >
                    {{
                      $vuetify.locale.t(
                        "$vuetify.regx.password.matchEmailOrUsername"
                      )
                    }}
                  </p>

                  <div style="display: none">{{ checkPassword }}</div>
                </div>

                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.user_type")
                }}</label>
                <v-radio-group v-model="user_type">
                  <v-radio
                    :label="
                      $vuetify.locale.t(
                        '$vuetify.User_looking_for_genetic_services'
                      )
                    "
                    value="0"
                  ></v-radio>
                  <v-radio
                    :label="$vuetify.locale.t('$vuetify.Consultant_geneticist')"
                    value="1"
                  ></v-radio>
                </v-radio-group>
                <p class="sign-up-comment">
                  {{
                    $vuetify.locale.t(
                      "$vuetify.By_registering_you_agree_to_our"
                    )
                  }}
                  <a href="/condition"
                  target="_blank"
                    >{{ $vuetify.locale.t("$vuetify.Terms_and_Conditions") }}</a>
                    <a href="/rules" target="_blank" class="mx-1">
                    {{ $vuetify.locale.t("$vuetify.and_Privacy_Policy") }}</a
                  >
                </p>

                <v-btn
                  size="x-large"
                  color="primary"
                  class="w-100 mt-8"
                  @click="submitHandler"
                >
                  {{ $vuetify.locale.t("$vuetify.new_register") }}
                </v-btn>
              </v-form>

              <div class="or">
                <span>{{ $vuetify.locale.t("$vuetify.or") }}</span>
              </div>
              <div class="socail-login">
                <v-btn
                  size="x-large"
                  color="black"
                  class="w-100"
                  variant="outlined"
                >
                  <img class="me-2" src="@/assets/img/icons/google.png" />
                  {{ $vuetify.locale.t("$vuetify.login_google") }}
                </v-btn>
                <v-btn
                  size="x-large"
                  color="black"
                  class="w-100"
                  variant="outlined"
                >
                  <img class="me-2" src="@/assets/img/icons/facebook.png" />
                  {{ $vuetify.locale.t("$vuetify.login_facebook") }}
                </v-btn>
                <v-btn
                  size="x-large"
                  color="black"
                  class="w-100"
                  variant="outlined"
                >
                  <img class="me-2" src="@/assets/img/icons/apple.png" />
                  {{ $vuetify.locale.t("$vuetify.login_apple") }}
                </v-btn>
                <p class="sign-up">
                  {{ $vuetify.locale.t("$vuetify.You_have_account") }}
                  <a href="/login">{{ $vuetify.locale.t("$vuetify.login") }}</a>
                </p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      valid: true,
      email: "",
      username: "",
      user_type: "0",
      showPassword: false,
      emailRegx:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.email"),
        (v) =>
          (v && this.emailRegx.test(this.email) == true) ||
          this.$vuetify.locale.t("$vuetify.regx.valid_email"),
      ],
      nameRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.username"),
      ],
      password: "",
      passwordRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.passwordRequired"),
      ],
      validatePassword: {
        isLongEnough: false,
        hasSpecialChar: false,
        hasUppercase: false,
        hasLowercase: false,
        noMatchEmailOrUsername: false,
      },
    };
  },
  computed: {
    checkPassword() {
      this.validatePassword.isLongEnough = this.password.length >= 8;
      this.validatePassword.hasUppercase = /[A-Z]/.test(this.password);
      this.validatePassword.hasLowercase = /[a-z]/.test(this.password);

      // A JavaScript regex that checks if a string contains at least one number or special character:
      this.validatePassword.hasSpecialChar =
        /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.password);

      this.validatePassword.noMatchEmailOrUsername = !(
        this.password == this.username || this.password == this.email
      );

      return (
        this.validatePassword.isLongEnough &&
        this.validatePassword.hasUppercase &&
        this.validatePassword.hasLowercase &&
        this.validatePassword.hasSpecialChar &&
        this.validatePassword.noMatchEmailOrUsername
      );
    },
  },
  methods: {
    async submitHandler() {
      const { valid } = await this.$refs.form.validate();
      if (valid && this.checkPassword) {
        this.$http
          .post("/user/signup", {
            name: this.username,
            email: this.email,
            password: this.password,
            user_type: this.user_type,
          })
          .then((res) => {
            this.$store.dispatch("setSuccess", {
              name: "createContact",
              value: res.data.data,
            });
            this.$store.commit("SET_USER_EMAIL", this.email);
            this.$router.push({ name: "VerifyEmail" });
          })
          .catch(() => {});
      }
    },
  },
};
</script>
