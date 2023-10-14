<template>
  <div class="loginPage">
    <div class="background"></div>
    <div class="loginBody">
      <v-row>
        <v-col lg="7" md="8" sm="12">
          <div class="loginDiv" v-if="!$store.state.email_sent">
            <div class="head">
              <img src="@/assets/img/geneoLogo.png" />
              <lang-switch />
            </div>
            <div class="body">
              <h1>{{ $vuetify.locale.t("$vuetify.forget_password") }}</h1>
              <div class="text-center">
                <img src="@/assets/img/forget_password.png" />
              </div>
              <v-alert type="error" v-if="$store.state.errors.signup">{{
                $store.state.errors.signup
              }}</v-alert>
              <v-form ref="form" v-model="valid" lazy-validation>
                <span class="hint">{{
                  $vuetify.locale.t(
                    "$vuetify.We_will_send_you_instructions_to_recover_your_password"
                  )
                }}</span>
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.email_address")
                }}</label>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  required
                  density="default"
                  variant="solo"
                  single-line
                  placeholder="Useremail@mail.com"
                ></v-text-field>

                <v-btn
                  size="x-large"
                  color="primary"
                  class="w-100 mt-8"
                  @click="requestResetPassword()"
                >
                  {{ $vuetify.locale.t("$vuetify.send_verify_email") }}
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
          <div class="loginDiv" v-else-if="emailSent">
            <div class="head">
              <img src="@/assets/img/geneoLogo.png" />
              <lang-switch />
            </div>
            <div class="body">
              <h1>{{ $vuetify.locale.t("$vuetify.check_email") }}</h1>
              <div class="text-center">
                <img src="@/assets/img/email_verify.png" />
              </div>
              <v-form ref="form" v-model="valid" lazy-validation>
                <span class="hint text-center"
                  >{{
                    $vuetify.locale.t(
                      "$vuetify.Verification_code_had_sent_to_your_email_please_check"
                    )
                  }}.</span
                >
                <div class="otp-input-container">
                  <split-input
                    v-model="otp"
                    class-name="otp-input"
                    :input-number="5"
                  />
                </div>

                <v-btn
                  size="x-large"
                  color="primary"
                  class="w-100 mt-8"
                  @click="validateOtp"
                >
                  {{ $vuetify.locale.t("$vuetify.send") }}
                </v-btn>
              </v-form>

              <div class="socail-login">
                <p class="sign-up">
                  {{ $vuetify.locale.t("$vuetify.dont_get_code") }}
                  <a
                    @click="clickResendCode"
                    v-if="resendCode"
                    style="cursor: pointer"
                    >{{ $vuetify.locale.t("$vuetify.Send_the_code_again") }}</a
                  >
                  <a
                    v-if="!resendCode"
                    style="
                      pointer-events: none;
                      cursor: default;
                      color: gray;
                      text-decoration: line-through;
                    "
                    >{{ $vuetify.locale.t("$vuetify.Send_the_code_again") }}</a
                  >
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
  name: "RequestResetPassword",
  data() {
    return {
      resendCode: false,
      valid: true,
      email: "",
      otp: "",
      showPassword: false,
      emailRegx:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.email"),
        (v) =>
          (v && this.emailRegx.test(this.email) == true) ||
          this.$vuetify.locale.t("$vuetify.regx.valid_email"),
      ],
    };
  },
  mounted() {
    this.$store.state.email_sent = false;
  },
  computed: {
    userEmail() {
      return (this.email = this.$store.state.user_email);
    },
    emailSent() {
      this.resendCode = false;
      setTimeout(() => {
        this.resendCode = true;
      }, 60000);
      return this.$store.state.email_sent;
    },
  },
  methods: {
    callRestPassword() {
      this.$http
        .post("/user/request-reset-password", { email: this.email })
        .then(() => {
          this.$store.state.email_sent = true;
        }).catch(() => {});
    },
    async requestResetPassword() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.$store.commit("SET_USER_EMAIL", this.email);
        this.callRestPassword();
      }
    },
    validateOtp() {
      this.$store.commit("SET_USER_OTP", this.otp);
      this.$http
        .post("/user/verify-reset-password-token", {
          token: this.otp,
          email: this.$store.state.user_email,
        })
        .then(() => {
          this.$store.state.resetToken = true;
          this.$router.push({ name: "Reset" });
        })
        .catch(() => {});
    },
    clickResendCode() {
      this.callRestPassword();
      this.resendCode = false;
      setTimeout(() => {
        this.resendCode = true;
      }, 60000);
    },
  },
};
</script>
<style lang="scss">
.otp-input-container {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  flex-direction: row-reverse;
}
.otp-input {
  text-align: center;
  border: 1px solid #9a9ea6;
  width: 70px;
  height: 52px;
  border-radius: 10px !important;
}
</style>
