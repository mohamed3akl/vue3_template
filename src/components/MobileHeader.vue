<template>
  <header id="MOBILE_HEADER">
    <v-row class="topBar">
      <v-container>
        <div class="head">
          <a href="/" class="logo me-10">
            <img src="@/assets/img/geneoLogo.png" width="120" alt="Genom" />
          </a>
          <a @click="drawer = !drawer" href="#" class="logo me-10">
            <img src="@/assets/img/menu-list.png" width="30" alt="menu" />
          </a>

        </div>
      </v-container>
      <v-navigation-drawer
        v-if="!excludedRoutes"
        v-model="drawer"
        app
        permanent
        color="#F8EDF5"
        :right="true"
        id="MOBILE_SIDEBAR"
      >
        <v-tabs
          v-model="tab"
        >
          <v-tab value="one">  <v-icon size="30" color="#BA529B" rotate="180">mdi-account</v-icon>
          </v-tab>
          <v-tab value="two">  <v-icon size="30" color="#BA529B" rotate="180">mdi-home</v-icon>
          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <user-menu />
            </v-window-item>

            <v-window-item value="two">
              <v-row class="bottomBar py-4">
                <v-container>
                  <v-row class="align-center">
                    <div class="d-flex w-100 align-center justify-space-between flex-column">
                      <ul class="nav d-flex flex-column firstMenu">
                        <li :class="$route.name == 'Home' ? 'me-10 active' : 'me-10'">
                          <a href="/">{{ $vuetify.locale.t("$vuetify.homepage") }}</a>
                        </li>
                        <li :class="$route.name == 'About' ? 'me-10 active' : 'me-10'">
                          <a href>{{ $vuetify.locale.t("$vuetify.who_we_are") }}</a>
                        </li>
                        <li :class="$route.name == 'HelpCenter' ? 'me-10 active' : 'me-10'">
                          <a href="/patient/help-center">{{ $vuetify.locale.t("$vuetify.faqs") }}</a>
                        </li>
                        <li :class="$route.name == 'HelpCenter' ? 'me-10 active' : 'me-10'">
                          <a href="/patient/help-center">{{ $vuetify.locale.t("$vuetify.contact_us") }}</a>
                        </li>
                        <li :class="$route.name == 'aboutus' ? 'me-10 active' : 'me-10'">
                          <a href>{{ $vuetify.locale.t("$vuetify.about_us") }}</a>
                        </li>
                      </ul>
                      <div class="actions w-100 overflow-auto mt-5">
                        <v-divider></v-divider>
                        <ul class="actions_nav my-4">
                          <li class="ms-8">
                            <a href="/patient/help-center">
                              <img
                                src="@/assets/img/icons/svg/support.svg"
                                v-if="$route.name != 'HelpCenter'"
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                v-if="$route.name == 'HelpCenter'"
                              >
                                <g clip-path="url(#clip0_1163_946)">
                                  <path
                                    d="M23.0234 22.2578V9.07812C23.0234 4.09456 18.9836 0 14 0C9.01644 0 4.97656 4.09456 4.97656 9.07812V20.6172C4.97656 21.0702 5.34384 21.4375 5.79688 21.4375H7.4375C7.89053 21.4375 8.25781 21.0702 8.25781 20.6172V10.7188C8.25781 10.2656 7.89053 9.89844 7.4375 9.89844H6.61719V9.07812C6.61719 5.00068 9.92255 1.64062 14 1.64062C18.0774 1.64062 21.3828 5.00068 21.3828 9.07812V9.89844H20.5625C20.1091 9.89844 19.7422 10.2653 19.7422 10.7188V20.6172C19.7422 21.0706 20.1091 21.4375 20.5625 21.4375H21.3828V22.2578C21.3828 23.6148 20.2789 24.7188 18.9219 24.7188H17.9505C17.6107 23.766 16.7087 23.0781 15.6406 23.0781H14C12.643 23.0781 11.5391 24.182 11.5391 25.5391C11.5391 26.8961 12.643 28 14 28H15.6406C16.7087 28 17.6107 27.3121 17.9505 26.3594H18.9219C21.1834 26.3594 23.0234 24.5193 23.0234 22.2578ZM25.0057 11.2794C24.8837 11.2789 24.7807 11.3099 24.6641 11.3221V20.0146C24.776 20.0262 24.8747 20.0564 24.9917 20.0564C27.2213 20.0564 28 17.8845 28 15.6406C28 13.4056 27.2267 11.2885 25.0057 11.2794ZM3.33594 20.0147V11.3214C3.2194 11.3092 3.11626 11.278 2.9942 11.2785C0.775141 11.2872 0 13.404 0 15.6406C0 17.8907 0.78225 20.0564 3.0083 20.0564C3.12534 20.0564 3.22399 20.0262 3.33594 20.0147Z"
                                    fill="#B9499B"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1163_946">
                                    <rect width="28" height="28" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              مركز المساعدة
                            </a>
                          </li>
                          <li class="ms-8">
                            <a href="/my-profile">
                              <img src="@/assets/img/icons/svg/Lock.svg" v-if="$route.name !='ShowProfile'" />
                              <img src="@/assets/img/icons/svg/Lock-active.svg" v-if="$route.name =='ShowProfile'" />
                              الصفحة الشخصية

                            </a>
                          </li>
                          <li class="ms-8">
                            <a href="/notification">
                              <img
                                src="@/assets/img/icons/svg/Notification.svg"
                                v-if="$route.name !='Notification' &&$route.name !='NotificationSettings'"
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 18 20"
                                fill="none"
                                v-if="$route.name =='Notification' || $route.name=='NotificationSettings'"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.7071 6.79633C15.7071 8.05226 16.039 8.79253 16.7695 9.64559C17.3231 10.2741 17.5 11.0808 17.5 11.956C17.5 12.8302 17.2128 13.6601 16.6373 14.3339C15.884 15.1417 14.8215 15.6573 13.7372 15.747C12.1659 15.8809 10.5937 15.9937 9.0005 15.9937C7.40634 15.9937 5.83505 15.9263 4.26375 15.747C3.17846 15.6573 2.11602 15.1417 1.36367 14.3339C0.78822 13.6601 0.5 12.8302 0.5 11.956C0.5 11.0808 0.677901 10.2741 1.23049 9.64559C1.98384 8.79253 2.29392 8.05226 2.29392 6.79633V6.3703C2.29392 4.68834 2.71333 3.58852 3.577 2.51186C4.86106 0.941697 6.91935 0 8.95577 0H9.04522C11.1254 0 13.2502 0.987019 14.5125 2.62466C15.3314 3.67916 15.7071 4.73265 15.7071 6.3703V6.79633ZM6.07367 18.0608C6.07367 17.5573 6.53582 17.3266 6.96318 17.2279C7.46309 17.1222 10.5093 17.1222 11.0092 17.2279C11.4366 17.3266 11.8987 17.5573 11.8987 18.0608C11.8738 18.5402 11.5926 18.9653 11.204 19.2352C10.7001 19.628 10.1088 19.8767 9.49057 19.9664C9.14868 20.0107 8.81276 20.0117 8.48279 19.9664C7.86362 19.8767 7.27227 19.628 6.76938 19.2342C6.37978 18.9653 6.09852 18.5402 6.07367 18.0608Z"
                                  fill="#B9499B"
                                />
                              </svg>
                              الإشعارات
                            </a>
                          </li>
                          <li class="ms-8">
                            <a href="/settings">
                              <img src="@/assets/img/icons/svg/Setting.svg" v-if="$route.name != 'Settings'" />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="28"
                                viewBox="0 0 20 20"
                                fill="none"
                                v-if="$route.name == 'Settings'"
                                class
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M18.4022 11.58C18.7599 11.77 19.0359 12.07 19.23 12.37C19.6081 12.99 19.5775 13.75 19.2096 14.42L18.4942 15.62C18.1161 16.26 17.4109 16.66 16.6854 16.66C16.3277 16.66 15.9291 16.56 15.6021 16.36C15.3364 16.19 15.0298 16.13 14.7028 16.13C13.691 16.13 12.8428 16.96 12.8121 17.95C12.8121 19.1 11.8719 20 10.6967 20H9.30682C8.12135 20 7.18115 19.1 7.18115 17.95C7.16071 16.96 6.31248 16.13 5.30075 16.13C4.9635 16.13 4.65691 16.19 4.40142 16.36C4.0744 16.56 3.66561 16.66 3.31815 16.66C2.58234 16.66 1.87719 16.26 1.49906 15.62L0.793913 14.42C0.415789 13.77 0.39535 12.99 0.773474 12.37C0.936987 12.07 1.24357 11.77 1.59104 11.58C1.87719 11.44 2.06114 11.21 2.23487 10.94C2.74585 10.08 2.43926 8.95 1.5706 8.44C0.558863 7.87 0.231836 6.6 0.814352 5.61L1.49906 4.43C2.0918 3.44 3.35903 3.09 4.38098 3.67C5.27009 4.15 6.4249 3.83 6.9461 2.98C7.10961 2.7 7.20159 2.4 7.18115 2.1C7.16071 1.71 7.27312 1.34 7.46729 1.04C7.84542 0.42 8.53013 0.02 9.27616 0H10.7171C11.4734 0 12.1581 0.42 12.5362 1.04C12.7202 1.34 12.8428 1.71 12.8121 2.1C12.7917 2.4 12.8837 2.7 13.0472 2.98C13.5684 3.83 14.7232 4.15 15.6225 3.67C16.6343 3.09 17.9117 3.44 18.4942 4.43L19.1789 5.61C19.7717 6.6 19.4446 7.87 18.4227 8.44C17.554 8.95 17.2474 10.08 17.7686 10.94C17.9321 11.21 18.1161 11.44 18.4022 11.58ZM7.10961 10.01C7.10961 11.58 8.4075 12.83 10.012 12.83C11.6164 12.83 12.8837 11.58 12.8837 10.01C12.8837 8.44 11.6164 7.18 10.012 7.18C8.4075 7.18 7.10961 8.44 7.10961 10.01Z"
                                  fill="#B9499B"
                                />
                              </svg>
                              الإعدادات
                            </a>
                          </li>
                          <li class="mx-8">
                            <a @click="$store.dispatch('logoutUser')">
                              <img src="@/assets/img/icons/svg/Logout.svg" />
                              تسجيل الخروج
                            </a>
                          </li>
                        </ul>

                      </div>

                    </div>
                  </v-row>
                </v-container>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-navigation-drawer>
    </v-row>

  </header>
</template>

<script>
import locationSwitch from "./locationSwitch.vue";

import { mapGetters } from "vuex";
export default {
  name: "MainHeader",
  components: { locationSwitch },
  data(){
    return{
      drawer: false,
      tab: null,
      excludedRoutesNames: [
        "login",
        "register",
        "forget",
        "Reset",
        "VerifyEmail",
        "PatientCompleteProfile",
        "DoctorCompleteProfile",
      ],
    }
  },
  mounted() {
    // this.$store.commit('SET_LOADING', { name: 'ui', value: false });
    if (this.$store.state.token) {
      this.$store.dispatch("fetchUserProfile");
    }
  },
  computed: {
    excludedRoutes() {
      return this.excludedRoutesNames.includes(this.$route.name);
    },
    ...mapGetters(["AuthedUser"])
  }
};
</script>
<style lang="scss" scoped>
.router-link-exact-active {
  li {
    a {
      color: red;
    }
  }
}

header{
  .topBar{
    .btn-href{
      border-radius: 0.66667rem;
      color: var(--white, #FFF);
      font-size: 0.77778rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding: .89rem 1.78rem;
    }
  }
}
</style>
