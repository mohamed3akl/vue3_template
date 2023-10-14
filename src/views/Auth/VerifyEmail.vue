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
              <h1>{{ $vuetify.locale.t("$vuetify.check_email") }}</h1>
              <div class="text-center">
                <img src="@/assets/img/email_verify.png" />
              </div>
              <v-form ref="form" v-model="valid" lazy-validation>
                <p class="verify-comment">
                  {{ $vuetify.locale.t("$vuetify.verifying_your_email") }}
                </p>
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.otp")
                }}</label>
                <div class="text-center mt-4">
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
                    @click="verifyEmail"
                  >
                    {{ $vuetify.locale.t("$vuetify.send_verify_code") }}
                  </v-btn>
                </div>
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
  name: "VerifyEmail",
  data() {
    return {
      resendCode: false,
      valid: true,
      otp: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.resendCode = true;
    }, 60000);
  },
  methods: {
    verifyEmail() {
      this.$http
        .post("/user/verify", {
          email: this.$store.state.user_email,
          token: this.otp,
        })
        .then((res) => {
          const AUTH_TOKEN = `Bearer ${res.data.data.token}`;
          this.$store.commit("SET_AUTHORIZATION", AUTH_TOKEN);
          this.$store.commit("SET_AUTH_USER", res.data.data.profile);
          this.$store.dispatch("setSuccess", {
            name: "createContact",
            value: res.data.data.message,
          });
          if (res.data.data.profile.user_type == 0) {
            this.$router.push({ name: "PatientCompleteProfile" });
          } else {
            this.$router.push({ name: "DoctorCompleteProfile" });
          }
        })
        .catch(() => {});
    },
    clickResendCode() {
      this.$http
        .post("/user/resend-verify-email-code", {
          email: this.$store.state.user_email,
        })
        .then((res) => {
          this.$store.state.email_sent = true;
          this.$store.dispatch("setSuccess", {
            name: "createContact",
            value: res.data.data,
          });
        })
        .catch(() => {});

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
  justify-content: space-between;
  text-align: center;
  flex-direction: row-reverse;
}
.otp-input {
  text-align: center;
  border-radius: 0.55556rem;
  border: 1px solid var(--light-stroke, #dfdfe0);
  background: var(--white-color, #fff);
  width: 70px;
  height: 52px;
  border-radius: 10px !important;
}
.verify-comment {
  color: var(--placeholder, #9a9ea6);
  font-family: Suisse Intl;
  font-size: 0.88889rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.66667rem; /* 187.5% */
  margin-bottom: 1.67rem;
  margin-top: 2.2rem;
}
</style>
