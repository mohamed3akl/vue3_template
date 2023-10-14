<template>
  <!--Doctor menu-->
  <div
    id="DOCTOR_MENU"
    :class="[
      this.$vuetify.locale.current == 'en'
        ? 'usermenuDir usermenu'
        : 'usermenu',
    ]"
    v-if="AuthedUser.user_type == 1"
  >
    <div class="user">
      <img :src="AuthedUser.picture || '/img/profile.jpg'" />
      <h3>{{ $vuetify.locale.t("$vuetify.Doctor") }} {{ AuthedUser.name }}</h3>
      <p>{{ AuthedUser.email }}</p>
    </div>

    <ul>
      <li :class="$route.name == 'Home' ? 'active' : ''">
        <a href="/">{{ $vuetify.locale.t("$vuetify.homepage") }}</a>
      </li>
      <li
        :class="
          $route.name == 'MyGenaticReservations' ||
          $route.name == 'MyReservationDetails'
            ? 'active'
            : ''
        "
      >
        <a href="/my-genetic-reservations">
          {{ $vuetify.locale.t("$vuetify.genetic_reservations") }}
        </a>
      </li>
      <li :class="$route.name == 'OpeningTimes' ? 'active' : ''">
        <a href="/opening-times-available">{{
          $vuetify.locale.t("$vuetify.Opening_times_available")
        }}</a>
      </li>
      <li :class="$route.name == 'PatientRecord' ? 'active' : ''">
        <a href="/doctor/patient-record">{{
          $vuetify.locale.t("$vuetify.Patient_record")
        }}</a>
      </li>
      <li>
        <a href="/my-profile">{{ $vuetify.locale.t("$vuetify.profile") }}</a>
      </li>
      <li :class="$route.name == 'ProfileRatings' ? 'active' : ''">
        <a href="/doctor/ratings">{{ $vuetify.locale.t("$vuetify.rating") }}</a>
      </li>
      <li>
        <a href="/">
          {{ $vuetify.locale.t("$vuetify.Portfolio_and_financial_movements") }}
        </a>
      </li>
      <!-- <li>
          <a href="/">{{ $vuetify.locale.t("$vuetify.My_bank_accounts") }}</a>
      </li>-->
    </ul>
  </div>
  <div
    id="USER_MENU"
    :class="[
      this.$vuetify.locale.current == 'en'
        ? 'usermenuDir usermenu'
        : 'usermenu',
    ]"
    v-else
  >
    <div class="user">
      <router-link :to="{ name: 'ShowProfile' }">
        <img :src="AuthedUser.picture || '/img/profile.jpg'" />
        <h3>{{ AuthedUser.name }}</h3>
        <p>{{ AuthedUser.email }}</p>
      </router-link>
    </div>

    <!--Patient menu-->
    <ul>
      <li :class="$route.name == 'Home' ? 'active' : ''">
        <a href="/">{{ $vuetify.locale.t("$vuetify.homepage") }}</a>
      </li>
      <li
        :class="
          $route.name == 'MyGenaticReservations' ||
          $route.name == 'MyReservationDetails'
            ? 'active'
            : ''
        "
      >
        <a href="/my-genetic-reservations?tab=all">
          {{ $vuetify.locale.t("$vuetify.my_genetic_reservations") }}
        </a>
      </li>
      <li
        :class="
          $route.name == 'MyGenaticExamination' ||
          $route.name == 'MyExaminationDetails'
            ? 'active'
            : ''
        "
      >
        <a href="/my-genetic-examination">{{
          $vuetify.locale.t("$vuetify.my_genetic_testing")
        }}</a>
      </li>
      <li
        :class="
          $route.name == 'MyRecommendation' ||
          $route.name == 'MyRecommendationDetails'
            ? 'active'
            : ''
        "
      >
        <a href="/patient/my-recommendation">{{
          $vuetify.locale.t("$vuetify.my_recommendations")
        }}</a>
      </li>
      <li :class="$route.name == 'ShowProfile' ? 'active' : ''">
        <a href="/my-profile">{{ $vuetify.locale.t("$vuetify.profile") }}</a>
      </li>

      <li :class="$route.name == 'GlobalMedicalRecordsDetails' ? 'active' : ''">
        <a href="/medical-records-details/13?name=patient_information">{{ $vuetify.locale.t("$vuetify.medical_record") }}</a>
      </li>
      <li
        :class="
          $route.name == 'Address' ||
          $route.name == 'AddAddress' ||
          $route.name == 'EditAddress'
            ? 'active'
            : ''
        "
      >
        <a href="/address">{{ $vuetify.locale.t("$vuetify.my_addresses") }}</a>
      </li>
      <!-- <li :class="($route.name = 'Payment' ? 'active' : '')">
        <a href="/payment">{{
          $vuetify.locale.t("$vuetify.my_payment_methods")
        }}</a>
      </li> -->
    </ul>
    <a href="/booking/genetic-service" class="btn-href me-2">
      {{ $vuetify.locale.t("$vuetify.genetic_service") }}
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["AuthedUser"]),
  },
};
</script>
<style lang="scss" scoped>
.usermenuDir {
  border-left: 0 !important;
  border-right: 0.05556rem solid #dfdfe0 !important;
  ul {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    li {
      width: 100%;
      border-radius: 0px !important;
      &.active {
        a {
          border-radius: 15px 0 0 15px !important;
          &::after {
            left: 99% !important;
          }
        }
      }
      a {
        text-align: left !important;
        &:hover {
          border-radius: 15px 0 0 15px !important;
          &::after {
            left: 99% !important;
          }
        }
      }
    }
  }
}
// ul {
//   li {
//     margin-bottom: 1.05rem !important;
//     .button {
//       height: 50px;
//       font-size: 21px;
//     }
//   }
// }
// a {
//   text-decoration: none;
// }
</style>
