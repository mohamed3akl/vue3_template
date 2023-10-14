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
              <h1>{{ $vuetify.locale.t("$vuetify.change_password") }}</h1>
              <div class="text-center">
                <img src="@/assets/img/forget_password.png" />
              </div>
              <v-alert type="error" v-if="$store.state.errors.signup">{{
                $store.state.errors.signup
              }}</v-alert>
              <v-form ref="form" v-model="valid" lazy-validation>
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.new_password")
                }}</label>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  density="default"
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

                  <div style="display: none">{{ checkPassword }}</div>
                </div>

                <v-btn
                  size="x-large"
                  color="primary"
                  class="w-100 mt-8"
                  @click="validate"
                >
                  {{ $vuetify.locale.t("$vuetify.change_password") }}
                </v-btn>
                <a
                  href="/login"
                  class="v-btn v-theme--light text-black v-btn--density-default v-btn--size-x-large v-btn--variant-outlined w-100 mt-3 btn-backtologin"
                  >{{ $vuetify.locale.t("$vuetify.back_login") }}</a
                >
              </v-form>

              <div class="socail-login">
                <p class="sign-up">
                  {{ $vuetify.locale.t("$vuetify.dont_have_account") }}
                  <a href="/register">{{
                    $vuetify.locale.t("$vuetify.create_account")
                  }}</a>
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
  data() {
    return {
      valid: true,
      showPassword: false,
      password: "",
      passwordRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.passwordRequired"),
      ],

      validatePassword: {
        isLongEnough: false,
        hasSpecialChar: false,
        hasUppercase: false,
        hasLowercase: false,
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

      return (
        this.validatePassword.isLongEnough &&
        this.validatePassword.hasUppercase &&
        this.validatePassword.hasLowercase &&
        this.validatePassword.hasSpecialChar
      );
    },
  },
  mounted() {
    this.$store.state.resetToken = false;
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid && this.checkPassword) {
        this.$http
          .post("/user/reset-password", {
            email: this.$store.state.user_email,
            token: this.$store.state.user_otp,
            password: this.password,
            confirm_password: this.password,
          })
          .then((res) => {
            if (res.status === 200) {
              this.$store.dispatch("setSuccess", {
                name: "createContact",
                value: res.data.data.message,
              });

              const AuthToken = `Bearer ${res.data.data.token}`;
              this.$store.commit("SET_AUTHORIZATION", AuthToken);
              this.$store.commit("SET_AUTH_USER", res.data.data.profile);
              this.$router.push({ name: "Home" });
            }
          })
          .catch(() => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
