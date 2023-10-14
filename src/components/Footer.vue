<template>
  <footer>
    <v-container>
      <v-row class="top">
        <v-col cols="12" lg="7">
          <a href="/" class="logo me-10">
            <img :src=" getAdminSettings.logo_path ||'@/assets/img/geneoLogo.png'" width="130"
                height="68" alt="Genom" />
          </a>
          <v-row>
            <v-col cols="12" lg="9">
              <p>
                لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل
                ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعة بروشور
                او فلاير على سبيل المثال او نماذج مواقع انترنت..لوريم ايبسوم هو
                نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع
                النصوص.
              </p>
            </v-col>
            <v-col cols="12" lg="9">
              <div class="d-flex align-center justify-space-between mt-2">
                <div class="contacts">
                  <div class="icon me-2">
                    <img src="/src/assets/img/icons/footer/call.png" />
                  </div>
                  <div class="body">
                    <label>
                      {{
                        $vuetify.locale.t("$vuetify.you_have_question")
                      }}</label
                    >
                    <p>310-123-2728</p>
                  </div>
                </div>
                <div class="contacts">
                  <div class="icon me-2">
                    <img src="/src/assets/img/icons/footer/mail.png" />
                  </div>
                  <div class="body">
                    <label>
                      {{ $vuetify.locale.t("$vuetify.contact_via") }}</label
                    >
                    <p>GeneoClinic@gmail.com</p>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="5">
          <h3>{{ $vuetify.locale.t("$vuetify.newsletter") }}</h3>
          <p>
            {{
              $vuetify.locale.t(
                "$vuetify.Be_the_first_to_know_about_the_latest_discs_You_can_opt_out_whenever_you_want"
              )
            }}.
          </p>
          <div class="newsletterForm">
            <input
              type="email"
              :placeholder="$vuetify.locale.t('$vuetify.your_email_address')"
            />
            <img src="@/assets/img/icons/svg/newsletter.svg" />
            <button>{{ $vuetify.locale.t("$vuetify.send") }}</button>
          </div>
          <ul class="socialLinks">
            <li class="me-2">
              <a :href="getAdminSettings.whatsapp"
              target="_blank"
                ><img
                  src="@/assets/img/icons/footer/whatsapp.png"
                  alt="Whatsapp"
              /></a>
            </li>
            <li class="me-2">
              <a :href="getAdminSettings.youtube"
              target="_blank"
                ><img src="@/assets/img/icons/footer/youtube.png" alt="Youtube"
              /></a>
            </li>
            <li class="me-2">
              <a :href="getAdminSettings.facebook"
              target="_blank"
                ><img
                  src="@/assets/img/icons/footer/facebook.png"
                  alt="Facebook"
              /></a>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row class="bottom">
        <v-col cols="12" lg="7">
          <ul class="nav">
            <li class="me-10 active">
              <a href="/">{{ $vuetify.locale.t("$vuetify.homepage") }}</a>
            </li>
            <li class="me-10">
              <a href="/about">{{
                $vuetify.locale.t("$vuetify.who_we_are")
              }}</a>
            </li>
            <li class="me-10">
              <a href="/patient/help-center?tag=question">{{
                $vuetify.locale.t("$vuetify.faqs")
              }}</a>
            </li>
            <li class="me-10">
              <a href="/patient/help-center">{{
                $vuetify.locale.t("$vuetify.contact_us")
              }}</a>
            </li>
            <li class="me-10">
              <a href="">{{ $vuetify.locale.t("$vuetify.about_us") }}</a>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" lg="5">
          <p class="text-end">
            © {{ new Date().getFullYear() }},
            {{ $vuetify.locale.t("$vuetify.All_rights_reserved") }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAdminSettings"]),
  },
};
</script>
<style lang="scss" scoped></style>
