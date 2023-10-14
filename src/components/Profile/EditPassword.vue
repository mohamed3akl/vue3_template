<template>
  <div class="edit_profil3">
    <v-container>
      <v-row>
        <v-col cols="12" lg="12" md="12">
          <h1 class="text-black mt-6">
            {{ $vuetify.locale.t("$vuetify.change_password") }}
          </h1>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" md="6" class="ma-auto text-center">
                <img src="@/assets/img/Frame.png" alt="" class="" />
              </v-col>
              <v-col cols="12" class="mt-5">
                <p style="font-size: 22px; color: #444545 !important">
                  {{ $vuetify.locale.t("$vuetify.new_password_information") }}
                </p>
              </v-col>
              <v-col cols="12" lg="12" md="12">
                <v-row>
                  <v-col cols="12" lg="6" style="color: #a6a8ab">
                    <p
                      class="validateValid"
                      :style="{
                        color: validatePassword.isLongEnough
                          ? 'green'
                          : '#a6a8ab',
                      }"
                    >
                      <v-icon class="me-2"
                        >mdi-{{
                          validatePassword.isLongEnough ? "check" : "close"
                        }}</v-icon
                      >
                      {{ $vuetify.locale.t("$vuetify.regx.password.length") }}
                    </p>
                  </v-col>
                  <v-col cols="12" lg="6" style="color: #a6a8ab">
                    <p
                      class="validateValid"
                      :style="{
                        color: validatePassword.hasSpecialChar
                          ? 'green'
                          : '#a6a8ab',
                      }"
                    >
                      <v-icon class="me-2"
                        >mdi-{{
                          validatePassword.hasSpecialChar ? "check" : "close"
                        }}</v-icon
                      >
                      {{
                        $vuetify.locale.t(
                          "$vuetify.regx.password.hasSpecialChar"
                        )
                      }}
                    </p>
                  </v-col>
                  <v-col cols="12" lg="6" style="color: #a6a8ab">
                    <p
                      class="validateValid"
                      :style="{
                        color: validatePassword.hasUppercase
                          ? 'green'
                          : '#a6a8ab',
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
                  </v-col>
                  <v-col cols="12" lg="6" style="color: #a6a8ab">
                    <p
                      class="validateValid"
                      :style="{
                        color: validatePassword.hasLowercase
                          ? 'green'
                          : '#a6a8ab',
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
                  </v-col>
                  <v-col cols="12" lg="6" style="color: ">
                    <p
                      class="validateValid"
                      :style="{
                        color:
                          validatePassword.noMatchEmailOrUsername &&
                          new_password_text.length > 0
                            ? 'green'
                            : '#a6a8ab',
                      }"
                    >
                      <v-icon class="me-2"
                        >mdi-{{
                          validatePassword.noMatchEmailOrUsername &&
                          new_password_text.length > 0
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
                  </v-col>
                  <div style="display: none">{{ checkPassword }}</div>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-form
                  class="ma-auto mt-10"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <!-- current password  -->
                  <div>
                    <label>{{
                      $vuetify.locale.t("$vuetify.current_password")
                    }}</label>
                    <v-text-field
                      class="mt-4"
                      required
                      v-model="current_password_text"
                      :rules="currentRules"
                      variant="solo"
                      :append-icon="
                        current_password_show ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="current_password_show ? 'text' : 'password'"
                      @click:append="
                        current_password_show = !current_password_show
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.current_password_placeholder'
                        )
                      "
                    >
                    </v-text-field>
                  </div>

                  <!-- new password  -->
                  <div>
                    <label>{{
                      $vuetify.locale.t("$vuetify.new_password")
                    }}</label>
                    <v-text-field
                      class="mt-4"
                      required
                      v-model="new_password_text"
                      :rules="passwordRules"
                      variant="solo"
                      :append-icon="
                        new_password_show ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="new_password_show ? 'text' : 'password'"
                      @click:append="new_password_show = !new_password_show"
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.new_password_word_placeholder'
                        )
                      "
                    >
                    </v-text-field>
                  </div>

                  <!-- confirm password  -->
                  <div>
                    <label>{{
                      $vuetify.locale.t("$vuetify.confirm_password")
                    }}</label>
                    <v-text-field
                      class="mt-4"
                      v-model="confirm_password_text"
                      required
                      :rules="confirmRules"
                      variant="solo"
                      :append-icon="
                        confirm_password_show ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="confirm_password_show ? 'text' : 'password'"
                      @click:append="
                        confirm_password_show = !confirm_password_show
                      "
                      :placeholder="
                        $vuetify.locale.t(
                          '$vuetify.confirm_password_placeholder'
                        )
                      "
                    >
                    </v-text-field>
                  </div>
                  <v-btn
                    color="primary"
                    class="w-100 d-block ma-auto mt-12 p-10 mb-8"
                    style="font-size: 21px; height: 50px"
                    @click="changePassword"
                  >
                    {{ $vuetify.locale.t("$vuetify.change_password") }}
                  </v-btn>
                  <div class="dialog text-center">
                    <v-dialog v-model="dialog" width="500" class="text-center">
                      <v-card style="border-radius: 15px !important">
                        <v-card-title class="text-center">
                          <h4 class="pt-10" style="color: #b9499b !important">
                            {{ $vuetify.locale.t("$vuetify.change_password") }}
                          </h4>
                        </v-card-title>
                        <v-card-text>
                          <img
                            src="@/assets/img/img-success.png"
                            alt="available_time"
                            class="mb-5 w-1000"
                          />
                          <p class="w-100 ma-auto mb-2" style="color: #444545">
                            {{
                              $vuetify.locale.t(
                                "$vuetify.change_password_is_true"
                              )
                            }}
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <router-link
                            :to="{ name: 'Home' }"
                            class="w-100"
                            style="text-decoration: none"
                          >
                            <v-btn
                              color="white"
                              class="w-75 d-block ma-auto p-10 bg-primary mb-5 text-center"
                              style="font-size: 21px; height: 50px"
                              variant="text"
                              @click="dialog = false"
                            >
                              {{ $vuetify.locale.t("$vuetify.to_home") }}
                            </v-btn>
                          </router-link>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserMenu from "@/components/UserMenu.vue";
import { mapGetters } from "vuex";
export default {
  components: { UserMenu },
  data() {
    return {
      valid: true,
      dialog: false,
      current_password_show: false,
      new_password_show: false,
      confirm_password_show: false,
      current_password_text: "",
      new_password_text: "",
      confirm_password_text: "",
      currentRules: [
        (v) =>
          !!v ||
          this.$vuetify.locale.t("$vuetify.current_password_placeholder"),
      ],
      passwordRules: [
        (v) => !!v || this.$vuetify.locale.t("$vuetify.regx.passwordRequired"),
      ],
      confirmRules: [
        (v) =>
          !!v ||
          this.$vuetify.locale.t("$vuetify.confirm_password_placeholder"),
        (v) =>
          this.confirm_password_text == this.new_password_text ||
          this.$vuetify.locale.t("$vuetify.confirm_password_placeholder"),
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
    ...mapGetters(["AuthedUser"]),
    checkPassword() {
      this.validatePassword.isLongEnough = this.new_password_text.length >= 8;
      this.validatePassword.hasUppercase = /[A-Z]/.test(this.new_password_text);
      this.validatePassword.hasLowercase = /[a-z]/.test(this.new_password_text);

      // A JavaScript regex that checks if a string contains at least one number or special character:
      this.validatePassword.hasSpecialChar =
        /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.new_password_text);

      this.validatePassword.noMatchEmailOrUsername = !(
        this.new_password_text == this.AuthedUser.name ||
        this.new_password_text == this.AuthedUser.email
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
    async changePassword() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$http
          .put(`profile/change-password`, {
            current_password: this.current_password_text,
            new_password: this.new_password_text,
            confirm_password: this.confirm_password_text,
          })
          .then((res) => {
            this.dialog = true;
            this.current_password_text = "";
            this.new_password_text = "";
            this.confirm_password_text = "";
          })
          .catch((e) => e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 475px !important;
}
@media (max-width: 768px) {
  form {
    width: 400px !important;
  }
}
</style>
