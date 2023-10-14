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
              <h1>{{ $vuetify.locale.t("$vuetify.login") }}</h1>
              <v-alert type="error" v-if="$store.state.errors.signup">{{
                $store.state.errors.signup
              }}</v-alert>
              <v-form ref="form" v-model="valid" lazy-validation>
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
                <label class="mb-3 d-block">{{
                  $vuetify.locale.t("$vuetify.password")
                }}</label>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  required
                  density="default"
                  variant="solo"
                  single-line
                  :placeholder="$vuetify.locale.t('$vuetify.your_password')"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <p class="text-center">
                  <a href="/request-reset-password">{{
                    $vuetify.locale.t("$vuetify.forget_password")
                  }}</a>
                </p>

                <v-btn
                  size="x-large"
                  color="primary"
                  class="w-100 mt-8"
                  @click="validate"
                >
                  {{ $vuetify.locale.t("$vuetify.login") }}
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
  name: "Login",
  data() {
    return {
      valid: true,
      email: "",
      showPassword: false,
      emailRegx:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.email"),
        (v) =>
          (v && this.emailRegx.test(this.email) == true) ||
          this.$vuetify.locale.t("$vuetify.regx.valid_email"),
      ],
      password: "",
      passwordRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.passwordRequired"),
      ],
    };
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$http
          .post("/user/login", {
            identity: this.email,
            password: this.password,
          })
          .then((res) => {
            if (res.status === 200) {
              const AUTH_TOKEN = `Bearer ${res.data.data.token}`;
              this.$store.commit("SET_AUTHORIZATION", AUTH_TOKEN);
              this.$store.commit("SET_AUTH_USER", res.data.data.profile);
              if(res.data.data.profile.user_type == 3 || res.data.data.profile.user_type == 4){
                this.$router.push({ name: "AdminDashboard" });
              }else{
                this.$router.push({ name: "Home" });
              }
            }
          })
          .catch(() => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v-input__append {
  transform: translateY(60%);
}
@media (max-width: 780px) {
  .v-input__append {
    transform: translateY(0%) !important;
  }
}
</style>
